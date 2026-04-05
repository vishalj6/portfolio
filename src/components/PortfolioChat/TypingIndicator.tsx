"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-start animate-[msgSlideIn_0.2s_ease_forwards]">
      <div className="bg-white/[0.04] border border-[var(--theme-border-main)] rounded-[3px_16px_16px_16px] px-[15px] py-[11px] flex items-center gap-1">
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--theme-text-muted)] animate-[dotBounce_1.4s_ease-in-out_infinite] [animation-delay:0ms]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--theme-text-muted)] animate-[dotBounce_1.4s_ease-in-out_infinite] [animation-delay:130ms]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--theme-text-muted)] animate-[dotBounce_1.4s_ease-in-out_infinite] [animation-delay:260ms]" />
      </div>
    </div>
  );
}
