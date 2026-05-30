"use client"

import * as React from "react"
import { Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DocsCodePanel } from "@/components/docs-code-panel"
import { useDocStore } from "@/hooks/use-doc-store"

interface DynamicCodeBlockProps {
  originalCode: string
  defaultHtml: string
  className?: string
  variantCodes?: string[]
  variantTitles?: string[]
  hideDefaultTab?: boolean
}

export function DynamicCodeBlock({
  originalCode,
  defaultHtml,
  className,
  variantCodes = [],
  variantTitles = [],
  hideDefaultTab = false,
}: DynamicCodeBlockProps) {
  const { activeVariantIndex, setActiveVariantIndex } = useDocStore()
  const [variantHtmlMap, setVariantHtmlMap] = React.useState<Record<number, string>>({})
  const [loadingVariant, setLoadingVariant] = React.useState<number | null>(null)

  const tabs = React.useMemo(() => {
    const items: { id: string; label: string }[] = []
    if (!hideDefaultTab) {
      items.push({ id: "default", label: "Default" })
    }
    variantTitles.forEach((title, i) => {
      items.push({ id: String(i), label: title })
    })
    return items
  }, [hideDefaultTab, variantTitles])

  const activeTab = React.useMemo(() => {
    if (activeVariantIndex === -1) return hideDefaultTab ? tabs[0]?.id ?? "default" : "default"
    return String(activeVariantIndex)
  }, [activeVariantIndex, hideDefaultTab, tabs])

  React.useEffect(() => {
    if (hideDefaultTab && activeVariantIndex === -1 && variantTitles.length > 0) {
      setActiveVariantIndex(0)
    }
  }, [hideDefaultTab, activeVariantIndex, variantTitles.length, setActiveVariantIndex])

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

  const isMissingVariantHtml = activeVariantIndex >= 0 && !variantHtmlMap[activeVariantIndex]
  const htmlToRender =
    activeVariantIndex === -1 ? defaultHtml : variantHtmlMap[activeVariantIndex] || ""

  const rawCodeToUse =
    activeVariantIndex === -1
      ? originalCode
      : variantCodes[activeVariantIndex] || originalCode

  const handleTabChange = (id: string) => {
    if (id === "default") {
      setActiveVariantIndex(-1)
      return
    }
    setActiveVariantIndex(Number(id))
  }

  return (
    <DocsCodePanel
      icon={Code2}
      copyCode={rawCodeToUse.trim()}
      tabs={tabs.length > 1 ? tabs : undefined}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      tabListAriaLabel="Example variant"
      className={className}
    >
      <div className={cn(className?.includes("h-full") && "h-full")}>
        <div
          className={cn(
            "[&_pre]:overflow-x-auto [&_pre]:p-4 overflow-auto",
            className?.includes("max-h-none")
              ? className?.includes("h-full")
                ? "h-full"
                : "h-full"
              : "max-h-[500px]"
          )}
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
    </DocsCodePanel>
  )
}
