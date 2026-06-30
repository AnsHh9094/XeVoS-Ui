import { cn } from "@/lib/utils"

/** Horizontal inset for column lines, shaded bands, and page content (16px → 80px). */
export const landingGutterClass = "px-4 md:px-20"

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
      <div className="pointer-events-none fixed inset-y-0 left-4 z-[60] w-px bg-line md:left-20" />
      <div className="pointer-events-none fixed inset-y-0 right-4 z-[60] w-px bg-line md:right-20" />
      <div className="pointer-events-none fixed left-4 top-14 z-[61] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:left-20 dark:bg-[#09090B]" />
      <div className="pointer-events-none fixed right-4 top-14 z-[61] size-2.5 translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-line bg-white md:right-20 dark:bg-[#09090B]" />
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
    <div className={cn("mx-auto w-full min-w-0 max-w-[1240px]", className)}>{children}</div>
  )
}
