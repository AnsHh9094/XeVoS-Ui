/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StickyScrollCardsPreviewProps {
  src: string;
  title: string;
  className?: string;
}

export function StickyScrollCardsPreview({
  src,
  title,
  className,
}: StickyScrollCardsPreviewProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <iframe src={src} className="w-full h-full border-0" title={title} />
    </div>
  );
} 
