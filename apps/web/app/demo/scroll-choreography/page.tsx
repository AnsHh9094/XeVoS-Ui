"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollChoreography } from "@workspace/ui/components/scroll-choreography";

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
        <div className="w-full bg-background min-h-screen">
            <style>{`
                html, body {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                ::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <ScrollChoreography />
        </div>
    );
}
