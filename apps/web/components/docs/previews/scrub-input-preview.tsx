"use client";

import { useState } from "react";
import { ScrubInput } from "@workspace/ui/components/scrub-input";

export function ScrubInputDemo() {
    const [opacity, setOpacity] = useState(44);

    return (
        <div className="flex h-full w-full items-center justify-center p-8">
            <ScrubInput
                label="Opacity"
                value={opacity}
                onChange={setOpacity}
                min={0}
                max={100}
            />
        </div>
    );
}

export function ScrubInputMultipleDemo() {
    const [radius, setRadius] = useState(12);
    const [blur, setBlur] = useState(24);

    return (
        <div className="flex h-full w-full flex-col gap-4 items-center justify-center p-8">
            <ScrubInput
                label="Border Radius"
                value={radius}
                onChange={setRadius}
                min={0}
                max={100}
            />
            <ScrubInput
                label="Blur"
                value={blur}
                onChange={setBlur}
                min={0}
                max={50}
            />
        </div>
    );
}
