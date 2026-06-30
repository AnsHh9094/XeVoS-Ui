import { cn } from "@/lib/utils"

interface DocsScrollEdgeFadeProps {
  position: "top" | "bottom"
  className?: string
}

/** Scroll edge fade — solid page-color gradient only (no backdrop-blur). */
export function DocsScrollEdgeFade({ position, className }: DocsScrollEdgeFadeProps) {
  const isTop = position === "top"

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 z-30",
        isTop ? "top-0 h-12 sm:h-14" : "bottom-0 h-10 sm:h-12",
        isTop
          ? "bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_40%,transparent_100%)] dark:bg-[linear-gradient(to_bottom,#09090B_0%,#09090B_40%,transparent_100%)]"
          : "bg-[linear-gradient(to_top,#ffffff_0%,#ffffff_40%,transparent_100%)] dark:bg-[linear-gradient(to_top,#09090B_0%,#09090B_40%,transparent_100%)]",
        className
      )}
    />
  )
}
