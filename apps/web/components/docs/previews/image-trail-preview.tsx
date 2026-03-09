"use client";

import { ImageTrail } from "@workspace/ui/components/image-trail";

const defaultScientificImages = [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800", // Flasks
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800", // Lab
    "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800", // Rocket
    "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800", // Microscope
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800", // DNA/Abstract
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800", // Earth/Space
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", // Circuit/Technology
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800", // Physics/Lasers
];

export function ImageTrailDemo() {
    return (
        <div className="w-full h-full min-h-[500px] flex rounded-lg overflow-hidden relative bg-black">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 pointer-events-none mix-blend-difference">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Scientific Discovery</h2>
                <p className="text-zinc-200 text-sm max-w-[280px] text-center">
                    Move your cursor across the space to reveal the hidden knowledge stream.
                </p>
            </div>
            <ImageTrail
                images={defaultScientificImages}
                imageWidth={250}
                imageHeight={320}
                duration={1.6}
                threshold={50}
            />
        </div>
    );
}
