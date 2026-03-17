"use client"

import { useState } from "react"
import { Terminal } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CodeInline, Section } from "@/components/component-layout"
import { CopyButton } from "@/components/copy-button"

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const MCP_INIT_COMMANDS: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest mcp init",
  npm: "npx shadcn@latest mcp init",
  yarn: "yarn dlx shadcn@latest mcp init",
  bun: "bunx --bun shadcn@latest mcp init",
}

function slugifyForMd(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed text-foreground">
      <pre className="overflow-x-auto p-4 pr-12 whitespace-pre">
        <code className="text-zinc-950 dark:text-zinc-100">{code}</code>
      </pre>
      <CopyButton code={code.trim()} />
    </div>
  )
}

function CommandTabs({ selected, onSelect }: { selected: PackageManager; onSelect: (pm: PackageManager) => void }) {
  return (
    <div className="w-full max-w-full">
      <div className="relative rounded-xl border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 font-mono text-sm leading-relaxed text-foreground">
        <div className="flex items-center border-b border-border/40 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-x-auto no-scrollbar">
          {PACKAGE_MANAGERS.map((pm) => (
            <button
              key={pm}
              onClick={() => onSelect(pm)}
              className={[
                "flex items-center gap-2 border-r border-border/40 px-4 py-2.5 text-xs font-medium transition-all min-w-fit outline-none hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                selected === pm
                  ? "bg-transparent text-zinc-950 dark:text-zinc-50 font-semibold"
                  : "bg-zinc-100/30 dark:bg-zinc-800/10 text-muted-foreground/80 hover:text-foreground",
              ].join(" ")}
            >
              <Terminal
                className={[
                  "h-3.5 w-3.5",
                  selected === pm ? "text-zinc-950 dark:text-zinc-50" : "text-muted-foreground/70",
                ].join(" ")}
              />
              <span>{pm}</span>
            </button>
          ))}
          <div className="flex-1" />
        </div>

        <div className="relative flex items-center p-4">
          <div className="flex-1 overflow-x-auto whitespace-nowrap no-scrollbar pr-12">
            <span className="mr-2 text-muted-foreground/40 select-none">$</span>
            <span className="text-zinc-950 dark:text-zinc-100">{MCP_INIT_COMMANDS[selected]}</span>
          </div>

          <div className="absolute right-0 top-0 bottom-0 pl-16 pr-4 flex items-center bg-gradient-to-l from-zinc-100 via-zinc-100/90 to-transparent dark:from-zinc-900 dark:via-zinc-900/90 dark:to-transparent">
            <CopyButton code={MCP_INIT_COMMANDS[selected]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function McpDocsPage() {
  const registryNamespace = process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@componentry"
  const selectedRegistryUrl = "https://componentry.fun/r/{name}.json"

  return (
    <div className="min-h-screen bg-white dark:bg-[#111] text-zinc-900 dark:text-zinc-100 font-sans overflow-x-hidden">
      {/* ── Overlays (match /docs) ── */}
      <div className="fixed top-0 left-0 right-0 z-40 h-24 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-[#111] dark:via-[#111]/80 pointer-events-none backdrop-blur-[1px]" />
      <div className="fixed bottom-0 left-0 right-0 z-40 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#111] dark:via-[#111]/80 pointer-events-none backdrop-blur-[1px]" />

      <SiteHeader />

      <main className="max-w-3xl mx-auto pt-32 pb-32 px-6 sm:px-8 relative z-10">
        {/* ── Hero (match /docs) ── */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 inline-block">
            MCP
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Integrating MCP with Componentry lets you control it via AI.
          </p>
        </div>

        <div className="space-y-16">
          <Section title="Installation" id="installation" className="pt-2">
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Enable MCP in your project environment. (Supports Claude Code, Cursor, etc.)
            </p>
            <McpInitTabs />
          </Section>

          <Section title="Add the registry to your project" id={slugifyForMd("Add the registry to your project")} className="pt-2">
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Add the following to your <CodeInline>components.json</CodeInline> file.
            </p>
            <CodeBlock
              code={JSON.stringify(
                {
                  registries: {
                    [registryNamespace]: selectedRegistryUrl,
                  },
                },
                null,
                2
              )}
            />
          </Section>

          <Section title="Usage" id="usage" className="pt-2">
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
              You can now ask your IDE to use any Componentry component. Here are some examples:
            </p>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li className="font-mono text-[13px] sm:text-sm">"Add a badge component"</li>
              <li className="font-mono text-[13px] sm:text-sm">"Add a blur reveal animation"</li>
              <li className="font-mono text-[13px] sm:text-sm">"Add a vertical marquee of logos"</li>
            </ul>
          </Section>
        </div>
      </main>
    </div>
  )
}

function McpInitTabs() {
  const [selected, setSelected] = useState<PackageManager>("pnpm")
  return <CommandTabs selected={selected} onSelect={setSelected} />
}

