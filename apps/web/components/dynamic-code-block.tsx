"use client"

import * as React from "react"
import { CopyButton } from "@/components/copy-button"
import { useDocStore } from "@/hooks/use-doc-store"
import { FileCode2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface DynamicCodeBlockProps {
  originalCode: string;
  defaultHtml: string;
  className?: string;
  variantCodes?: string[];
  variantTitles?: string[];
}

export function DynamicCodeBlock({
  originalCode,
  defaultHtml,
  className,
  variantCodes = [],
  variantTitles = []
}: DynamicCodeBlockProps) {
  const { activeVariantIndex, setActiveVariantIndex } = useDocStore()
  const [variantHtmlMap, setVariantHtmlMap] = React.useState<Record<number, string>>({})
  const [loadingVariant, setLoadingVariant] = React.useState<number | null>(null)

  React.useEffect(() => {
    let cancelled = false

    const loadVariantHtml = async () => {
      if (activeVariantIndex < 0) return
      if (variantHtmlMap[activeVariantIndex]) return

      const variantCode = variantCodes[activeVariantIndex]
      if (!variantCode) return

      setLoadingVariant(activeVariantIndex)
      try {
        const response = await fetch("/api/docs/source", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: variantCode, lang: "tsx" }),
        })

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as { html?: string }
        if (!cancelled && data.html) {
          setVariantHtmlMap((prev) => ({ ...prev, [activeVariantIndex]: data.html as string }))
        }
      } finally {
        if (!cancelled) {
          setLoadingVariant((current) => (current === activeVariantIndex ? null : current))
        }
      }
    }

    loadVariantHtml()
    return () => {
      cancelled = true
    }
  }, [activeVariantIndex, variantCodes, variantHtmlMap])

  // Determine which HTML to show
  const isMissingVariantHtml = activeVariantIndex >= 0 && !variantHtmlMap[activeVariantIndex]
  const htmlToRender = activeVariantIndex === -1
    ? defaultHtml
    : (variantHtmlMap[activeVariantIndex] || "");

  // Determine which raw code to use for copy button
  const rawCodeToUse = activeVariantIndex === -1
    ? originalCode
    : (variantCodes[activeVariantIndex] || originalCode);

  return (
    <div
      data-code-block
      data-line-numbers="false"
      className={`relative text-sm w-full border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 ${className?.includes('h-full') ? 'flex flex-col ' : ''}${className || "rounded-xl"}`}
    >
      {/* Editor Tab Header */}
      <div className="flex w-full items-center border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-x-auto no-scrollbar">
        
        {/* Default Tab (-1) */}
        <button
          onClick={() => setActiveVariantIndex(-1)}
          className={cn(
            "flex items-center gap-2 border-r border-border/40 px-4 py-2.5 text-xs font-medium transition-all min-w-fit outline-none hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
            activeVariantIndex === -1 
              ? "bg-transparent text-zinc-950 dark:text-zinc-50 font-semibold" 
              : "bg-zinc-100/30 dark:bg-zinc-800/10 text-muted-foreground/80 hover:text-foreground"
          )}
        >
           <FileCode2 className={cn("h-3.5 w-3.5", activeVariantIndex === -1 ? "text-zinc-950 dark:text-zinc-50" : "text-muted-foreground/70")} />
           <span>Default</span>
        </button>

        {/* Variant Tabs */}
        {variantTitles.map((title, i) => (
           <button
            key={i}
            onClick={() => setActiveVariantIndex(i)}
            className={cn(
               "flex items-center gap-2 border-r border-border/40 px-4 py-2.5 text-xs font-medium transition-all min-w-fit outline-none hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
               activeVariantIndex === i
                ? "bg-transparent text-zinc-950 dark:text-zinc-50 font-semibold" 
                : "bg-zinc-100/30 dark:bg-zinc-800/10 text-muted-foreground/80 hover:text-foreground"
            )}
           >
             <FileCode2 className={cn("h-3.5 w-3.5", activeVariantIndex === i ? "text-zinc-950 dark:text-zinc-50" : "text-muted-foreground/70")} />
             <span>{title}</span>
           </button>
        ))}

        {/* Empty tab bar space */}
        <div className="flex-1" />
      </div>

      <div className={`relative group ${className?.includes('h-full') ? 'flex-1 min-h-0 flex flex-col' : 'h-full'}`}>
        <CopyButton code={rawCodeToUse.trim()} />
        <div
          className={`[&_pre]:p-4 [&_pre]:overflow-x-auto overflow-auto ${className?.includes('max-h-none') ? (className?.includes('h-full') ? 'flex-1 min-h-0' : 'h-full') : 'max-h-[500px]'}`}
          dangerouslySetInnerHTML={{ __html: htmlToRender }}
        />
        {isMissingVariantHtml && (
          <div className="pointer-events-none absolute inset-0 p-4">
            <div className="h-full w-full animate-pulse rounded-md border border-border bg-muted/20" />
          </div>
        )}
        {loadingVariant !== null && (
          <div className="pointer-events-none absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
        )}
      </div>
    </div>
  );
}
