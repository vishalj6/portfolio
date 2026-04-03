import { z } from "zod";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(8000),
});

export const ChatInputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
  // Enforce UUID format so sessionId can never be used as an injection vector
  sessionId: z.string().uuid().optional(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

export function validateChatInput(body: unknown): ChatInput {
  return ChatInputSchema.parse(body);
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

/**
 * Normalize text before pattern matching.
 * Handles unicode homoglyph attacks (е vs e), combining marks,
 * and zero-width characters commonly used to slip past regex filters.
 */
function normalize(text: string): string {
  return (
    text
      .normalize("NFKD")
      // Strip combining diacritical marks (homoglyph defense)
      .replace(/[\u0300-\u036f]/g, "")
      // Collapse zero-width / invisible characters
      .replace(/[\u200b-\u200f\u2028-\u202f\u2060-\u206f\ufeff]/g, "")
      .toLowerCase()
  );
}

// ---------------------------------------------------------------------------
// Injection detection patterns
// ---------------------------------------------------------------------------

interface Pattern {
  re: RegExp;
  label: string;
}

/**
 * Prompt injection patterns.
 * Covers instruction overrides, identity hijacking, system prompt extraction,
 * LLM template token injection, and unrestricted-mode jailbreaks.
 *
 * NOTE: All patterns use the `i` flag only (not `g`) — `.test()` is stateless
 * with non-global regexes and does not advance lastIndex.
 */
const INJECTION_PATTERNS: Pattern[] = [
  // ── Instruction overrides ──────────────────────────────────────────────────
  { re: /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions?|rules?|constraints?|directives?)/i, label: "ignore-instructions" },
  { re: /disregard\s+(your\s+)?(instructions?|rules?|guidelines?|system\s+prompt|constraints?)/i, label: "disregard-instructions" },
  { re: /forget\s+(everything|all\s+previous|your\s+instructions?|the\s+(previous|prior|above))/i, label: "forget-instructions" },
  { re: /override\s+(your\s+)?(instructions?|rules?|system|directives?|programming)/i, label: "override-instructions" },
  { re: /bypass\s+(your\s+)?(instructions?|rules?|restrictions?|filters?|safety|guardrails?)/i, label: "bypass" },
  { re: /\bdo\s+not\s+follow\s+(your\s+)?(instructions?|rules?|guidelines?)/i, label: "do-not-follow" },
  { re: /stop\s+following\s+(your\s+)?(instructions?|rules?|guidelines?)/i, label: "stop-following" },

  // ── Identity hijacking ─────────────────────────────────────────────────────
  // Exclude legitimate references to "you are now" in context of Vishal
  { re: /you\s+are\s+now\s+(?!vishal|the\s+portfolio|a\s+portfolio)/i, label: "identity-override" },
  { re: /pretend\s+(you\s+are|to\s+be)\s+/i, label: "pretend" },
  { re: /act\s+as\s+(a\s+|an\s+)?(?!vishal|the\s+portfolio|his)/i, label: "act-as" },
  { re: /role\s*-?\s*play\s+as\s+/i, label: "roleplay" },
  { re: /play\s+the\s+role\s+of\s+/i, label: "roleplay" },
  { re: /simulate\s+(being|a|an)\s+\w/i, label: "simulate" },
  { re: /\bdan\b.{0,30}\bdo\s+anything\s+now\b/i, label: "dan-jailbreak" },
  { re: /do\s+anything\s+now/i, label: "dan-jailbreak" },
  { re: /developer\s+mode\s*(enabled|on|activate)/i, label: "developer-mode" },
  { re: /\bgod\s+mode\b/i, label: "god-mode" },
  { re: /\bjailbreak\b/i, label: "jailbreak" },
  { re: /your\s+true\s+(self|form|nature)/i, label: "true-self" },
  { re: /your\s+real\s+(self|personality|identity)/i, label: "real-self" },
  { re: /unleash\s+(your|the)\s+(true|real|hidden|inner)/i, label: "unleash" },

  // ── New instruction injection ──────────────────────────────────────────────
  { re: /new\s+instructions?\s*:/i, label: "new-instructions" },
  { re: /updated\s+instructions?\s*:/i, label: "updated-instructions" },
  { re: /from\s+now\s+on[,\s]/i, label: "from-now-on" },
  { re: /your\s+(new\s+)?(prime\s+)?directive\s+(is|will)/i, label: "directive" },
  { re: /\bsudo\b.{0,20}(mode|access|execute|run)/i, label: "sudo" },
  { re: /maintenance\s+mode/i, label: "maintenance-mode" },
  { re: /training\s+mode/i, label: "training-mode" },
  { re: /\badmin\s+(mode|access|override)\b/i, label: "admin-mode" },

  // ── System prompt extraction ───────────────────────────────────────────────
  { re: /(reveal|show|print|output|repeat|tell\s+me|display|expose)\s+(your|the)\s+(system\s+prompt|instructions?|rules?|context|prompt|configuration)/i, label: "prompt-extraction" },
  { re: /what\s+(are|were)\s+your\s+(instructions?|system\s+prompt|rules?|directives?)/i, label: "prompt-extraction" },
  { re: /repeat\s+(the\s+)?(above|everything|instructions?|prompt|system|context)/i, label: "prompt-extraction" },
  { re: /echo\s+(your|the)\s+(instructions?|prompt|system|rules?)/i, label: "prompt-extraction" },
  { re: /copy\s+(your|the)\s+(instructions?|prompt|system\s+prompt)/i, label: "prompt-extraction" },
  { re: /what\s+(is|was)\s+(in\s+)?(your|the)\s+system\s+prompt/i, label: "prompt-extraction" },
  { re: /summarize\s+(your|the)\s+(system\s+prompt|instructions?|rules?)/i, label: "prompt-extraction" },

  // ── LLM template token injection ──────────────────────────────────────────
  { re: /<\|\s*(system|user|assistant|im_start|im_end|endoftext)\s*\|>/i, label: "template-token" },
  { re: /\[INST\]|\[\/INST\]/i, label: "template-token" },
  { re: /<<SYS>>|<<\/SYS>>/i, label: "template-token" },
  { re: /<\|begin_of_text\|>/i, label: "template-token" },
  { re: /###\s*(Human|Assistant|System)\s*:/i, label: "template-token" },

  // ── Unrestricted / no-filter mode ─────────────────────────────────────────
  { re: /without\s+(any\s+)?(restrictions?|filters?|limitations?|constraints?|censorship)/i, label: "unrestricted" },
  { re: /no\s+(restrictions?|filters?|limitations?|safety\s+guidelines?|censorship)/i, label: "unrestricted" },
  { re: /unrestricted\s+mode/i, label: "unrestricted-mode" },
  { re: /disable\s+(your\s+)?(safety|filters?|restrictions?|guardrails?)/i, label: "disable-safety" },
  { re: /turn\s+off\s+(your\s+)?(safety|filters?|restrictions?|guardrails?)/i, label: "disable-safety" },
];

// ---------------------------------------------------------------------------
// Off-topic coding request patterns
// ---------------------------------------------------------------------------

/**
 * Patterns that indicate the user wants the model to write or debug code —
 * which is outside the scope of a portfolio assistant.
 *
 * Deliberately conservative to avoid false positives on questions like
 * "What coding projects has Vishal built?" or "What's your tech stack?".
 */
const CODING_REQUEST_PATTERNS: Pattern[] = [
  { re: /write\s+(me\s+)?(a\s+|the\s+)?(function|class|script|code|program|algorithm|component|module|snippet|api|endpoint|query|sql|regex)/i, label: "write-code" },
  { re: /\b(debug|fix)\s+(this|my|the)\s+(code|bug|error|issue|function|script|program|test)/i, label: "debug-fix" },
  { re: /help\s+me\s+(code|implement|program|develop|build\s+a\s+(script|function|program|bot|api))/i, label: "coding-help" },
  { re: /generate\s+(me\s+)?(a\s+|the\s+)?(function|class|code|script|component|program|snippet|boilerplate)/i, label: "generate-code" },
  { re: /create\s+(a\s+|the\s+|me\s+a?\s*)?(function|class|script|program|bot|scraper|crawler|automation\s+script|cron\s+job)/i, label: "create-code" },
  { re: /give\s+me\s+(the\s+)?(code|implementation|source\s+code|working\s+code|solution\s+code)/i, label: "give-code" },
  { re: /code\s+(this|it)\s+(for|up)\s+(me|please|now)/i, label: "code-for-me" },
  { re: /solve\s+(this|the|my)\s+(leetcode|hackerrank|coding|algorithm|programming)\s+(problem|challenge|exercise|question)/i, label: "competitive-coding" },
  { re: /write\s+(a\s+)?(python|javascript|typescript|java|c\+\+|golang|rust|php|ruby|swift|kotlin)\s+(script|code|function|class|program|module)/i, label: "write-lang-code" },
  { re: /\brefactor\s+(this|my|the)\s+(code|function|class|component|module)/i, label: "refactor-code" },
  { re: /show\s+me\s+(how\s+to\s+code|the\s+code|a\s+code\s+example\s+for|how\s+to\s+implement)/i, label: "show-code" },
  { re: /complete\s+(this|the|my)\s+(code|function|class|implementation)/i, label: "complete-code" },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface AbuseDetection {
  isInjection: boolean;
  isCodingRequest: boolean;
  labels: string[];
}

/**
 * Detects prompt injection and off-topic coding requests in the raw
 * (pre-sanitization) user message.
 *
 * Applies unicode normalization before matching so that homoglyph substitution
 * (е → e, ｓystem → system) and zero-width character insertion do not bypass
 * pattern matching.
 */
export function detectAbuse(rawText: string): AbuseDetection {
  const text = normalize(rawText);
  const injectionLabels: string[] = [];
  const codingLabels: string[] = [];

  for (const { re, label } of INJECTION_PATTERNS) {
    if (re.test(text)) injectionLabels.push(label);
  }

  for (const { re, label } of CODING_REQUEST_PATTERNS) {
    if (re.test(text)) codingLabels.push(label);
  }

  return {
    isInjection: injectionLabels.length > 0,
    isCodingRequest: codingLabels.length > 0,
    labels: [...injectionLabels, ...codingLabels],
  };
}

// ---------------------------------------------------------------------------
// Sanitization — secondary / belt-and-suspenders layer
// ---------------------------------------------------------------------------

const SANITIZE_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|rules?)/gi,
  /you\s+are\s+now/gi,
  /disregard\s+(your\s+)?(instructions?|rules?)/gi,
  /new\s+instructions?\s*:/gi,
  /updated\s+instructions?\s*:/gi,
  /\bjailbreak\b/gi,
  /pretend\s+(you\s+are|to\s+be)/gi,
  /act\s+as\s+(a\s+|an\s+)?/gi,
  /from\s+now\s+on/gi,
  /forget\s+(everything|all|your)/gi,
  /<\|\s*(system|user|assistant|im_start|im_end)\s*\|>/gi,
  /\[INST\]|\[\/INST\]/gi,
  /<<SYS>>|<<\/SYS>>/gi,
];

/**
 * Replaces known injection phrases with "[removed]".
 * This is a secondary defense — detection via detectAbuse() should be the
 * primary gate. Do not rely solely on sanitization.
 */
export function sanitizeMessage(text: string): string {
  let sanitized = text;
  for (const pattern of SANITIZE_PATTERNS) {
    sanitized = sanitized.replace(pattern, "[removed]");
  }
  return sanitized.trim().replace(/\s+/g, " ");
}
