/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import { cn } from "@/lib/utils"

/** Horizontal inset for column lines, shaded bands, and page content. */
export const landingGutterClass = "px-[max(1rem,calc((100vw-1440px)/2))]"
const landingGuideLeftClass = "left-[max(1rem,calc((100vw-1440px)/2))]"
const landingGuideRightClass = "right-[max(1rem,calc((100vw-1440px)/2))]"

const shaderBandStyle: React.CSSProperties = {
  backgroundImage: `repeating-linear-gradient(
    45deg,
    transparent 0px,
    transparent 8px,
    rgba(113,113,122,0.25) 8px,
    rgba(113,113,122,0.25) 9px
  )`,
}

export function LandingGuideLines() {
  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed inset-y-0 z-[60] hidden w-px bg-line md:block",
          landingGuideLeftClass
        )}
      />
      <div
        className={cn(
          "pointer-events-none fixed inset-y-0 z-[60] hidden w-px bg-line md:block",
          landingGuideRightClass
        )}
      />
      <div
        className={cn(
          "pointer-events-none fixed top-14 z-[61] hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:block dark:bg-[#09090B]",
          landingGuideLeftClass
        )}
      />
      <div
        className={cn(
          "pointer-events-none fixed top-14 z-[61] hidden size-2.5 translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:block dark:bg-[#09090B]",
          landingGuideRightClass
        )}
      />
    </>
  )
}

export function LandingShaderBand({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-16 w-full shrink-0 border-y border-border/30", className)}
      style={shaderBandStyle}
    />
  )
}

export function LandingGutter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn(landingGutterClass, "w-full min-w-0", className)}>{children}</div>
}

export function LandingContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full min-w-0 max-w-[1360px]", className)}>{children}</div>
  )
}
