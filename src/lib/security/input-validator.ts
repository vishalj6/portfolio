import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1000),
});

export const ChatInputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
  sessionId: z.string().max(64).optional(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

export function validateChatInput(body: unknown): ChatInput {
  return ChatInputSchema.parse(body);
}

const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+previous\s+instructions/gi,
  /you\s+are\s+now/gi,
  /disregard\s+your/gi,
  /new\s+instructions:/gi,
  /system:/gi,
  /jailbreak/gi,
  /pretend\s+you\s+are/gi,
];

export function sanitizeMessage(text: string): string {
  let sanitized = text;
  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[removed]");
  }
  return sanitized.trim().replace(/\s+/g, " ");
}
