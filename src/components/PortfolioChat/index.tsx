"use client";

import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import type { UIMessage, PrepareSendMessagesRequest } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import ChatPanel from "./ChatPanel";
import styles from "./PortfolioChat.module.css";

const LS_HISTORY = "portfolio-bot-history";
const LS_OPENED = "portfolio-bot-opened";

// Convert v6 UIMessage[] → {role, content}[] that our backend expects
const prepareSendMessagesRequest: PrepareSendMessagesRequest<UIMessage> = ({
  messages,
}) => ({
  body: {
    messages: messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.parts
          .filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join(""),
      }))
      .filter((m) => m.content.length > 0),
  },
});

function loadHistory(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_HISTORY);
    return raw ? (JSON.parse(raw) as UIMessage[]) : [];
  } catch {
    return [];
  }
}

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(
    () => typeof window !== "undefined" && !!localStorage.getItem(LS_OPENED)
  );
  const [input, setInput] = useState("");

  // Load initial state from localStorage (runs once on mount)
  const [initialMessages] = useState<UIMessage[]>(() => loadHistory());

  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/chat", prepareSendMessagesRequest }),
    []
  );

  const { messages, sendMessage, status, setMessages } = useChat({
    messages: initialMessages,
    transport,
  });

  // Persist messages to localStorage on every change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LS_HISTORY, JSON.stringify(messages));
    }
  }, [messages]);

  function handleOpen() {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      localStorage.setItem(LS_OPENED, "1");
    }
  }

  function handleClear() {
    localStorage.removeItem(LS_HISTORY);
    setMessages([]);
  }

  function handleSend(text: string) {
    if (!text.trim()) return;
    setInput("");
    sendMessage({ text: text.trim() });
  }

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              key="backdrop"
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", bottom: "72px", right: "0", zIndex: 9999 }}
            >
              <ChatPanel
                messages={messages}
                status={status}
                input={input}
                onInputChange={setInput}
                onSend={handleSend}
                onClose={() => setIsOpen(false)}
                onClear={handleClear}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <button
        className={styles.toggleBtn}
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          // X icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--theme-text-main, #111111)">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          // Chat bubble icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--theme-text-main, #111111)">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
        {!hasOpened && <span className={styles.pulseDot} />}
      </button>
    </div>
  );
}
