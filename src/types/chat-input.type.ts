import type { ChangeEvent, KeyboardEvent } from "react";

export type ChatAttachment = {
  id: string;
  file: File;
  previewUrl?: string;
};

export type ChatInputProps = {
  onSend?: (message: string, files: File[]) => void;

  disabled?: boolean;

  placeholder?: string;

  maxFileSize?: number;

  multiple?: boolean;

  accept?: string;
};

export type ChatInputTextareaProps = {
  value: string;
  disabled?: boolean;
  placeholder?: string;

  textareaRef: React.RefObject<HTMLTextAreaElement | null>;

  onChange: (value: string) => void;
  onPaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export type ChatInputToolbarProps = {
  disabled?: boolean;
  canSend: boolean;

  fileInputRef: React.RefObject<HTMLInputElement | null>;

  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;

  onSend: () => void;
};

export type AttachmentPreviewProps = {
  attachments: ChatAttachment[];

  onRemove: (id: string) => void;
};

export type AttachmentItemProps = {
  attachment: ChatAttachment;

  onRemove: (id: string) => void;
};

export type AttachmentDropzoneProps = {
  disabled?: boolean;
  onDropFiles: (files: File[]) => void;
  children: React.ReactNode;
};
