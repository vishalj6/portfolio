import { z } from "zod";

const envSchema = z.object({
  GOOGLE_API_KEY: z.string().min(1),
  GROQ_API_KEY: z.string().min(1),
  PINECONE_API_KEY: z.string().min(1),
  PINECONE_INDEX_NAME: z.string().default("portfolio-bot"),
  BOT_OWNER_NAME: z.string().min(1),
  BOT_OWNER_HANDLE: z.string().min(1),
  RATE_LIMIT_RPM: z.coerce.number().default(12),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const missing = result.error.issues?.map((issue) => {
      const key = issue.path.join(".");
      return `  ✗ ${key}: ${issue.message}`;
    });

    console.error("\n[env] Missing or invalid environment variables:\n");
    console.error(missing.join("\n"));
    console.error("\nSee .env.local.example for setup instructions.\n");

    throw new Error("[env] Invalid environment — cannot start.");
  }

  return result.data;
}

export const env = parseEnv();