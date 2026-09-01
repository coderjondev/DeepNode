import type { ChatAttachment } from "@/types/chat-input.type";
import { isImageFile } from "./file-utils";

export function createAttachment(file: File): ChatAttachment {
  return {
    id: [file.name, file.size, file.lastModified, crypto.randomUUID()].join(
      "-",
    ),

    file,

    previewUrl: isImageFile(file) ? URL.createObjectURL(file) : undefined,
  };
}

export function revokeAttachmentPreview(attachment: ChatAttachment) {
  if (attachment.previewUrl) {
    URL.revokeObjectURL(attachment.previewUrl);
  }
}
