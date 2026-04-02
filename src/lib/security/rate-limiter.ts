const requests = new Map<string, number[]>();

const WINDOW_MS = 60_000;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

function cleanup(ip: string, now: number): number[] {
  const timestamps = (requests.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  if (timestamps.length === 0) {
    requests.delete(ip);
  } else {
    requests.set(ip, timestamps);
  }
  return timestamps;
}

export function checkRateLimit(request: Request): {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
} {
  const limit = parseInt(process.env.RATE_LIMIT_RPM ?? "60", 10);
  const ip = getClientIp(request);
  const now = Date.now();

  const timestamps = cleanup(ip, now);

  if (timestamps.length >= limit) {
    const oldest = timestamps[0];
    const resetInMs = WINDOW_MS - (now - oldest);
    return { allowed: false, remaining: 0, resetInMs };
  }

  timestamps.push(now);
  requests.set(ip, timestamps);

  return {
    allowed: true,
    remaining: limit - timestamps.length,
    resetInMs: WINDOW_MS,
  };
}
