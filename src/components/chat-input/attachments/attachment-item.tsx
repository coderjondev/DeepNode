import type { AttachmentItemProps } from "@/types/chat-input.type";

import { formatFileSize, isImageFile } from "@/lib/file-utils";

import { Button } from "@/components/ui/button";

import { X, File } from "@/icons/icons";

export function AttachmentItem({ attachment, onRemove }: AttachmentItemProps) {
  const isImage = isImageFile(attachment.file);

  if (isImage && attachment.previewUrl) {
    return (
      <div className="group relative shrink-0">
        <div className="relative h-13 w-13 overflow-hidden rounded-lg border bg-muted">
          <img
            src={attachment.previewUrl}
            alt={attachment.file.name}
            className="h-full w-full object-cover"
          />

          <Button
            size="icon"
            onClick={() => onRemove(attachment.id)}
            className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full cursor-pointer"
            aria-label={`Remove ${attachment.file.name}`}
          >
            <X />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-13 min-w-48 max-w-64 shrink-0 items-center gap-3 rounded-lg border bg-muted/50 px-3">
      <div className="flex shrink-0 items-center justify-center h-8 w-8 rounded-lg bg-muted">
        <File />
      </div>

      <div className="min-w-0 flex-1 pr-6">
        <p className="truncate text-sm font-medium">{attachment.file.name}</p>

        <p className="text-xs text-muted-foreground">
          {formatFileSize(attachment.file.size)}
        </p>
      </div>

      <Button
        size="icon"
        onClick={() => onRemove(attachment.id)}
        className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full cursor-pointer"
        aria-label={`Remove ${attachment.file.name}`}
      >
        <X />
      </Button>
    </div>
  );
}
