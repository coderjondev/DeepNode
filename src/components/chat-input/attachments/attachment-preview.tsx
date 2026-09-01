import type { AttachmentPreviewProps } from "@/types/chat-input.type";

import { AttachmentItem } from "./attachment-item";

export function AttachmentPreview({
  attachments,
  onRemove,
}: AttachmentPreviewProps) {
  if (!attachments.length) {
    return null;
  }

  return (
    <div className="flex gap-2 overflow-x-auto px-3 pt-3 pb-1">
      {attachments.map((attachment) => (
        <AttachmentItem
          key={attachment.id}
          attachment={attachment}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
