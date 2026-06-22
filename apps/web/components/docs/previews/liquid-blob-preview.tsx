"use client";

import { LiquidBlob } from "@workspace/ui/components/liquid-blob";

export function LiquidBlobDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white dark:bg-[#121212]">
      <LiquidBlob interactive />
      <div className="relative z-10 flex h-full items-center justify-center pointer-events-none">
        <h3 className="text-2xl font-bold text-foreground">Liquid Blob</h3>
      </div>
    </div>
  );
}

export function LiquidBlobTealDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white dark:bg-[#121212]">
      <LiquidBlob
        color="#10b981"
        secondaryColor="#06b6d4"
        size={350}
        blur={80}
        interactive
      />
      <div className="relative z-10 flex h-full items-center justify-center pointer-events-none">
        <h3 className="text-2xl font-bold text-foreground">Teal Theme</h3>
      </div>
    </div>
  );
}

export function LiquidBlobFastDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white dark:bg-[#121212]">
      <LiquidBlob
        color="#f97316"
        secondaryColor="#ef4444"
        size={250}
        speed={4}
        opacity={0.8}
        interactive
      />
      <div className="relative z-10 flex h-full items-center justify-center pointer-events-none">
        <h3 className="text-2xl font-bold text-foreground">Fast Animation</h3>
      </div>
    </div>
  );
}
