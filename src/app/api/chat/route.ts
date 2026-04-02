import { createHash } from "crypto";
import { GoogleGenAI } from "@google/genai";
import type { Content } from "@google/genai";
import { env } from "@/lib/config/env";
import { getSecurityHeaders } from "@/lib/security/headers";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { validateChatInput, sanitizeMessage } from "@/lib/security/input-validator";
import { embedText, EmbedError } from "@/lib/rag/embedder";
import { queryChunks } from "@/lib/rag/pinecone-client";
import { buildSystemPrompt } from "@/lib/rag/prompt-builder";

// ---------------------------------------------------------------------------
// Module-level singletons (instantiated once per server process)
// ---------------------------------------------------------------------------

const gemini = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });
const isDev = env.NODE_ENV === "development";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function secureHeaders(extra?: Record<string, string>): Headers {
  const h = getSecurityHeaders();
  if (extra) {
    for (const [k, v] of Object.entries(extra)) h.set(k, v);
  }
  return h;
}

function jsonError(
  status: number,
  message: string,
  detail?: string
): Response {
  const body: Record<string, string | number> = { error: message };
  if (isDev && detail) body.detail = detail;
  return new Response(JSON.stringify(body), {
    status,
    headers: secureHeaders({ "Content-Type": "application/json" }),
  });
}

// ---------------------------------------------------------------------------
// Method guard
// ---------------------------------------------------------------------------

export async function GET(): Promise<Response> {
  return jsonError(405, "Method not allowed");
}
export async function PUT(): Promise<Response> {
  return jsonError(405, "Method not allowed");
}
export async function DELETE(): Promise<Response> {
  return jsonError(405, "Method not allowed");
}
export async function PATCH(): Promise<Response> {
  return jsonError(405, "Method not allowed");
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request): Promise<Response> {
  // 1. Extract IP (for rate-limit + logging)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  // 2. Rate limit
  const rl = checkRateLimit(request);
  if (!rl.allowed) {
    const retryAfter = Math.ceil(rl.resetInMs / 1000);
    return new Response(
      JSON.stringify({ error: "Too many requests", retryAfter }),
      {
        status: 429,
        headers: secureHeaders({
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
        }),
      }
    );
  }

  // 3. Parse + validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON");
  }

  let input: ReturnType<typeof validateChatInput>;
  try {
    input = validateChatInput(body);
  } catch (err) {
    return jsonError(
      400,
      "Invalid request body",
      err instanceof Error ? err.message : undefined
    );
  }

  // 4. Extract and sanitize last user message
  const lastUserMsg = [...input.messages]
    .reverse()
    .find((m) => m.role === "user");

  if (!lastUserMsg) {
    return jsonError(400, "No user message found");
  }

  const sanitized = sanitizeMessage(lastUserMsg.content);

  // 5. Embed the sanitized message
  let embedding: number[];
  try {
    embedding = await embedText(sanitized);
  } catch (err) {
    const detail = err instanceof Error ? err.message : undefined;
    console.error("[chat] EmbedError:", detail);
    if (err instanceof EmbedError) {
      return jsonError(502, "Embedding service unavailable", detail);
    }
    return jsonError(502, "Embedding service unavailable", detail);
  }

  // 6. Retrieve relevant chunks from Pinecone
  let chunks: Awaited<ReturnType<typeof queryChunks>>;
  try {
    chunks = await queryChunks(embedding, 5, 0.7);
  } catch (err) {
    const detail = err instanceof Error ? err.message : undefined;
    console.error("[chat] Pinecone error:", detail);
    return jsonError(502, "Search unavailable", detail);
  }

  // 7. Build system prompt
  const systemPrompt = buildSystemPrompt(chunks);

  // 8. Build Gemini contents array:
  //    system prompt injected as first user turn + model ack, then history
  const contents: Content[] = [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Understood." }] },
    ...input.messages.map((m) => ({
      role: m.role === "assistant" ? "model" : ("user" as "user" | "model"),
      parts: [{ text: m.role === "user" ? sanitizeMessage(m.content) : m.content }],
    })),
  ];

  // 9. Start Gemini streaming
  let geminiStream: AsyncIterable<import("@google/genai").GenerateContentResponse>;
  try {
    geminiStream = await gemini.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents,
      config: { maxOutputTokens: 400, temperature: 0.7 },
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : undefined;
    console.error("[chat] Gemini error:", detail);
    return jsonError(502, "Generation unavailable", detail);
  }

  // 10. Log request metadata (SHA-256 IP, never raw)
  const log = {
    timestamp: new Date().toISOString(),
    ip_hash: createHash("sha256").update(ip).digest("hex"),
    message_length: sanitized.length,
    chunks_retrieved: chunks.length,
    response_started: true,
  };
  console.log("[chat]", JSON.stringify(log));

  // 11. Stream response in SSE / Vercel AI SDK data stream format
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of geminiStream) {
          const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (text) {
            controller.enqueue(encoder.encode(`data: ${text}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        // Mid-stream error — headers already sent, close gracefully
        console.error("[chat] Stream error:", err instanceof Error ? err.message : err);
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: secureHeaders({
      "Content-Type": "text/event-stream",
      "X-Accel-Buffering": "no",
    }),
  });
}
