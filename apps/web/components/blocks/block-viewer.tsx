"use client"

import * as React from "react"
import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  Monitor,
  RefreshCcw,
  Smartphone,
  Tablet,
  Terminal,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { blockThemes, type BlockThemeName } from "@/lib/blocks/theme"
import type {
  BlockRegistryItem,
  HighlightedBlockFile,
} from "@/lib/blocks/types"
import { cn } from "@/lib/utils"

type View = "preview" | "code"
type Size = "mobile" | "tablet" | "desktop"

const sizeClass: Record<Size, string> = {
  mobile: "max-w-[390px]",
  tablet: "max-w-[768px]",
  desktop: "max-w-full",
}

const sizeIcons = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
}

function copyText(text: string) {
  return navigator.clipboard.writeText(text)
}

function CopyIconButton({
  text,
  label,
  className,
}: {
  text: string
  label: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground",
        className
      )}
      onClick={async () => {
        await copyText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1400)
      }}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  )
}

function CopyCommandButton({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      type="button"
      className="inline-flex h-8 w-fit items-center gap-1.5 rounded-md border border-line bg-background px-2 font-mono text-[0.8125rem] font-normal text-foreground transition hover:bg-muted active:scale-[0.99]"
      onClick={async () => {
        await copyText(command)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1400)
      }}
    >
      {copied ? (
        <Check className="size-4 text-muted-foreground" />
      ) : (
        <Terminal className="size-4 text-muted-foreground" />
      )}
      <span className="hidden sm:inline">
        <span className="text-muted-foreground">npx shadcn add</span>{" "}
        https://componentry.fun/r/{command.match(/\/r\/([^/]+\.json)$/)?.[1] ?? ""}
      </span>
      <span className="sm:hidden">Install</span>
    </button>
  )
}

export function BlockViewer({
  item,
  highlightedFiles,
}: {
  item: BlockRegistryItem
  highlightedFiles: HighlightedBlockFile[]
}) {
  const [view, setView] = React.useState<View>("preview")
  const [size, setSize] = React.useState<Size>("desktop")
  const [theme, setTheme] = React.useState<BlockThemeName>("system")
  const [iframeKey, setIframeKey] = React.useState(0)
  const [activeFile, setActiveFile] = React.useState(
    highlightedFiles[0]?.target ?? ""
  )

  const file =
    highlightedFiles.find((candidate) => candidate.target === activeFile) ??
    highlightedFiles[0]
  const installCommand = `npx shadcn@latest add https://componentry.fun/r/${item.name}.json`
  const previewUrl = `/preview/${item.name}?theme=${theme}`

  return (
    <section
      id={item.name}
      className="screen-line-top screen-line-bottom scroll-mt-20 bg-background"
    >
      <div>
        <Rule />
        <div className="flex w-full flex-wrap items-center gap-2 px-2 py-2">
          <SegmentedControl
            value={view}
            items={[
              { value: "preview", label: "Preview", icon: Monitor },
              { value: "code", label: "Code", icon: Code2 },
            ]}
            onValueChange={(value) => setView(value as View)}
          />

          <div className="mx-1 hidden h-4 w-px bg-line md:block" />

          <a
            href={`#${item.name}`}
            className="line-clamp-1 min-w-0 flex-1 text-sm font-medium text-foreground hover:underline"
          >
            {item.description.replace(/\.$/, "")}
          </a>

          <div className="ml-auto flex min-w-0 flex-wrap items-center gap-2">
            <select
              value={theme}
              aria-label="Preview theme"
              className="h-8 rounded-md border border-line bg-background px-2 text-sm outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              onChange={(event) => setTheme(event.target.value as BlockThemeName)}
            >
              {blockThemes.map((themeItem) => (
                <option key={themeItem.name} value={themeItem.name}>
                  {themeItem.label}
                </option>
              ))}
            </select>

            <div className="flex h-8 items-center rounded-md border border-line bg-background p-0.5">
              {(["mobile", "tablet", "desktop"] as const).map((value) => {
                const Icon = sizeIcons[value]
                return (
                  <button
                    key={value}
                    type="button"
                    aria-label={`${value} preview`}
                    title={`${value} preview`}
                    className={cn(
                      "inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition hover:text-foreground",
                      size === value && "bg-muted text-foreground"
                    )}
                    onClick={() => {
                      setView("preview")
                      setSize(value)
                    }}
                  >
                    <Icon className="size-4" />
                  </button>
                )
              })}
              <div className="mx-0.5 h-4 w-px bg-line" />
              <button
                type="button"
                aria-label="Open preview in new tab"
                title="Open preview in new tab"
                className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="size-4" />
              </button>
              <div className="mx-0.5 h-4 w-px bg-line" />
              <button
                type="button"
                aria-label="Refresh preview"
                title="Refresh preview"
                className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                onClick={() => {
                  setView("preview")
                  setIframeKey((key) => key + 1)
                }}
              >
                <RefreshCcw className="size-4" />
              </button>
            </div>

            <div className="mx-1 hidden h-4 w-px bg-line lg:block" />

            <CopyCommandButton command={installCommand} />
          </div>
        </div>

        <Rule />

        {view === "preview" ? (
          <div className="relative overflow-hidden bg-muted/20 p-2">
            <div
              className={cn(
                "relative mx-auto overflow-hidden rounded-xl border border-line bg-background transition-[max-width] duration-300",
                sizeClass[size]
              )}
            >
              <iframe
                key={iframeKey}
                src={previewUrl}
                title={`${item.title} preview`}
                className="block w-full border-0 bg-background"
                style={{ height: item.meta?.iframeHeight ?? 780 }}
                loading="lazy"
              />
            </div>
          </div>
        ) : (
          <div className="grid overflow-hidden bg-background lg:grid-cols-[280px_1fr]">
            <div className="border-b border-line bg-muted/20 p-2 lg:border-b-0 lg:border-r">
              <div className="mb-2 flex items-center gap-2 px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Terminal className="size-3.5" />
                Files
              </div>
              <div className="space-y-1">
                {highlightedFiles.map((candidate) => (
                  <button
                    key={candidate.target}
                    type="button"
                    className={cn(
                      "block w-full truncate rounded-md px-2 py-2 text-left text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                      file?.target === candidate.target &&
                        "bg-muted text-foreground"
                    )}
                    onClick={() => setActiveFile(candidate.target)}
                  >
                    {candidate.target}
                  </button>
                ))}
              </div>
            </div>

            {file && (
              <div className="min-w-0">
                <div className="flex h-11 items-center justify-between border-b border-line px-4">
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    {file.target}
                  </span>
                  <CopyIconButton
                    text={file.content ?? ""}
                    label="Copy file"
                    className="-mr-2"
                  />
                </div>
                <div
                  className="max-h-[720px] overflow-auto text-sm [&_pre]:min-h-[720px] [&_pre]:p-4"
                  dangerouslySetInnerHTML={{
                    __html: file.highlightedContent,
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function Rule() {
  return (
    <div
      aria-hidden="true"
      className="h-px bg-foreground/15 dark:bg-white/12"
    />
  )
}

function SegmentedControl({
  value,
  items,
  onValueChange,
}: {
  value: string
  items: Array<{ value: string; label: string; icon: LucideIcon }>
  onValueChange: (value: string) => void
}) {
  return (
    <div className="flex h-8 items-center rounded-md border border-line bg-background p-0.5">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.value}
            type="button"
            className={cn(
              "inline-flex h-6 items-center gap-1.5 rounded-sm px-2 text-sm text-muted-foreground transition hover:text-foreground",
              value === item.value && "bg-muted text-foreground"
            )}
            onClick={() => onValueChange(item.value)}
          >
            <Icon className="size-4" />
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
