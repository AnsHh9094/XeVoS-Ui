"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ChevronDown } from "lucide-react";
import { ScrollChoreography } from "@workspace/ui/components/scroll-choreography";

const demoImages = {
    topLeft: "https://images.unsplash.com/photo-1741454570867-4a10f31fc5e3?q=100&w=2832&fm=webp&auto=format&fit=crop",
    topRight: "https://images.unsplash.com/photo-1755456068400-fbcdce2f795a?q=100&w=2832&fm=webp&auto=format&fit=crop",
    bottomLeft: "https://images.unsplash.com/photo-1755456068249-13d384440902?q=100&w=2832&fm=webp&auto=format&fit=crop",
    bottomRight: "https://images.unsplash.com/photo-1741454570904-a22d9d6ea511?q=100&w=2832&fm=webp&auto=format&fit=crop",
};

export default function DemoPage() {
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.05, // Lower lerp makes the scroll catch up more slowly/smoothly
            wheelMultiplier: 0.8, // Slightly slows down the wheel scroll speed
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="w-full min-h-screen relative">
            <style>{`
                html, body {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    background: transparent !important;
                }
                ::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-pulse z-50">
                <span className="text-sm font-medium text-muted-foreground/70">
                    Scroll to see the effect
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
            </div>

            <ScrollChoreography images={demoImages} />
        </div>
    );
}
