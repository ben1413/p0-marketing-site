"use client";

interface TextBlockProps {
  content: string;
  isStreaming?: boolean;
}

export function TextBlock({ content, isStreaming }: TextBlockProps) {
  return (
    <p className={`text-[12px] leading-relaxed whitespace-pre-wrap text-[var(--text-blue)] ${isStreaming ? "after:content-['▋'] after:text-amber-400/60 after:animate-pulse" : ""}`}>
      {content}
    </p>
  );
}
