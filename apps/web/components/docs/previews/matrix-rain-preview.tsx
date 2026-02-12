"use client";

import { MatrixRain } from "@workspace/ui/components/matrix-rain";

export function MatrixRainDemo() {
  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <MatrixRain transparent />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-foreground tracking-wider">
          MATRIX
        </h1>
      </div>
    </div>
  );
}

export function MatrixRainRainbowDemo() {
  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <MatrixRain variant="rainbow" transparent />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-foreground tracking-widest">
          RGB
        </h1>
      </div>
    </div>
  );
}

export function MatrixRainCustomDemo() {
  return (
    <div className="relative h-full w-full bg-background overflow-hidden">
      <MatrixRain fixedColor="#ec4899" speed={80} fontSize={20} transparent />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-4xl font-bold text-foreground">CYBERPUNK</h1>
      </div>
    </div>
  );
}
