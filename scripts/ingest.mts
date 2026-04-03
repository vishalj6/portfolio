import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { VectorChunk, ChunkMetadata } from "@/lib/rag/pinecone-client";

// ---------------------------------------------------------------------------
// Load .env.local before importing modules that call env.ts at module scope.
// Static imports are hoisted, so we use dynamic imports for the RAG modules
// after manually loading the env file.
// ---------------------------------------------------------------------------
const envPath = path.resolve(".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

const { embedBatch } = await import("@/lib/rag/embedder");
const { deleteBySource, upsertChunks } = await import(
  "@/lib/rag/pinecone-client"
);

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const KNOWLEDGE_DIR = path.resolve("src/knowledge");
const MAX_CHUNK_CHARS = 600;
const MIN_CHUNK_CHARS = 80;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FileResult {
  filename: string;
  chunks: number;
  totalChars: number;
  status: "done" | "failed";
  error?: string;
}

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------

function getFirstSentence(text: string): string {
  const match = text.match(/[^.!?\n]*[.!?]/);
  return match ? match[0].trim() : text.split("\n")[0].trim();
}

function chunkContent(content: string): string[] {
  // 1. Split on H2 section boundaries
  const rawSections = content.split("\n## ");
  const sections = rawSections
    .map((s, i) => (i === 0 ? s : `## ${s}`).trim())
    .filter((s) => s.length > 0);

  // 2. Sub-split large sections on paragraph breaks
  const raw: string[] = [];
  for (const section of sections) {
    if (section.length <= MAX_CHUNK_CHARS) {
      raw.push(section);
    } else {
      const paras = section
        .split("\n\n")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
      raw.push(...paras);
    }
  }

  // 3. Merge undersized chunks into the previous one
  const merged: string[] = [];
  for (const chunk of raw) {
    if (chunk.length < MIN_CHUNK_CHARS && merged.length > 0) {
      merged[merged.length - 1] += "\n\n" + chunk;
    } else {
      merged.push(chunk);
    }
  }

  // 4. Overlap: append first sentence of next chunk to each chunk
  return merged.map((chunk, i) => {
    if (i < merged.length - 1) {
      const firstSentence = getFirstSentence(merged[i + 1]);
      if (firstSentence) return `${chunk}\n\n${firstSentence}`;
    }
    return chunk;
  });
}

// ---------------------------------------------------------------------------
// Per-file processing
// ---------------------------------------------------------------------------

async function processFile(filePath: string): Promise<FileResult> {
  const filename = path.basename(filePath);
  const slug = path.basename(filePath, path.extname(filePath));

  process.stdout.write(`⟳ Processing ${filename}...\n`);

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(raw);

  const texts = chunkContent(content);
  const totalChars = texts.reduce((sum, t) => sum + t.length, 0);

  const vectors = await embedBatch(texts);

  const chunks: VectorChunk[] = texts.map((text, i) => {
    const metadata: ChunkMetadata = {
      text,
      source_file: filename,
      category: (frontmatter.category as string) ?? "general",
      tags: Array.isArray(frontmatter.tags) ? (frontmatter.tags as string[]) : [],
      chunk_index: i,
      char_count: text.length,
    };
    return {
      id: `${slug}-chunk-${i}`,
      values: vectors[i],
      metadata,
    };
  });

  await deleteBySource(filename);
  await upsertChunks(chunks);

  process.stdout.write(
    `✓ ${filename} → ${chunks.length} chunks, ~${totalChars} chars embedded\n`
  );

  return { filename, chunks: chunks.length, totalChars, status: "done" };
}

// ---------------------------------------------------------------------------
// Summary table
// ---------------------------------------------------------------------------

function printSummaryTable(results: FileResult[], elapsedMs: number): void {
  const COL1 = Math.max(16, ...results.map((r) => r.filename.length)) + 2;
  const COL2 = 8;

  console.log("\n");
  console.log(`${"File".padEnd(COL1)}| ${"Chunks".padEnd(COL2)}| Status`);
  console.log("-".repeat(COL1 + COL2 + 20));

  for (const r of results) {
    const statusStr =
      r.status === "done" ? "✓ done" : `✗ failed (${r.error ?? "unknown"})`;
    console.log(
      `${r.filename.padEnd(COL1)}| ${String(r.chunks).padEnd(COL2)}| ${statusStr}`
    );
  }

  const total = results.length;
  const failed = results.filter((r) => r.status === "failed").length;
  console.log(
    `\n${total - failed}/${total} files succeeded · ${(elapsedMs / 1000).toFixed(2)}s`
  );
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  // Parse --file flag
  const fileArgIdx = process.argv.indexOf("--file");
  const targetFile = fileArgIdx !== -1 ? process.argv[fileArgIdx + 1] : null;

  let filePaths: string[];

  if (targetFile) {
    const resolved = path.resolve(KNOWLEDGE_DIR, targetFile);
    if (!fs.existsSync(resolved)) {
      console.error(`✗ File not found: ${resolved}`);
      process.exit(1);
    }
    filePaths = [resolved];
  } else {
    const entries = fs.readdirSync(KNOWLEDGE_DIR, {
      recursive: true,
      encoding: "utf-8",
    });
    filePaths = entries
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => path.join(KNOWLEDGE_DIR, f));
  }

  if (filePaths.length === 0) {
    console.error("No .mdx files found in src/knowledge/");
    process.exit(1);
  }

  console.log(`\nIngesting ${filePaths.length} file(s) from src/knowledge/\n`);

  const startTime = Date.now();
  const results: FileResult[] = [];

  for (const filePath of filePaths) {
    try {
      const result = await processFile(filePath);
      results.push(result);
    } catch (err) {
      const filename = path.basename(filePath);
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`✗ ${filename} failed: ${errorMsg}`);
      results.push({
        filename,
        chunks: 0,
        totalChars: 0,
        status: "failed",
        error: errorMsg,
      });
    }
  }

  printSummaryTable(results, Date.now() - startTime);
}

main().catch((err: unknown) => {
  console.error("Fatal:", err);
  process.exit(1);
});
