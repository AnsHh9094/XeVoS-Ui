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
        <div className={cn("relative w-full h-[600px] md:h-[800px] overflow-hidden rounded-xl border border-border bg-background", className)}>
            <iframe src={src} className="w-full h-full border-0" title={title} />
        </div>
    );
}
