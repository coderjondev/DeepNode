"use client";

import type { ChatInputProps } from "@/types/chat-input.type";

import { ChatInputBox } from "./chat-input-box";

export default function ChatInput(props: ChatInputProps) {
  return (
    <div className="max-w-3xl mx-auto w-full mb-2.5">
      <ChatInputBox {...props} />
    </div>
  );
}
