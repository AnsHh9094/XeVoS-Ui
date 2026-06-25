"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ScrollChoreographyPreviewProps {
    src: string;
    title: string;
    className?: string;
}

export function ScrollChoreographyPreview({
    src,
    title,
    className,
}: ScrollChoreographyPreviewProps) {
    return (
        <div className={cn("relative w-full h-full min-h-[600px] overflow-hidden", className)}>
            <iframe src={src} className="w-full h-full border-0 bg-transparent" title={title} />
        </div>
    );
}
