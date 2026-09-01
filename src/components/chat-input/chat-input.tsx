"use client";

import type { ChatInputProps } from "@/types/chat-input.type";

import { ChatInputBox } from "./chat-input-box";

export default function ChatInput(props: ChatInputProps) {
  return (
    <div className="w-full">
      <ChatInputBox {...props} />
    </div>
  );
}
