import { getIndex } from "@/lib/rag/pinecone-client";
import { embedText } from "@/lib/rag/embedder";
import { getSecurityHeaders } from "@/lib/security/headers";

const VERSION = "0.1.0";

interface CheckResult {
  ok: boolean;
  vector_count?: number;
  error?: string;
  missing?: string[];
}

interface HealthResponse {
  status: "ok" | "degraded" | "error";
  timestamp: string;
  checks: {
    pinecone: CheckResult;
    google_ai: CheckResult;
    environment: CheckResult;
  };
  version: string;
}

async function checkPinecone(): Promise<CheckResult> {
  try {
    const stats = await getIndex().describeIndexStats();
    const count = stats.totalRecordCount ?? 0;
    return { ok: count > 0, vector_count: count };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

async function checkGoogleAI(): Promise<CheckResult> {
  try {
    const result = await embedText("health check");
    const ok = Array.isArray(result) && result.length > 0 && typeof result[0] === "number";
    return { ok };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

function checkEnvironment(): CheckResult {
  const required = [
    "GOOGLE_API_KEY",
    "PINECONE_API_KEY",
    "PINECONE_INDEX_NAME",
    "BOT_OWNER_NAME",
    "BOT_OWNER_HANDLE",
  ];
  const missing = required.filter((key) => !process.env[key]);
  return { ok: missing.length === 0, ...(missing.length > 0 && { missing }) };
}

export async function GET(): Promise<Response> {
  const [pinecone, google_ai] = await Promise.all([
    checkPinecone(),
    checkGoogleAI(),
  ]);
  const environment = checkEnvironment();

  const checks = { pinecone, google_ai, environment };
  const failCount = Object.values(checks).filter((c) => !c.ok).length;
  const status: HealthResponse["status"] =
    failCount === 0 ? "ok" : failCount === 3 ? "error" : "degraded";

  const body: HealthResponse = {
    status,
    timestamp: new Date().toISOString(),
    checks,
    version: VERSION,
  };

  const headers = getSecurityHeaders();
  headers.set("Content-Type", "application/json");

  return new Response(JSON.stringify(body, null, 2), {
    status: status === "error" ? 503 : 200,
    headers,
  });
}
