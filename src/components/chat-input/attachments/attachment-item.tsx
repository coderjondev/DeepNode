import type { AttachmentItemProps } from "@/types/chat-input.type";

import { formatFileSize, isImageFile } from "@/lib/file-utils";

import { Button } from "@/components/ui/button";

export function AttachmentItem({ attachment, onRemove }: AttachmentItemProps) {
  const isImage = isImageFile(attachment.file);

  if (isImage && attachment.previewUrl) {
    return (
      <div className="group relative shrink-0">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl border bg-muted">
          <img
            src={attachment.previewUrl}
            alt={attachment.file.name}
            className="h-full w-full object-cover"
          />

          <Button
            type="button"
            size="icon"
            onClick={() => onRemove(attachment.id)}
            className="absolute right-1 top-1 h-6 w-6 rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Remove ${attachment.file.name}`}
          >
            <CloseIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-20 min-w-48 max-w-64 shrink-0 items-center gap-3 rounded-2xl border bg-muted/50 px-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background">
        <FileIcon />
      </div>

      <div className="min-w-0 flex-1 pr-6">
        <p className="truncate text-sm font-medium">{attachment.file.name}</p>

        <p className="text-xs text-muted-foreground">
          {formatFileSize(attachment.file.size)}
        </p>
      </div>

      <Button
        type="button"
        size="icon"
        onClick={() => onRemove(attachment.id)}
        className="absolute right-2 top-2 h-6 w-6 rounded-full"
        aria-label={`Remove ${attachment.file.name}`}
      >
        <CloseIcon />
      </Button>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
