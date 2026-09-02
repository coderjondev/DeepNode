"use client";

import { AttachmentDropzoneProps } from "@/types/chat-input.type";
import { DragEvent, useState } from "react";
import { Upload } from "@/icons/icons";

export function AttachmentDropzone({
  disabled = false,
  onDropFiles,
  children,
}: AttachmentDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    setIsDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    event.dataTransfer.dropEffect = "copy";

    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget === event.target) {
      setIsDragging(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(event.dataTransfer.files);

    onDropFiles(files);
  };

  return (
    <div
      className="relative w-full"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl border-2 border-dashed border-primary bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Upload />
            </div>

            <p className="text-sm font-medium">Drop files here</p>

            <p className="text-xs text-muted-foreground">
              Images and files are supported
            </p>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
