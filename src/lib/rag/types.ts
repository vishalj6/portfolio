export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RetrievedChunk {
  text: string;
  source_file: string;
  score: number;
}

export interface IngestResult {
  source_file: string;
  chunks_created: number;
  chunks_deleted: number;
  success: boolean;
  error?: string;
}

export interface HealthStatus {
  ok: boolean;
  pinecone: boolean;
  embedder: boolean;
  vector_count?: number;
  error?: string;
}
