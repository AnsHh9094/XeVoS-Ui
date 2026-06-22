"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Home, LayoutGrid, Search } from "lucide-react"
import { Logomark } from "@/components/logos/logomark"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function FloatingNavbar() {
    const pathname = usePathname()
    const isHome = pathname === "/"
    const isDocs = pathname?.startsWith("/docs")

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit pointer-events-none">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl shadow-lg shadow-zinc-200/20 dark:shadow-black/20 pointer-events-auto">

                {/* Logo */}
                <Link href="/" className="flex items-center justify-center p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                    <Logomark className="w-5 h-5 text-zinc-900 dark:text-white group-hover:scale-110 transition-transform" />
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-1 px-1">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                            isHome
                                ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                        )}
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/docs"
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                            isDocs
                                ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                        )}
                    >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>Components</span>
                    </Link>
                </div>

                <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />

                {/* Search Trigger */}
                <CommandMenu trigger={
                    <button className="flex items-center gap-3 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-40 sm:w-56 text-left rounded-lg mx-1">
                        <Search className="w-3.5 h-3.5 opacity-60" />
                        <span className="flex-1 truncate">Search...</span>
                        <div className="hidden sm:flex items-center gap-0.5 px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-[9px] font-mono text-zinc-400">
                            ⌘K
                        </div>
                    </button>
                } />

                {/* Github */}
                <Link
                    href="https://github.com/harshjdhv/componentry"
                    target="_blank"
                    className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                    <Github className="w-4 h-4" />
                </Link>

                {/* Theme */}
                <div className="pl-1">
                    <ThemeToggle className="w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-all" />
                </div>
            </div>
        </div>
    )
}
