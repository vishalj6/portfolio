import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/lib/config/env";

export class EmbedError extends Error {
  constructor(
    message: string,
    public readonly context?: string
  ) {
    super(message);
    this.name = "EmbedError";
  }
}

let _client: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!_client) {
    _client = new GoogleGenerativeAI(env.GOOGLE_API_KEY);
  }
  return _client;
}

const EMBED_MODEL = "text-embedding-004";
const MAX_CHARS = 2000;
const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 250;

export async function embedText(text: string): Promise<number[]> {
  const trimmed = text.trim().slice(0, MAX_CHARS);
  try {
    const model = getClient().getGenerativeModel({ model: EMBED_MODEL });
    const result = await model.embedContent(trimmed);
    return result.embedding.values;
  } catch (err) {
    const context = `embedText — input length: ${trimmed.length}`;
    console.error(`[embedder] Error in ${context}:`, err);
    throw new EmbedError(
      err instanceof Error ? err.message : "Unknown embedding error",
      context
    );
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const results: number[][] = new Array(texts.length);

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batchTexts = texts.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batchTexts.map(embedText));

    for (let j = 0; j < batchResults.length; j++) {
      results[i + j] = batchResults[j];
    }

    if (i + BATCH_SIZE < texts.length) {
      await delay(BATCH_DELAY_MS);
    }
  }

  return results;
}
