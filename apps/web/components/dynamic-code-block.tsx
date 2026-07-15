/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
"use client"

import * as React from "react"
import { Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DocsCodePanel } from "@/components/docs-code-panel"
import { useDocStore } from "@/hooks/use-doc-store"
import { useSmoothCodeHeight } from "@/hooks/use-smooth-code-height"

interface DynamicCodeBlockProps {
  originalCode: string
  defaultHtml: string
  className?: string
  variantCodes?: string[]
  variantTitles?: string[]
  hideDefaultTab?: boolean
}

async function fetchHighlightedTsx(code: string): Promise<string> {
  const response = await fetch("/api/docs/source", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, lang: "tsx" }),
  })

  if (!response.ok) {
    throw new Error("Failed to highlight code")
  }

  const data = (await response.json()) as { html?: string }
  return data.html ?? ""
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
  const [visibleHtml, setVisibleHtml] = React.useState(defaultHtml)
  const [isSwitching, setIsSwitching] = React.useState(false)

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

  const targetHtml =
    activeVariantIndex === -1 ? defaultHtml : variantHtmlMap[activeVariantIndex]

  const rawCodeToUse =
    activeVariantIndex === -1
      ? originalCode
      : variantCodes[activeVariantIndex] || originalCode

  const { contentRef, contentHeight, wrapperProps } = useSmoothCodeHeight([
    visibleHtml,
    activeVariantIndex,
  ])
  const hasUnboundedHeight = className?.includes("max-h-none")
  const resolvedWrapperStyle = hasUnboundedHeight
    ? wrapperProps.style
    : {
        ...wrapperProps.style,
        height:
          contentHeight !== undefined
            ? Math.min(contentHeight, 500)
            : wrapperProps.style.height,
      }

  React.useEffect(() => {
    if (hideDefaultTab && activeVariantIndex === -1 && variantTitles.length > 0) {
      setActiveVariantIndex(0)
    }
  }, [hideDefaultTab, activeVariantIndex, variantTitles.length, setActiveVariantIndex])

  React.useEffect(() => {
    let cancelled = false

    const prefetchVariants = async () => {
      const entries = await Promise.all(
        variantCodes.map(async (code, index) => {
          if (!code) return null
          try {
            const html = await fetchHighlightedTsx(code)
            return { index, html }
          } catch {
            return null
          }
        })
      )

      if (cancelled) return

      setVariantHtmlMap((prev) => {
        const next = { ...prev }
        for (const entry of entries) {
          if (entry?.html) {
            next[entry.index] = entry.html
          }
        }
        return next
      })
    }

    prefetchVariants()
    return () => {
      cancelled = true
    }
  }, [variantCodes])

  React.useEffect(() => {
    if (targetHtml) {
      setIsSwitching(true)
      setVisibleHtml(targetHtml)
      const timer = window.setTimeout(() => setIsSwitching(false), 200)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [targetHtml])

  const handleTabChange = (id: string) => {
    if (id === "default") {
      setActiveVariantIndex(-1)
      return
    }
    setActiveVariantIndex(Number(id))
  }

  const isLoadingActiveVariant =
    activeVariantIndex >= 0 && !variantHtmlMap[activeVariantIndex]

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
      <div
        {...wrapperProps}
        style={resolvedWrapperStyle}
        className={cn(wrapperProps.className, className?.includes("h-full") && "h-full")}
      >
        <div
          ref={contentRef}
          className={cn(
            "transition-opacity duration-150",
            (isSwitching || isLoadingActiveVariant) && "opacity-70",
            hasUnboundedHeight
              ? "h-full"
              : "max-h-[500px] overflow-auto"
          )}
        >
          <div
            className="[&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: visibleHtml }}
          />
        </div>
      </div>
    </DocsCodePanel>
  )
}
