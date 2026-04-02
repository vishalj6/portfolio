import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "@/lib/config/env";
import type { RetrievedChunk } from "./types";

export interface ChunkMetadata {
  text: string;
  source_file: string;
  category: string;
  tags: string[];
  chunk_index: number;
  char_count: number;
}

export interface VectorChunk {
  id: string;
  values: number[];
  metadata: ChunkMetadata;
}

let _client: Pinecone | null = null;

function getClient(): Pinecone {
  if (!_client) {
    _client = new Pinecone({ apiKey: env.PINECONE_API_KEY });
  }
  return _client;
}

const UPSERT_BATCH_SIZE = 100;

export function getIndex() {
  return getClient().Index({ name: env.PINECONE_INDEX_NAME });
}

export async function upsertChunks(chunks: VectorChunk[]): Promise<void> {
  const index = getIndex();

  for (let i = 0; i < chunks.length; i += UPSERT_BATCH_SIZE) {
    const batch = chunks.slice(i, i + UPSERT_BATCH_SIZE);
    const batchNum = Math.floor(i / UPSERT_BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(chunks.length / UPSERT_BATCH_SIZE);

    console.log(
      `[pinecone] Upserting batch ${batchNum}/${totalBatches} (${batch.length} vectors)`
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await index.upsert(batch as any);
  }
}

export async function queryChunks(
  embedding: number[],
  topK = 5,
  minScore = 0.7
): Promise<RetrievedChunk[]> {
  const index = getIndex();

  const response = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
  });

  return (response.matches ?? [])
    .filter((match) => (match.score ?? 0) >= minScore)
    .map((match) => {
      const meta = match.metadata as unknown as ChunkMetadata;
      return {
        text: meta?.text,
        source_file: meta?.source_file,
        score: match.score ?? 0,
      };
    });
}

export async function deleteBySource(sourceFile: string): Promise<void> {
  const index = getIndex();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await index.deleteMany({ source_file: { $eq: sourceFile } } as any);

  console.log(`[pinecone] Deleted chunks for source: ${sourceFile}`);
}
