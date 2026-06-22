"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CollectionSurferPreviewProps {
  src: string;
  title: string;
  className?: string;
}

export function CollectionSurferPreview({
  src,
  title,
  className,
}: CollectionSurferPreviewProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <iframe src={src} className="w-full h-full border-0" title={title} />
    </div>
  );
}
