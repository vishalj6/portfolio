"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { UIMessage } from "ai";
import styles from "./PortfolioChat.module.css";

function getTextFromParts(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

interface Props {
  message: UIMessage;
  timestamp: Date;
}

export default function ChatMessage({ message, timestamp }: Props) {
  const isUser = message.role === "user";
  const text = getTextFromParts(message);

  const timeStr = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`${styles.messageRow} ${isUser ? styles.user : styles.bot}`}>
      <div className={`${styles.bubble} ${isUser ? styles.user : styles.bot}`}>
        {isUser ? (
          text
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              pre: ({ children }) => <pre>{children}</pre>,
              code: ({ children, className }) => (
                <code className={className}>{children}</code>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        )}
      </div>
      <span className={styles.timestamp}>{timeStr}</span>
    </div>
  );
}
