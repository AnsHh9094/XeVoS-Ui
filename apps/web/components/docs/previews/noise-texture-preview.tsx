"use client";

import { NoiseTexture } from "@workspace/ui/components/noise-texture";

export function NoiseTextureDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-violet-500 to-pink-500">
      <NoiseTexture />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold text-white">Noise Texture</h3>
      </div>
    </div>
  );
}

export function NoiseTextureCoarseDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-500">
      <NoiseTexture grain="coarse" opacity={0.2} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold text-white">Coarse Grain</h3>
      </div>
    </div>
  );
}

export function NoiseTextureStaticDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-orange-500 to-red-500">
      <NoiseTexture grain="fine" opacity={0.25} animate={false} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold text-white">Static Noise</h3>
      </div>
    </div>
  );
}
