"use client";

import { Textarea } from "@/components/ui/textarea";

import type { ChatInputTextareaProps } from "@/types/chat-input.type";

export function ChatInputTextarea({
  value,
  disabled,
  placeholder,
  textareaRef,
  onChange,
  onPaste,
  onKeyDown,
}: ChatInputTextareaProps) {
  return (
    <div className="pl-2.5 pr-0 pt-2.5">
      <Textarea
        ref={textareaRef}
        value={value}
        disabled={disabled}
        rows={1}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        className="block max-h-45 w-full resize-none overflow-y-auto min-h-11 bg-transparent! focus-visible:ring-0 text-[15px] px-0 border-none leading-6 outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
