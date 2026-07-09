"use client"

import * as React from "react"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

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

  return (
    <div
      data-code-block
      data-line-numbers="false"
      className="relative w-full max-w-full overflow-hidden rounded-xl border border-border bg-zinc-100 text-sm dark:bg-zinc-900/50"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Terminal className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />

          <div
            role="tablist"
            aria-label="Package manager"
            className="flex items-center gap-1"
          >
            {PACKAGE_MANAGERS.map((pm) => {
              const isSelected = selected === pm
              return (
                <button
                  key={pm}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelected(pm)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-[13px] font-medium outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                    isSelected
                      ? "bg-zinc-200/80 text-foreground dark:bg-zinc-800/80"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pm}
                </button>
              )
            })}
          </div>
        </div>

        <CopyButton code={command} absolute={false} className="shrink-0 p-1.5" />
      </div>

      <div className="relative group">
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
      </div>
    </div>
  )
}
