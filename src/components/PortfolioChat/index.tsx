"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import type { UIMessage, PrepareSendMessagesRequest } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import ChatPanel from "./ChatPanel";
import styles from "./PortfolioChat.module.css";

const LS_HISTORY = "portfolio-bot-history";
const LS_OPENED = "portfolio-bot-opened";
const LS_SESSION = "portfolio-bot-session";

function getOrCreateSessionId(): string {
  try {
    const existing = localStorage.getItem(LS_SESSION);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(LS_SESSION, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

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

  // Stable session ID — persisted across page reloads, rotated on clear
  const sessionIdRef = useRef<string>("");
  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  // Stable function stored in a ref so the React Compiler doesn't flag
  // sessionIdRef.current as a render-time ref access (it's only read at call time).
  const prepareSendMessagesRequest = useRef<PrepareSendMessagesRequest<UIMessage>>(
    ({ messages }) => ({
      body: {
        sessionId: sessionIdRef.current,
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
    })
  ).current;

  const transport = useMemo(
    () => new TextStreamChatTransport({ api: "/api/chat", prepareSendMessagesRequest }),
    [] // stable — prepareSendMessagesRequest is a ref-stored function, never changes
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

  // Listen for openChat event from Navbar "Talk to AI" button
  useEffect(() => {
    const onOpenChat = () => handleOpen();
    window.addEventListener("openChat", onOpenChat);
    return () => window.removeEventListener("openChat", onOpenChat);
  }, []);

  function handleClear() {
    localStorage.removeItem(LS_HISTORY);
    localStorage.removeItem(LS_SESSION);
    sessionIdRef.current = getOrCreateSessionId();
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
              className={styles.chatWrapper}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 9999, transformOrigin: "bottom right" }}
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
        {!hasOpened && <span className={styles.pulseDot} />}
      </button>
    </div>
  );
}
