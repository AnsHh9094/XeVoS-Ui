"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Search } from "lucide-react"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { CommandMenu } from "@/components/command-menu"
import { cn } from "@/lib/utils"

export function FloatingNavbar() {
    const pathname = usePathname()
    const isDocs = pathname?.startsWith("/docs")

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[600px] px-4 pointer-events-none">
            <nav className="pointer-events-auto flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/60 bg-white/80 p-2 pl-4 shadow-lg shadow-zinc-200/20 backdrop-blur-md dark:border-zinc-800/60 dark:bg-[#121212]/80 dark:shadow-black/20 transition-all duration-300">

                {/* Logo & Brand */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ComponentryLogomark className="size-6 text-zinc-900 dark:text-white transition-opacity group-hover:opacity-80" />
                        <span className="text-sm font-bold tracking-wide text-zinc-900 dark:text-white">COMPONENTRY</span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 text-[13px] font-medium">
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1 mr-1">
                        <Link
                            href="/pricing"
                            className="hidden px-3 py-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/docs"
                            className={cn(
                                "px-3 py-1.5 transition-colors",
                                isDocs
                                    ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            )}
                        >
                            Docs
                        </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {/* Search / Command */}
                        <CommandMenu trigger={
                            <div className="flex size-9 items-center justify-center rounded-[12px] bg-zinc-100/80 dark:bg-zinc-800/50 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
                                <button type="button" className="flex size-full items-center justify-center">
                                    <Search className="size-4 text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100 transition-colors" />
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        } />

                        {/* GitHub */}
                        <Link
                            href="https://github.com/harshjdhv/componentry"
                            target="_blank"
                            className="flex size-9 items-center justify-center rounded-[12px] bg-zinc-100/80 dark:bg-zinc-800/50 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors group"
                        >
                            <Github className="size-4 text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100 transition-colors" />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
