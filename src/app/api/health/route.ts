import { getIndex } from "@/lib/rag/pinecone-client";
import { embedText } from "@/lib/rag/embedder";
import { getSecurityHeaders } from "@/lib/security/headers";

const VERSION = "0.1.0";

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * Require `Authorization: Bearer <HEALTH_SECRET>` when the env var is set.
 * If HEALTH_SECRET is not configured, the endpoint returns a minimal status
 * response with no infrastructure details — safe for public access.
 */
function isAuthorized(request: Request): boolean {
  const secret = process.env.HEALTH_SECRET;
  if (!secret) return false; // no secret = no full access
  const auth = request.headers.get("authorization") ?? "";
  return auth === `Bearer ${secret}`;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

interface CheckResult {
  ok: boolean;
  vector_count?: number;
  // Error messages are intentionally stripped from public responses
  error?: string;
  missing?: string[];
}

async function checkPinecone(): Promise<CheckResult> {
  try {
    const stats = await getIndex().describeIndexStats();
    const count = stats.totalRecordCount ?? 0;
    return { ok: count > 0, vector_count: count };
  } catch {
    // Never expose raw error messages — they can leak SDK versions and config details
    return { ok: false, error: "unreachable" };
  }
}

async function checkGoogleAI(): Promise<CheckResult> {
  try {
    const result = await embedText("health check");
    const ok =
      Array.isArray(result) && result.length > 0 && typeof result[0] === "number";
    return { ok };
  } catch {
    return { ok: false, error: "unreachable" };
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
  // Only expose which keys are missing to authenticated callers
  return { ok: missing.length === 0 };
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

export async function GET(request: Request): Promise<Response> {
  const headers = getSecurityHeaders();
  headers.set("Content-Type", "application/json");

  const authorized = isAuthorized(request);

  if (!authorized) {
    // Public response: status only — no infrastructure details
    // Run checks anyway so the status reflects reality
    const [pinecone, google_ai] = await Promise.all([
      checkPinecone(),
      checkGoogleAI(),
    ]);
    const environment = checkEnvironment();

    const failCount = [pinecone, google_ai, environment].filter(
      (c) => !c.ok
    ).length;
    const status = failCount === 0 ? "ok" : failCount === 3 ? "error" : "degraded";

    return new Response(
      JSON.stringify({ status, timestamp: new Date().toISOString() }),
      { status: status === "error" ? 503 : 200, headers }
    );
  }

  // Authenticated: full diagnostic response
  const [pinecone, google_ai] = await Promise.all([
    checkPinecone(),
    checkGoogleAI(),
  ]);

  // Re-run environment check with missing key names for authenticated callers
  const required = [
    "GOOGLE_API_KEY",
    "PINECONE_API_KEY",
    "PINECONE_INDEX_NAME",
    "BOT_OWNER_NAME",
    "BOT_OWNER_HANDLE",
  ];
  const missing = required.filter((key) => !process.env[key]);
  const environment: CheckResult = {
    ok: missing.length === 0,
    ...(missing.length > 0 && { missing }),
  };

  const checks = { pinecone, google_ai, environment };
  const failCount = Object.values(checks).filter((c) => !c.ok).length;
  const status = failCount === 0 ? "ok" : failCount === 3 ? "error" : "degraded";

  return new Response(
    JSON.stringify({ status, timestamp: new Date().toISOString(), checks, version: VERSION }, null, 2),
    { status: status === "error" ? 503 : 200, headers }
  );
}
