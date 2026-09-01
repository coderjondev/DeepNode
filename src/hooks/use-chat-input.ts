import { useCallback, useRef, useState } from "react";

import type { ChatInputProps } from "@/types/chat-input.type";

import { useAttachments } from "./use-attachments";
import { useAutoResizeTextarea } from "./use-auto-resize-textarea";

export function useChatInput({
  onSend,
  disabled = false,
  maxFileSize,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");

  const { attachments, addFiles, removeAttachment, clearAttachments } =
    useAttachments({
      maxFileSize,
    });

  useAutoResizeTextarea(textareaRef, message);

  const sendMessage = useCallback(() => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage && attachments.length === 0) {
      return;
    }

    if (disabled) {
      return;
    }

    const files = attachments.map((attachment) => attachment.file);

    onSend?.(trimmedMessage, files);

    setMessage("");

    clearAttachments();

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  }, [message, attachments, disabled, onSend, clearAttachments]);

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = Array.from(event.clipboardData.items);

      const files = items
        .filter((item) => item.kind === "file")
        .map((item) => item.getAsFile())
        .filter((file): file is File => Boolean(file));

      if (!files.length) {
        return;
      }

      event.preventDefault();

      addFiles(files);
    },
    [addFiles],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Enter") {
        return;
      }

      if (event.shiftKey) {
        return;
      }

      event.preventDefault();

      sendMessage();
    },
    [sendMessage],
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);

      addFiles(files);

      event.target.value = "";
    },
    [addFiles],
  );

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const canSend =
    !disabled && (message.trim().length > 0 || attachments.length > 0);

  return {
    message,
    setMessage,

    attachments,

    textareaRef,
    fileInputRef,

    canSend,

    addFiles,
    removeAttachment,

    handlePaste,
    handleKeyDown,
    handleFileChange,

    openFilePicker,

    sendMessage,
  };
}
