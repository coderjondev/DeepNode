import { useCallback, useEffect, useState } from "react";

import type { ChatAttachment } from "@/types/chat-input.type";

import {
  createAttachment,
  revokeAttachmentPreview,
} from "@/lib/attachment-utils";

import { DEFAULT_MAX_FILE_SIZE, isFileAllowed } from "@/lib/file-utils";

type UseAttachmentsOptions = {
  maxFileSize?: number;
};

export function useAttachments({
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
}: UseAttachmentsOptions = {}) {
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);

  const addFiles = useCallback(
    (files: File[]) => {
      if (!files.length) {
        return;
      }

      const validFiles = files.filter((file) =>
        isFileAllowed(file, maxFileSize),
      );

      if (!validFiles.length) {
        return;
      }

      const newAttachments = validFiles.map(createAttachment);

      setAttachments((current) => [...current, ...newAttachments]);
    },
    [maxFileSize],
  );

  const removeAttachment = useCallback((id: string) => {
    setAttachments((current) => {
      const attachment = current.find((item) => item.id === id);

      if (attachment) {
        revokeAttachmentPreview(attachment);
      }

      return current.filter((item) => item.id !== id);
    });
  }, []);

  const clearAttachments = useCallback(() => {
    setAttachments((current) => {
      current.forEach(revokeAttachmentPreview);

      return [];
    });
  }, []);

  useEffect(() => {
    return () => {
      attachments.forEach(revokeAttachmentPreview);
    };
  });

  return {
    attachments,

    addFiles,

    removeAttachment,

    clearAttachments,
  };
}
