"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { ChatInputToolbarProps } from "@/types/chat-input.type";

export function ChatInputToolbar({
  disabled,
  canSend,
  fileInputRef,
  onFileChange,
  onSend,
}: ChatInputToolbarProps) {
  return (
    <div className="flex items-center justify-between px-2 pb-2 pt-2">
      <div className="flex items-center gap-1">
        <Button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          aria-label="Attach file"
          title="Attach file"
        >
          <PaperclipIcon />
        </Button>

        <Input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      <Button
        type="button"
        disabled={!canSend}
        onClick={onSend}
        className={[
          "flex h-9 w-9 items-center justify-center",
          "rounded-full transition-all",
          canSend
            ? "bg-foreground text-background hover:opacity-80"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
        aria-label="Send message"
        title="Send message"
      >
        <SendIcon />
      </Button>
    </div>
  );
}

function PaperclipIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
