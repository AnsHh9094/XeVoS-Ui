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
  CornerDownLeft
} from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { motion, AnimatePresence } from "framer-motion"
import { docsConfig } from "@/config/docs"

// Pre-compute nav groups at module level
const navGroups = docsConfig.nav

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
  }
]

const socialPages = [
  {
    title: "GitHub",
    href: "https://github.com/harshjdhv/componentry",
    icon: (props: any) => <FontAwesomeIcon icon={faGithub} {...props} />
  },
  {
    title: "X",
    href: "https://x.com/harshjdhv",
    icon: (props: any) => <FontAwesomeIcon icon={faXTwitter} {...props} />
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
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60"
    >
      {items.map((page) => (
        <React.Fragment key={page.href}>
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
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60"
    >
      {items.map((page) => (
        <React.Fragment key={page.href}>
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
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60"
    >
      <SearchItem
        title="Light"
        icon={<Sun className="h-4 w-4" />}
        onSelect={() => {
          setTheme("light")
          setOpen(false)
        }}
      />
      <SearchItem
        title="Dark"
        icon={<Moon className="h-4 w-4" />}
        onSelect={() => {
          setTheme("dark")
          setOpen(false)
        }}
      />
      <SearchItem
        title="System"
        icon={<Laptop className="h-4 w-4" />}
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
      className="group/item relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-[13px] outline-none data-[selected=true]:bg-black/5 dark:data-[selected=true]:bg-white/10 data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-muted-foreground/70 group-data-[selected=true]/item:text-primary">
        {icon}
      </div>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="font-medium truncate">{title}</span>
        {subtitle && <span className="text-xs text-muted-foreground/60 truncate">{subtitle}</span>}
      </div>
      {rightContent}
      {!rightContent && (
        <ArrowRight
          className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-200 ease-out group-data-[selected=true]/item:opacity-100 group-data-[selected=true]/item:translate-x-0"
        />
      )}
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
  const isGettingStarted = title === "Getting Started"

  return (
    <Command.Group
      heading={title}
      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60"
    >
      {items.map((navItem) => (
        <React.Fragment key={navItem.href}>
          <SearchItem
            title={navItem.title}
            icon={isGettingStarted ? <FileText className="h-4 w-4" /> : <CircleDashed className="h-4 w-4" />}
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
          onClick={() => setOpen(true)}
          className="group inline-flex items-center justify-center md:justify-start gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border-0 md:border md:border-input/50 md:hover:border-input hover:bg-accent/50 md:px-3 md:py-2 relative h-9 w-9 md:w-40 lg:w-56 rounded-md md:rounded-lg bg-transparent md:bg-muted/30 text-sm font-normal text-muted-foreground"
        >
          <Search className="h-[1.2rem] w-[1.2rem] md:h-4 md:w-4 opacity-70 group-hover:opacity-100 md:opacity-50 md:group-hover:opacity-70 transition-opacity" />
          <span className="hidden lg:inline-flex">Search...</span>
          <span className="hidden md:inline-flex lg:hidden">Search</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-0.5 rounded-md border bg-background/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground/70 sm:flex">
            <span className="text-xs">⌘</span>K
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
                className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[680px] -translate-x-1/2 -translate-y-1/2 p-4"
              >
                <Command
                  label="Spotlight Search"
                  className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#F5F4F3] dark:bg-[#121212] shadow-2xl shadow-black/20 dark:shadow-black/40"
                  shouldFilter={true}
                >
                  <div className="p-2">
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-3 py-3">
                      <Search className="h-4 w-4 text-muted-foreground/50" />
                      <Command.Input
                        ref={inputRef}
                        value={query}
                        onValueChange={setQuery}
                        placeholder="Search Anything"
                        className="flex-1 bg-transparent text-sm font-normal outline-none placeholder:text-muted-foreground/60"
                        autoFocus
                      />
                      {query && (
                        <button
                          onClick={handleClearQuery}
                          className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <Command.List className="max-h-[400px] overflow-y-auto overscroll-contain p-2">
                    <Command.Empty className="flex flex-col items-center justify-center py-14 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                        <Search className="h-5 w-5 text-muted-foreground/50" />
                      </div>
                      <p className="text-sm text-muted-foreground">No results found</p>
                      <p className="text-xs text-muted-foreground/60">Try searching for something else</p>
                    </Command.Empty>

                    <PagesGroup items={mainPages} onSelect={handleSelect} />

                    <SocialsGroup items={socialPages} onSelect={handleSelect} />

                    {navGroups.map((group) => (
                      <SearchGroup
                        key={group.title}
                        title={group.title}
                        items={group.items}
                        onSelect={handleSelect}
                      />
                    ))}

                    <SettingsGroup setTheme={setTheme} setOpen={setOpen} />

                    <Command.Group
                      heading="Resources"
                      className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/60"
                    >
                      <SearchItem
                        title="llms.txt"
                        subtitle="AI Context"
                        icon={<FileText className="h-4 w-4" />}
                        onSelect={handleOpenLlms}
                      />
                    </Command.Group>
                  </Command.List>

                  <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-2.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <kbd className="flex h-5 w-5 items-center justify-center rounded border bg-background font-mono text-[10px] text-muted-foreground shadow-sm">
                        <CornerDownLeft className="h-3 w-3" />
                      </kbd>
                      <span>Go To Page</span>
                    </div>
                    <span className="text-xs text-muted-foreground/40">Componentry</span>
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
