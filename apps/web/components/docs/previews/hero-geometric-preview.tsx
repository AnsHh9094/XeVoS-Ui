"use client";

import HeroGeometric from "@workspace/ui/components/hero-geometric";
import { cn } from "@/lib/utils";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

interface HeroGeometricPreviewProps {
  title1?: string;
  title2?: string;
  description?: string;
  color1?: string;
  color2?: string;
  speed?: number;
}

function HeroGeometricPreviewWrapper({
  title1 = "Elevate",
  title2 = "Your Brand",
  description,
  color1,
  color2,
  speed,
}: HeroGeometricPreviewProps) {
  return (
    <div className="relative h-full w-full">
      <div
        className={cn(
          "h-full w-full overflow-hidden relative group",
          instrumentSerif.variable,
        )}
      >
        <HeroGeometric
          title1={title1}
          title2={title2}
          description={description}
          color1={color1}
          color2={color2}
          speed={speed}
          className="!min-h-full h-full"
          style={{ minHeight: "100%" }}
        />
      </div>
    </div>
  );
}

export function HeroGeometricDemo() {
  return (
    <HeroGeometricPreviewWrapper
      title1="Elevate"
      title2="Your Brand"
    // description="Scale your SaaS in minutes"
    />
  );
}

export function HeroGeometricWarmDemo() {
  return (
    <HeroGeometricPreviewWrapper
      color1="#EA580C"
      color2="#FFF7ED"
      title1="Warm"
      title2="Palette"
    />
  );
}

export function HeroGeometricSpeedDemo() {
  return (
    <HeroGeometricPreviewWrapper speed={2} title1="High" title2="Velocity" />
  );
}
