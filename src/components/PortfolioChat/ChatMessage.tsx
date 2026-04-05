"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { UIMessage } from "ai";

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
      <div className="flex flex-col items-end animate-[msgSlideIn_0.22s_cubic-bezier(0.22,1,0.36,1)_forwards]">
        <div className="max-w-[82%] min-w-0 px-[13px] py-[9px] text-[13.5px] leading-[1.6] break-words bg-[var(--theme-text-main)] text-[var(--theme-bg)] rounded-[16px_16px_3px_16px] font-medium tracking-[-0.01em] shadow-[0_2px_12px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.1)_inset]">
          {text}
        </div>
        <span className="text-[9.5px] font-mono text-[var(--theme-text-muted)] mt-[3px] opacity-40 px-1 tracking-[0.03em]">
          {timeStr}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start animate-[msgSlideIn_0.22s_cubic-bezier(0.22,1,0.36,1)_forwards]">
      <div className="flex flex-row items-end gap-2 max-w-[90%]">
        {/* Bot avatar */}
        <div className="w-[22px] h-[22px] rounded-full overflow-hidden border border-[var(--theme-border-main)] flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          <Image
            src={GITHUB_AVATAR}
            alt="Vishal's AI"
            width={24}
            height={24}
            className="rounded-full object-cover"
            unoptimized
          />
        </div>
        {/* Bot bubble */}
        <div className="max-w-full min-w-0 px-[13px] py-[9px] text-[13.5px] leading-[1.6] break-words bg-white/[0.04] text-[var(--theme-text-main)] border border-[var(--theme-border-main)] rounded-[16px_16px_16px_3px] shadow-[0_1px_4px_rgba(0,0,0,0.15)] [&_p]:m-0 [&_p]:mb-[6px] [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_em]:italic [&_ul]:my-1 [&_ul]:ml-4 [&_ul]:p-0 [&_ol]:my-1 [&_ol]:ml-4 [&_ol]:p-0 [&_li]:mb-[3px] [&_a]:text-[var(--theme-text-main)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:opacity-85 [&_a:hover]:opacity-100 [&_pre]:bg-black/30 [&_pre]:border [&_pre]:border-[var(--theme-border-main)] [&_pre]:rounded-lg [&_pre]:px-3 [&_pre]:py-2.5 [&_pre]:overflow-x-auto [&_pre]:my-2 [&_pre]:text-[12px] [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-white/[0.06] [&_code]:px-[5px] [&_code]:py-px [&_code]:rounded [&_code]:border [&_code]:border-[var(--theme-border-main)] [&_pre_code]:bg-transparent [&_pre_code]:border-none [&_pre_code]:p-0">
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
      <span className="text-[9.5px] font-mono text-[var(--theme-text-muted)] mt-[3px] opacity-40 px-1 tracking-[0.03em] ml-[30px]">
        {timeStr}
      </span>
    </div>
  );
}
