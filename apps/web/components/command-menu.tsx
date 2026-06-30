"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { useTheme } from "next-themes"
import {
  Search,
  FileText,
  ArrowRight,
  CircleDashed,
  Laptop,
  Moon,
  Sun,
  Cog,
  BookOpen,
  CircleArrowOutUpRight,
  CornerDownLeft
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { docsConfig } from "@/config/docs"

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.388-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.493.998.108-.776.418-1.305.762-1.605-2.666-.304-5.467-1.333-5.467-5.93 0-1.312.469-2.382 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.009-.323 3.301 1.23A11.52 11.52 0 0 1 12 5.8c1.02.005 2.047.139 3.006.404 2.291-1.553 3.298-1.23 3.298-1.23.652 1.653.241 2.874.117 3.176.769.839 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.431.371.824 1.103.824 2.222v3.293c0 .319.192.688.802.576C20.566 21.795 24 17.298 24 12 24 5.372 18.627 0 12 0Z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.585-6.638 7.585H.474l8.6-9.83L0 1.153h7.594l5.243 6.932L18.901 1.153Zm-1.291 19.491h2.039L6.486 3.24H4.298L17.61 20.644Z" />
    </svg>
  )
}

function smartFilter(value: string, search: string): number {
  const v = value.toLowerCase().trim()
  const s = search.toLowerCase().trim()

  if (!s) return 1
  if (v === s) return 4
  if (v.startsWith(s)) return 3

  for (const word of v.split(/\s+/)) {
    if (word.startsWith(s)) return 2.5
  }

  if (v.includes(s)) return 2

  let si = 0
  for (let i = 0; i < v.length && si < s.length; i++) {
    if (v[i] === s[si]) si++
  }

  return si === s.length ? 1 : 0
}

// Pre-compute nav groups at module level
const navGroups = docsConfig.nav
const gettingStartedGroup = navGroups.find(g => g.title === "Getting Started")
const componentGroups = navGroups.filter(g => g.title !== "Getting Started")
const allComponentItems = componentGroups.flatMap(g => g.items).sort((a, b) => a.title.localeCompare(b.title))

const mainPages = [
  {
    title: "Home",
    href: "/",
    icon: ArrowRight
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: ArrowRight
  },
  ...(gettingStartedGroup ? gettingStartedGroup.items.map(item => ({
    title: item.title,
    href: item.href,
    icon: ArrowRight
  })) : [])
]

const socialPages = [
  {
    title: "GitHub",
    href: "https://github.com/harshjdhv/componentry",
    icon: GitHubIcon
  },
  {
    title: "X",
    href: "https://x.com/harshjdhv",
    icon: XIcon
  }
]

const getStartedPages = [
  {
    title: "Terms of Service",
    href: "/docs/terms",
    icon: BookOpen
  },
  {
    title: "Privacy Policy",
    href: "/docs/privacy",
    icon: BookOpen
  },
  {
    title: "Visit Founder",
    href: "https://harshjdhv.com",
    icon: CircleArrowOutUpRight
  }
]

// Memoized Pages group
const PagesGroup = React.memo(function PagesGroup({
  items,
  onSelect
}: {
  items: typeof mainPages
  onSelect: (href: string) => void
}) {
  return (
    <Command.Group
      heading="Pages"
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/50"
    >
      {items.map((page) => (
        <React.Fragment key={page.href}>
          <SearchItem
            title={page.title}
            icon={<page.icon className="h-5 w-5" />}
            onSelect={() => onSelect(page.href)}
          />
        </React.Fragment>
      ))}
    </Command.Group>
  )
})

const GetStartedGroup = React.memo(function GetStartedGroup({
  onSelect
}: {
  onSelect: (href: string) => void
}) {
  return (
    <Command.Group
      heading="Get started"
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/50"
    >
      {getStartedPages.map((page) => (
        <React.Fragment key={page.title}>
          <SearchItem
            title={page.title}
            icon={<page.icon className="h-4 w-4" />}
            onSelect={() => onSelect(page.href)}
          />
        </React.Fragment>
      ))}
    </Command.Group>
  )
})

// Memoized Socials group
const SocialsGroup = React.memo(function SocialsGroup({
  items,
  onSelect
}: {
  items: typeof socialPages
  onSelect: (href: string) => void
}) {
  return (
    <Command.Group
      heading="Socials"
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/50"
    >
      {items.map((page) => (
        <React.Fragment key={page.href}>
          <SearchItem
            title={page.title}
            icon={<page.icon className="h-5 w-5" />}
            onSelect={() => onSelect(page.href)}
          />
        </React.Fragment>
      ))}
    </Command.Group>
  )
})

// Memoized Settings group
const SettingsGroup = React.memo(function SettingsGroup({
  setTheme,
  setOpen
}: {
  setTheme: (theme: string) => void
  setOpen: (open: boolean) => void
}) {
  return (
    <Command.Group
      heading="Settings"
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/50"
    >
      <SearchItem
        title="Use Light Theme"
        icon={<Cog className="h-5 w-5" />}
        onSelect={() => {
          setTheme("light")
          setOpen(false)
        }}
      />
      <SearchItem
        title="Use Dark Theme"
        icon={<Cog className="h-5 w-5" />}
        onSelect={() => {
          setTheme("dark")
          setOpen(false)
        }}
      />
      <SearchItem
        title="Use System Theme"
        icon={<Cog className="h-5 w-5" />}
        onSelect={() => {
          setTheme("system")
          setOpen(false)
        }}
      />
    </Command.Group>
  )
})

const SearchItem = React.memo(function SearchItem({
  title,
  subtitle,
  icon,
  rightContent,
  onSelect
}: {
  title: string
  subtitle?: string
  icon: React.ReactNode
  rightContent?: React.ReactNode
  onSelect: () => void
}) {
  return (
    <Command.Item
      value={`${subtitle ?? ""} ${title}`}
      onSelect={onSelect}
      className="group/item relative flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-sm outline-none transition-[background-color,box-shadow,scale] duration-150 ease-out-strong hover:bg-accent data-[selected=true]:bg-accent data-[selected=true]:shadow-sm data-[selected=true]:text-accent-foreground active:scale-[0.98] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-transparent text-muted-foreground/70 transition-[color,scale] duration-150 ease-out-strong group-hover/item:scale-110 group-hover/item:text-foreground group-data-[selected=true]/item:text-foreground group-data-[selected=true]/item:scale-110">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="font-medium truncate transition-colors duration-150 ease-out-strong group-hover/item:text-foreground group-data-[selected=true]/item:text-foreground">{title}</span>
        {subtitle && <span className="text-xs text-muted-foreground/60 truncate">{subtitle}</span>}
      </div>
      {rightContent}
    </Command.Item>
  )

}, (prev, next) => prev.title === next.title && prev.subtitle === next.subtitle && prev.rightContent === next.rightContent)


// Memoized search group
const SearchGroup = React.memo(function SearchGroup({
  title,
  items,
  onSelect
}: {
  title: string
  items: readonly { title: string; href: string }[]
  onSelect: (href: string) => void
}) {
  return (
    <Command.Group
      heading={title}
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/50"
    >
      {items.map((navItem) => (
        <React.Fragment key={navItem.href}>
          <SearchItem
            title={navItem.title}
            icon={<CircleDashed className="h-5 w-5" />}
            onSelect={() => onSelect(navItem.href)}
          />
        </React.Fragment>
      ))}
    </Command.Group>
  )
}, (prev, next) => prev.title === next.title)

export function CommandMenu({ trigger }: { trigger?: React.ReactNode }) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = React.useState(false)

  // Mount check
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard shortcut handler
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Focus input when opening
  React.useEffect(() => {
    if (open) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    } else {
      setQuery("")
    }
  }, [open])

  // Stable navigation handler
  const handleSelect = React.useCallback((href: string) => {
    setOpen(false)
    if (href.startsWith("http")) {
      window.open(href, "_blank")
    } else {
      router.push(href)
    }
  }, [router])

  // Stable close handler
  const handleClose = React.useCallback(() => setOpen(false), [])

  // Clear query handler
  const handleClearQuery = React.useCallback(() => setQuery(""), [])

  // Open llms.txt handler
  const handleOpenLlms = React.useCallback(() => {
    setOpen(false)
    window.open("/llms.txt", "_blank")
  }, [])

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <button
          data-slot="command-menu-trigger"
          onClick={() => setOpen(true)}
          className="group/button inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-[min(var(--radius-lg),10px)] border-none px-1.5 text-sm font-medium whitespace-nowrap text-foreground/80 outline-none transition-all will-change-[scale] select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] dark:hover:bg-muted/50"
          aria-label="Open search"
        >
          <Search className="size-4" />
          <span className="font-sans text-sm/4 font-medium sm:hidden">Search...</span>
          <kbd data-slot="kbd-group" className="hidden items-center gap-1 sm:flex">
            <kbd className="pointer-events-none inline-flex h-5 w-5 min-w-auto select-none items-center justify-center rounded-sm bg-black/5 px-1 font-sans text-sm/none font-normal tracking-tight text-foreground/70 shadow-[inset_0_0_1px] shadow-black/10 dark:bg-white/10 dark:shadow-white/20">
              ⌘
            </kbd>
            <kbd className="pointer-events-none inline-flex h-5 w-5 min-w-auto select-none items-center justify-center rounded-sm bg-black/5 px-1 font-sans text-sm/none font-normal tracking-tight text-foreground/70 shadow-[inset_0_0_1px] shadow-black/10 dark:bg-white/10 dark:shadow-white/20">
              K
            </kbd>
          </kbd>
        </button>
      )}

      {mounted && ReactDOM.createPortal(
        <AnimatePresence mode="sync">
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[780px] -translate-x-1/2 -translate-y-1/2 p-4"
              >
                <Command
                  label="Spotlight Search"
                  className="relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-white/[0.05] bg-[#F5F4F3] dark:bg-[#121212] [box-shadow:0_8px_32px_-4px_rgba(0,0,0,0.1)] dark:[box-shadow:0_16px_48px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)_inset] tracking-tight"
                  shouldFilter={true}
                  filter={smartFilter}
                >
                  <div className="p-2">
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-200/50 dark:border-white/[0.04] bg-white/50 dark:bg-white/[0.03] px-3 py-2.5 shadow-sm transition-colors">
                      <Search className="h-5 w-5 text-muted-foreground/60" />
                      <Command.Input
                        ref={inputRef}
                        value={query}
                        onValueChange={setQuery}
                        placeholder="Search Anything"
                        className="flex-1 bg-transparent text-[13px] font-normal outline-none placeholder:text-muted-foreground/60"
                        autoFocus
                      />
                      <button
                        onClick={handleClearQuery}
                        className="shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <Command.List className="h-[400px] overflow-y-auto overscroll-contain p-2 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
                    <Command.Empty className="flex items-center justify-center py-14">
                      <span className="text-sm font-medium">No results found</span>
                    </Command.Empty>

                    <PagesGroup items={mainPages} onSelect={handleSelect} />

                    <GetStartedGroup onSelect={handleSelect} />

                    <SocialsGroup items={socialPages} onSelect={handleSelect} />

                    {allComponentItems.length > 0 && (
                      <SearchGroup
                        title="Components"
                        items={allComponentItems}
                        onSelect={handleSelect}
                      />
                    )}

                    <SettingsGroup setTheme={setTheme} setOpen={setOpen} />

                    <Command.Group
                      heading="Resources"
                      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/50"
                    >
                      <SearchItem
                        title="llms.txt"
                        subtitle="AI Context"
                        icon={<FileText className="h-5 w-5" />}
                        onSelect={handleOpenLlms}
                      />
                    </Command.Group>
                  </Command.List>

                  <div className="flex items-center justify-between border-t border-zinc-200/40 dark:border-white/[0.04] bg-zinc-50/60 dark:bg-transparent px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                      <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200/60 dark:border-white/[0.05] bg-background/50 dark:bg-white/5 font-mono text-[10px] text-muted-foreground shadow-sm">
                        <CornerDownLeft className="h-3 w-3" />
                      </kbd>
                      <span className="font-medium text-[11px]">Go To Page</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                      <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200/60 dark:border-white/[0.05] bg-background/50 dark:bg-white/5 font-mono text-[10px] text-muted-foreground shadow-sm">
                        ↑
                      </kbd>
                      <span className="text-muted-foreground/40">/</span>
                      <kbd className="flex h-5 w-5 items-center justify-center rounded border border-zinc-200/60 dark:border-white/[0.05] bg-background/50 dark:bg-white/5 font-mono text-[10px] text-muted-foreground shadow-sm">
                        ↓
                      </kbd>
                    </div>
                  </div>
                </Command>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
