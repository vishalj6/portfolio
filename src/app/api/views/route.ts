import { supabase } from "@/lib/supabase";
import { getSecurityHeaders } from "@/lib/security/headers";
import { checkRateLimit } from "@/lib/security/rate-limiter";

function json(data: unknown, status = 200): Response {
  const headers = getSecurityHeaders();
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(data), { status, headers });
}

/**
 * GET /api/views?page=/
 * Returns the total view count across all days for the given page.
 * Defaults to "/" if no page query param is provided.
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "/";

  const { data, error } = await supabase
    .from("page_views")
    .select("count")
    .eq("page", page);

  if (error) return json({ error: "Failed to fetch views" }, 500);

  const total = (data ?? []).reduce((sum, row) => sum + Number(row.count), 0);
  return json({ count: total, page });
}

/**
 * POST /api/views
 * Body: { page?: string }  — defaults to "/"
 * Atomically increments today's view count for the given page.
 */
export async function POST(request: Request): Promise<Response> {
  const rl = checkRateLimit(request);
  if (!rl.allowed) {
    return json({ error: "Too many requests" }, 429);
  }

  let page = "/";
  try {
    const body = await request.json().catch(() => ({}));
    if (typeof body?.page === "string" && body.page.startsWith("/")) {
      page = body.page.slice(0, 200); // reasonable path length cap
    }
  } catch {
    // body is optional — default to "/"
  }

  const { data, error } = await supabase.rpc("increment_views", { p_page: page });
  if (error) return json({ error: "Failed to increment views" }, 500);
  return json({ count: data, page });
}
