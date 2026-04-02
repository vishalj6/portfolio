"use client";

import { useEffect, useRef } from "react";
import type { UIMessage } from "ai";
import type { ChatStatus } from "ai";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import StarterQuestions from "./StarterQuestions";
import styles from "./PortfolioChat.module.css";

interface Props {
  messages: UIMessage[];
  status: ChatStatus;
  input: string;
  onInputChange: (val: string) => void;
  onSend: (text: string) => void;
  onClose: () => void;
  onClear: () => void;
}

// Stable per-session timestamps keyed by message id
const timestampCache = new Map<string, Date>();

function getTimestamp(id: string): Date {
  if (!timestampCache.has(id)) timestampCache.set(id, new Date());
  return timestampCache.get(id)!;
}

export default function ChatPanel({
  messages,
  status,
  input,
  onInputChange,
  onSend,
  onClose,
  onClear,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom on new content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus textarea when panel opens
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Auto-grow textarea
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
    onInputChange(el.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const text = input.trim();
    if (!text || isLoading) return;
    onSend(text);
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.headerName}>Vishal Jadeja</span>
          <span className={styles.headerSub}>Ask me anything</span>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.headerBtn}
            onClick={onClear}
            title="Clear chat"
            aria-label="Clear chat history"
          >
            ⌫
          </button>
          <button
            className={styles.headerBtn}
            onClick={onClose}
            title="Close"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.length === 0 ? (
          <StarterQuestions onSelect={onSend} disabled={isLoading} />
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              timestamp={getTimestamp(msg.id)}
            />
          ))
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything… (Enter to send)"
          disabled={isLoading}
          rows={1}
        />
        <button
          className={styles.sendBtn}
          onClick={submit}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          {/* Send arrow icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
