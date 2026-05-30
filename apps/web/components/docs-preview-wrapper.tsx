"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { cn } from "@/lib/utils"
import { RotateCcw, Search, SlidersHorizontal, Check, Maximize, Minimize, CodeXml, ChevronLeft, Copy } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence, useDragControls, type PanInfo } from "framer-motion"
import { useDocStore } from "@/hooks/use-doc-store"

const CommandMenu = React.lazy(() =>
  import("@/components/command-menu").then((mod) => ({ default: mod.CommandMenu }))
)

export interface VariantItem {
  title: string
  preview: React.ReactNode
  code?: string
  fullWidth?: boolean
}

interface DocsPreviewWrapperProps {
  children: React.ReactNode
  fullWidthPreview?: boolean
  personalizeContent?: React.ReactNode
  sourceCodeFilename?: string
  sourceCodeKey?: string
  variants?: VariantItem[]
  hideDefaultVariant?: boolean
}

function PreviewToolbarCell({
  children,
  active,
  className,
}: {
  children: React.ReactNode
  active?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-2xl bg-zinc-200/65 text-foreground/65 dark:bg-zinc-800/75",
        active && "bg-foreground text-background dark:bg-zinc-100 dark:text-zinc-900",
        className
      )}
    >
      {children}
    </div>
  )
}

const previewToolbarIconClass =
  "flex size-full items-center justify-center rounded-2xl text-current transition-all ease-in-out active:scale-95"

const PREVIEW_EXPAND_MS = 420
const PREVIEW_EXPAND_EASING = "cubic-bezier(0.22, 1, 0.36, 1)"

type PreviewRect = { top: number; left: number; width: number; height: number }

function toPreviewRect(rect: DOMRect | PreviewRect): PreviewRect {
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
}

export function DocsPreviewWrapper({
  children,
  fullWidthPreview,
  personalizeContent,
  sourceCodeFilename,
  sourceCodeKey,
  variants = [],
  hideDefaultVariant = false,
}: DocsPreviewWrapperProps) {
  const [key, setKey] = React.useState(0)
  const [showPersonalize, setShowPersonalize] = React.useState(false)
  const [showSource, setShowSource] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [sourceHtml, setSourceHtml] = React.useState<string | null>(null)
  const [sourceCode, setSourceCode] = React.useState("")
  const [isSourceLoading, setIsSourceLoading] = React.useState(false)
  const [sourceLoadError, setSourceLoadError] = React.useState<string | null>(null)
  const [activeVariant, setActiveVariant] = React.useState(
    hideDefaultVariant && variants.length > 0 ? 0 : -1
  ) // -1 = default preview
  const sourceDragControls = useDragControls()

  const resolvedActiveVariant = hideDefaultVariant && activeVariant === -1 ? 0 : activeVariant

  const { setActiveVariantIndex } = useDocStore()

  // Sync state with store
  React.useEffect(() => {
    setActiveVariantIndex(resolvedActiveVariant)
  }, [resolvedActiveVariant, setActiveVariantIndex])

  const previewRef = React.useRef<HTMLDivElement>(null)
  const variantBarRef = React.useRef<HTMLDivElement>(null)
  const splitPreviewRectRef = React.useRef<PreviewRect | null>(null)
  const hasSourceCode = Boolean(sourceCodeKey)

  const cacheSplitPreviewRect = React.useCallback(() => {
    const layout = previewRef.current?.closest("[data-docs-layout]")
    const previewShell = layout?.querySelector<HTMLElement>("[data-docs-preview-shell]")
    if (!previewShell || previewShell.style.position === "fixed") return
    splitPreviewRectRef.current = toPreviewRect(previewShell.getBoundingClientRect())
  }, [])

  const handleSourceOpen = React.useCallback(async () => {
    setShowPersonalize(false)
    if (isExpanded) {
      setIsExpanded(false)
    }
    setShowSource(true)

    if (!sourceCodeKey || sourceHtml || isSourceLoading) {
      return
    }

    try {
      setIsSourceLoading(true)
      setSourceLoadError(null)
      const response = await fetch("/api/docs/source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ component: sourceCodeKey }),
      })

      if (!response.ok) {
        throw new Error("Failed to load source code")
      }

      const data = (await response.json()) as { code?: string; html?: string }
      setSourceCode(data.code || "")
      setSourceHtml(data.html || "")
    } catch {
      setSourceLoadError("Unable to load source code right now.")
    } finally {
      setIsSourceLoading(false)
    }
  }, [isExpanded, isSourceLoading, sourceCodeKey, sourceHtml])

  const handleToggleExpanded = React.useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev
      if (next) {
        setShowSource(false)
        setShowPersonalize(false)
      }
      return next
    })
  }, [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    cacheSplitPreviewRect()
    if (!isExpanded) return
    const onResize = () => cacheSplitPreviewRect()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [isExpanded, cacheSplitPreviewRect, showSource, showPersonalize])

  React.useEffect(() => {
    const layout = previewRef.current?.closest("[data-docs-layout]")
    const previewShell = layout?.querySelector<HTMLElement>("[data-docs-preview-shell]")
    if (!previewShell) return

    const isMobile = window.matchMedia("(max-width: 1023px)").matches
    const fullPadding = isMobile ? "0px" : "12px"
    const splitPadding = isMobile ? "16px" : "12px 12px 12px 6px"
    const transition = `top ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, left ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, width ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, height ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}, padding ${PREVIEW_EXPAND_MS}ms ${PREVIEW_EXPAND_EASING}`

    const applyFixedRect = (rect: PreviewRect, padding: string) => {
      previewShell.style.position = "fixed"
      previewShell.style.top = `${rect.top}px`
      previewShell.style.left = `${rect.left}px`
      previewShell.style.width = `${rect.width}px`
      previewShell.style.height = `${rect.height}px`
      previewShell.style.zIndex = "60"
      previewShell.style.padding = padding
      previewShell.classList.add("bg-[#f3f4f6]", "dark:bg-[#080808]")
    }

    const clearFixedStyles = () => {
      delete previewShell.dataset.previewExpanded
      for (const prop of ["position", "top", "left", "width", "height", "zIndex", "padding", "transition"] as const) {
        previewShell.style.removeProperty(prop)
      }
      previewShell.classList.remove("bg-[#f3f4f6]", "dark:bg-[#080808]")
      cacheSplitPreviewRect()
    }

    let onTransitionEnd: ((event: TransitionEvent) => void) | undefined

    if (isExpanded) {
      const from = toPreviewRect(previewShell.getBoundingClientRect())
      splitPreviewRectRef.current = from

      applyFixedRect(from, splitPadding)
      void previewShell.offsetHeight

      previewShell.style.transition = transition
      requestAnimationFrame(() => {
        applyFixedRect(
          { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight },
          fullPadding
        )
        previewShell.dataset.previewExpanded = "true"
      })
    } else if (previewShell.style.position === "fixed") {
      const rightColumn = layout?.querySelector<HTMLElement>("[data-docs-right-column]")
      const col = rightColumn?.getBoundingClientRect()
      const targetFromLayout: PreviewRect | null = col
        ? isMobile
          ? { top: col.top, left: col.left, width: col.width, height: Math.min(col.height, window.innerHeight * 0.55) }
          : { top: col.top + 12, left: col.left + 6, width: col.width - 18, height: col.height - 24 }
        : null
      const target = targetFromLayout ?? splitPreviewRectRef.current
      if (!target) {
        clearFixedStyles()
        return
      }

      previewShell.style.transition = transition
      requestAnimationFrame(() => {
        applyFixedRect(target, splitPadding)
      })

      onTransitionEnd = (event: TransitionEvent) => {
        if (event.target !== previewShell || event.propertyName !== "width") return
        clearFixedStyles()
      }
      previewShell.addEventListener("transitionend", onTransitionEnd)
    } else {
      clearFixedStyles()
    }

    return () => {
      if (onTransitionEnd) {
        previewShell.removeEventListener("transitionend", onTransitionEnd)
      }
    }
  }, [isExpanded, cacheSplitPreviewRect])

  return (
    <div className={cn(
      "relative w-full h-full rounded-xl lg:rounded-2xl border border-border/50 overflow-hidden bg-white dark:bg-[#121212] flex flex-col"
    )} ref={previewRef}>
      {/* Toolbar — glass dock, fixed top-right */}
      <section
        aria-label="Preview controls"
        className="fixed right-6 top-6 z-[99] flex select-none items-center gap-1 rounded-2xl border border-border/40 bg-white/70 p-1.5 shadow-card backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#121212]/75"
      >
        <PreviewToolbarCell>
          <React.Suspense
            fallback={
              <button type="button" className={previewToolbarIconClass} aria-label="Search">
                <Search className="size-4 opacity-60" />
              </button>
            }
          >
            <CommandMenu
              trigger={
                <button type="button" className={previewToolbarIconClass} aria-label="Search">
                  <Search className="size-4" />
                </button>
              }
            />
          </React.Suspense>
        </PreviewToolbarCell>

        {hasSourceCode && (
          <PreviewToolbarCell active={showSource}>
            <button
              type="button"
              onClick={handleSourceOpen}
              className={previewToolbarIconClass}
              aria-label="View Source"
            >
              <CodeXml className="size-4" />
            </button>
          </PreviewToolbarCell>
        )}

        {personalizeContent && (
          <PreviewToolbarCell active={showPersonalize}>
            <button
              type="button"
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false)
                }
                setShowPersonalize(true)
                setShowSource(false)
              }}
              className={previewToolbarIconClass}
              aria-label="Personalize"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </PreviewToolbarCell>
        )}

        <PreviewToolbarCell>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className={previewToolbarIconClass}
            aria-label="Reload preview"
          >
            <RotateCcw className="size-4" />
          </button>
        </PreviewToolbarCell>

        <PreviewToolbarCell active={isExpanded}>
          <button
            type="button"
            onClick={handleToggleExpanded}
            className={previewToolbarIconClass}
            aria-label={isExpanded ? "Collapse preview pane" : "Expand preview pane"}
          >
            {isExpanded ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </button>
        </PreviewToolbarCell>

        <PreviewToolbarCell>
          <ThemeToggle
            className={cn(
              previewToolbarIconClass,
              "!size-full !rounded-2xl !border-0 !bg-transparent shadow-none hover:!bg-transparent"
            )}
          />
        </PreviewToolbarCell>
      </section>

      {/* Content Area */}
      <div className={cn(
        "w-full overflow-auto flex bg-white dark:bg-[#121212] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        "h-full",
        !fullWidthPreview && "items-center justify-center"
      )}>
        <div
          className={cn(
            "w-full",
            (resolvedActiveVariant >= 0 && variants[resolvedActiveVariant]?.fullWidth) || fullWidthPreview
              ? "h-full"
              : "p-10 flex items-center justify-center"
          )}
        >
          <div key={key} className="w-full h-full flex items-center justify-center">
            {resolvedActiveVariant === -1 ? children : variants[resolvedActiveVariant]?.preview}
          </div>
        </div>
      </div>

      {/* Bottom Variant Bar */}
      {variants.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 h-14 flex items-center">
          <div
            ref={variantBarRef}
            className="flex items-center gap-1.5 px-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {!hideDefaultVariant && (
              <button
                onClick={() => setActiveVariant(-1)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  resolvedActiveVariant === -1
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-100 backdrop-blur-sm shadow-sm"
                )}
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  resolvedActiveVariant === -1 ? "bg-background" : "bg-zinc-400 dark:bg-zinc-500"
                )} />
                Default
              </button>
            )}

            {/* Variant pills */}
            {variants.map((variant, i) => (
              <button
                key={i}
                onClick={() => setActiveVariant(i)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                  resolvedActiveVariant === i
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-100 backdrop-blur-sm shadow-sm"
                )}
              >
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  resolvedActiveVariant === i ? "bg-background" : "bg-zinc-400 dark:bg-zinc-500"
                )} />
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Personalize Drawer Portal */}
      {mounted && ReactDOM.createPortal(
        <AnimatePresence>
          {showPersonalize && personalizeContent && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_: unknown, info: PanInfo) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setShowPersonalize(false)
                }
              }}
              className="fixed bottom-0 left-0 z-50 flex flex-col outline-none h-[80vh] w-full rounded-t-lg border-t border-border/20 bg-transparent shadow-none pointer-events-none lg:top-0 lg:bottom-0 lg:h-screen lg:max-h-screen lg:w-1/2 lg:rounded-none lg:border-none lg:pt-3 lg:pb-3 lg:pl-3 lg:pr-1.5"
            >
              <div className="relative h-full bg-[#f3f4f6] dark:bg-[#121212] lg:rounded-2xl overflow-hidden border border-border/20 shadow-2xl pointer-events-auto">
                <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                  <div className="absolute inset-0 h-32 bg-gradient-to-b from-[#f3f4f6] to-transparent dark:from-[#121212] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
                  <div className="relative z-10 flex flex-col pointer-events-auto">
                    <div className="flex items-center justify-center pt-2 pb-1">
                      <div className="w-10 h-1 rounded-full bg-zinc-900/[0.08] dark:bg-white/[0.08] transition-colors hover:bg-zinc-900/[0.15] dark:hover:bg-white/[0.15]" />
                    </div>

                    <div className="flex items-center justify-between px-4 py-1">
                      <button
                        onClick={() => setShowPersonalize(false)}
                        className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wide">Personalize</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative h-full min-h-0">
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-[#f3f4f6] to-transparent dark:from-[#121212] pointer-events-none [mask-image:linear-gradient(to_top,black_30%,transparent)]" />
                  <div className="h-full">{personalizeContent}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Source Code Panel Portal */}
      {mounted && ReactDOM.createPortal(
        <AnimatePresence>
          {showSource && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              drag="y"
              dragControls={sourceDragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_: unknown, info: PanInfo) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setShowSource(false)
                }
              }}
              className="fixed bottom-0 left-0 z-50 flex flex-col outline-none h-[80vh] w-full rounded-t-lg border-t border-border/20 bg-transparent shadow-none pointer-events-none lg:top-0 lg:bottom-0 lg:h-screen lg:max-h-screen lg:w-1/2 lg:rounded-none lg:border-none lg:pt-3 lg:pb-3 lg:pl-3 lg:pr-1.5"
            >
              <div className="relative h-full bg-[#f3f4f6] dark:bg-[#121212] lg:rounded-2xl overflow-hidden border border-border/20 shadow-2xl pointer-events-auto">
                {/* Header Overlay */}
                <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                  <div className="absolute inset-0 h-32 bg-gradient-to-b from-[#f3f4f6] to-transparent dark:from-[#121212] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
                  <div className="relative z-10 flex flex-col pointer-events-auto">
                    {/* Drag handle - top edge-to-edge */}
                    <div
                      className="flex items-center justify-center pt-2 pb-1 touch-none"
                      onPointerDown={(event) => sourceDragControls.start(event)}
                    >
                      <div className="w-10 h-1 rounded-full bg-zinc-900/[0.08] dark:bg-white/[0.08] transition-colors hover:bg-zinc-900/[0.15] dark:hover:bg-white/[0.15]" />
                    </div>

                    {/* Header row */}
                    <div className="flex items-center justify-between px-4 py-1">
                      <button
                        onClick={() => setShowSource(false)}
                        className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-xs font-mono tracking-wide">Source Code</span>
                      </button>

                      <div className="flex items-center gap-3">
                        {sourceCodeFilename && (
                          <div className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span className="text-xs font-mono text-zinc-500">{sourceCodeFilename}</span>
                          </div>
                        )}
                        {sourceCode && (
                          <button
                            onClick={async () => {
                              await navigator.clipboard.writeText(sourceCode)
                              setCopied(true)
                              setTimeout(() => setCopied(false), 2000)
                            }}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-md text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            aria-label={copied ? "Copied" : "Copy code"}
                          >
                            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code content - full height, hidden scrollbar */}
                <div className="relative h-full min-h-0">
                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-[#f3f4f6] to-transparent dark:from-[#121212] pointer-events-none [mask-image:linear-gradient(to_top,black_30%,transparent)]" />
                  <div data-drawer-code className="h-full overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&_pre]:min-h-full [&_pre]:!pt-24 [&_pre]:!px-4 [&_.relative.group_>_button]:hidden">
                    <div className="h-full w-full">
                      {isSourceLoading && (
                        <div className="flex h-full items-center justify-center px-4 pt-24 pb-8">
                          <span className="text-sm text-muted-foreground/60 font-mono tracking-wide">
                            Loading source code...
                          </span>
                        </div>
                      )}
                      {!isSourceLoading && sourceLoadError && (
                        <div className="px-4 pt-24 text-sm text-muted-foreground">{sourceLoadError}</div>
                      )}
                      {!isSourceLoading && !sourceLoadError && sourceHtml && (
                        <div
                          data-code-block
                          data-line-numbers="false"
                          className="relative text-sm w-full border-none bg-transparent [&_.relative.group_>_button]:hidden [&_.shiki]:border-none [&_.shiki]:rounded-none"
                          dangerouslySetInnerHTML={{ __html: sourceHtml }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
