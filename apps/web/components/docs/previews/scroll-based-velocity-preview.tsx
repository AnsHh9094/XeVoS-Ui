"use client";

import { useRef } from "react";
import { ScrollBasedVelocity } from "@workspace/ui/components/scroll-based-velocity";
import { ChevronDown } from "lucide-react";

export function ScrollBasedVelocityDemo() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
            {/* Tall scrollable content */}
            <div className="min-h-[300vh] flex flex-col items-center">
                {/* Top hint */}
                <div className="flex flex-col items-center gap-3 pt-16 pb-8 animate-pulse">
                    <span className="text-sm font-medium text-muted-foreground/70">
                        Scroll to see the effect
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
                </div>

                {/* Spacer */}
                <div className="h-[20vh]" />

                {/* Sticky velocity text */}
                <div className="sticky top-1/3 w-full py-8">
                    <ScrollBasedVelocity
                        text="Velocity Scroll"
                        default_velocity={5}
                        containerRef={containerRef}
                        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
                    />
                </div>

                {/* Bottom spacer for scrolling room */}
                <div className="flex-1" />
            </div>
        </div>
    );
}
