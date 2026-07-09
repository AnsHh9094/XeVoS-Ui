"use client"

import * as React from "react"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { DocsCodePanel } from "@/components/docs-code-panel"
import { useSmoothCodeHeight } from "@/hooks/use-smooth-code-height"

export const PACKAGE_MANAGERS = ["bun", "npm", "pnpm", "yarn"] as const
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export const INSTALL_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
}

const highlightCache = new Map<string, string>()

async function fetchHighlightedBash(code: string): Promise<string> {
  const cached = highlightCache.get(code)
  if (cached) return cached

  const response = await fetch("/api/docs/source", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, lang: "bash" }),
  })

  if (!response.ok) {
    throw new Error("Failed to highlight command")
  }

  const data = (await response.json()) as { html?: string }
  const html = data.html ?? ""
  highlightCache.set(code, html)
  return html
}

interface PackageManagerCommandProps {
  getCommand: (pm: PackageManager) => string
  defaultPm?: PackageManager
}

export function PackageManagerCommand({
  getCommand,
  defaultPm = "pnpm",
}: PackageManagerCommandProps) {
  const [selected, setSelected] = React.useState<PackageManager>(defaultPm)
  const command = getCommand(selected)
  const [htmlMap, setHtmlMap] = React.useState<Partial<Record<PackageManager, string>>>({})
  const [visibleHtml, setVisibleHtml] = React.useState("")
  const [visiblePlain, setVisiblePlain] = React.useState(command)
  const [isSwitching, setIsSwitching] = React.useState(false)

  const targetHtml = htmlMap[selected]
  const displayHtml = targetHtml ?? visibleHtml
  const { contentRef, wrapperProps } = useSmoothCodeHeight([displayHtml, visiblePlain, selected])

  React.useEffect(() => {
    let cancelled = false

    const prefetchAll = async () => {
      const entries = await Promise.all(
        PACKAGE_MANAGERS.map(async (pm) => {
          const cmd = getCommand(pm)
          if (highlightCache.has(cmd)) {
            return { pm, html: highlightCache.get(cmd)! }
          }
          try {
            const html = await fetchHighlightedBash(cmd)
            return { pm, html }
          } catch {
            return null
          }
        })
      )

      if (cancelled) return

      setHtmlMap((prev) => {
        const next = { ...prev }
        for (const entry of entries) {
          if (entry) next[entry.pm] = entry.html
        }
        return next
      })
    }

    prefetchAll()
    return () => {
      cancelled = true
    }
  }, [getCommand])

  React.useEffect(() => {
    setVisiblePlain(command)
    if (targetHtml) {
      setIsSwitching(true)
      setVisibleHtml(targetHtml)
      const timer = window.setTimeout(() => setIsSwitching(false), 200)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [command, targetHtml])

  const tabs = PACKAGE_MANAGERS.map((pm) => ({ id: pm, label: pm }))

  return (
    <DocsCodePanel
      icon={Terminal}
      copyCode={command}
      tabs={tabs}
      activeTab={selected}
      onTabChange={(id) => setSelected(id as PackageManager)}
      tabListAriaLabel="Package manager"
    >
      <div {...wrapperProps}>
        <div
          ref={contentRef}
          className={cn(
            "transition-opacity duration-150",
            (isSwitching || !targetHtml) && "opacity-70"
          )}
        >
          {displayHtml ? (
            <div
              className="[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:whitespace-pre"
              dangerouslySetInnerHTML={{ __html: displayHtml }}
            />
          ) : (
            <pre className="overflow-x-auto whitespace-pre p-4 no-scrollbar">
              <code className="text-zinc-950 dark:text-zinc-100">{visiblePlain}</code>
            </pre>
          )}
        </div>
      </div>
    </DocsCodePanel>
  )
}
