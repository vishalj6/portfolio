"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { UIMessage } from "ai";
import styles from "./PortfolioChat.module.css";

const GITHUB_AVATAR = "https://avatars.githubusercontent.com/vishal-jadeja";

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

  if (isUser) {
    return (
      <div className={`${styles.messageRow} ${styles.user}`}>
        <div className={`${styles.bubble} ${styles.user}`}>{text}</div>
        <span className={styles.timestamp}>{timeStr}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.messageRow} ${styles.bot}`}>
      <div className={styles.botMsgRow}>
        {/* Avatar */}
        <div className={styles.botAvatar}>
          <Image
            src={GITHUB_AVATAR}
            alt="Vishal's AI"
            width={24}
            height={24}
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
        {/* Bubble */}
        <div className={`${styles.bubble} ${styles.bot}`}>
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
        </div>
      </div>
      <span className={`${styles.timestamp} ${styles.botTimestamp}`}>{timeStr}</span>
    </div>
  );
}
