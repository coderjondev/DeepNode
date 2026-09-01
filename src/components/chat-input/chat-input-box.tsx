"use client";

import type { ChatInputProps } from "@/types/chat-input.type";

import { useChatInput } from "@/hooks/use-chat-input";

import { AttachmentPreview } from "./attachments/attachment-preview";
import { AttachmentDropzone } from "./attachments/attachment-dropzone";

import { ChatInputTextarea } from "./chat-input-textarea";
import { ChatInputToolbar } from "./chat-input-toolbar";

export function ChatInputBox({
  onSend,
  disabled = false,
  placeholder = "Message KK3...",
  maxFileSize,
}: ChatInputProps) {
  const chatInput = useChatInput({
    onSend,
    disabled,
    maxFileSize,
  });

  return (
    <AttachmentDropzone disabled={disabled} onDropFiles={chatInput.addFiles}>
      <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm transition-all duration-200 focus-within:border-primary/40 focus-within:shadow-md">
        <AttachmentPreview
          attachments={chatInput.attachments}
          onRemove={chatInput.removeAttachment}
        />

        <ChatInputTextarea
          value={chatInput.message}
          disabled={disabled}
          placeholder={placeholder}
          textareaRef={chatInput.textareaRef}
          onChange={chatInput.setMessage}
          onPaste={chatInput.handlePaste}
          onKeyDown={chatInput.handleKeyDown}
        />

        <ChatInputToolbar
          disabled={disabled}
          canSend={chatInput.canSend}
          fileInputRef={chatInput.fileInputRef}
          onFileChange={chatInput.handleFileChange}
          onSend={chatInput.sendMessage}
        />
      </div>
    </AttachmentDropzone>
  );
}
