"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Paperclip } from "@/icons/icons";

import type { ChatInputToolbarProps } from "@/types/chat-input.type";

export function ChatInputToolbar({
  disabled,
  canSend,
  fileInputRef,
  onFileChange,
  onSend,
}: ChatInputToolbarProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2.5">
        <Button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors disabled:pointer-events-none cursor-pointer"
          aria-label="Attach file"
          title="Attach file"
        >
          <Paperclip />
        </Button>

        <Input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      <div className="flex items-center gap-2.5">
        <Button className={"cursor-pointer"}>Sonnet 5</Button>
        <Button
          disabled={!canSend}
          onClick={onSend}
          className={[
            "flex h-9 w-9 items-center justify-center",
            "rounded-full transition-all cursor-pointer",
            canSend ? "" : "bg-muted text-muted-foreground",
          ].join(" ")}
          aria-label="Send message"
          title="Send message"
        >
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
}
