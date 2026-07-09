"use client"

import * as React from "react"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { DocsCodePanel } from "@/components/docs-code-panel"

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
  const [highlightedHtml, setHighlightedHtml] = React.useState("")
  const [isHighlighting, setIsHighlighting] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false

    const loadHighlight = async () => {
      const cached = highlightCache.get(command)
      if (cached) {
        setHighlightedHtml(cached)
        return
      }

      setIsHighlighting(true)
      try {
        const html = await fetchHighlightedBash(command)
        if (!cancelled) {
          setHighlightedHtml(html)
        }
      } catch {
        if (!cancelled) {
          setHighlightedHtml("")
        }
      } finally {
        if (!cancelled) {
          setIsHighlighting(false)
        }
      }
    }

    loadHighlight()
    return () => {
      cancelled = true
    }
  }, [command])

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
      {highlightedHtml ? (
        <div
          className="[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="overflow-x-auto whitespace-pre p-4 no-scrollbar">
          <code
            className={cn(
              "text-zinc-950 dark:text-zinc-100",
              isHighlighting && "opacity-50"
            )}
          >
            {command}
          </code>
        </pre>
      )}
    </DocsCodePanel>
  )
}
