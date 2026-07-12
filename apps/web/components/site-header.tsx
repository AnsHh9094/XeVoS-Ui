"use client"

import React from "react"
import Link from "next/link"
import { ComponentryLogomark } from "@/components/logos/componentry-logomark"
import { CommandMenu } from "@/components/command-menu"

interface SiteHeaderProps {
    sidebarToggle?: React.ReactNode
    /** Match landing page column gutters (px-4 / md:px-20). */
    landingGutter?: boolean
}

export function SiteHeader({ sidebarToggle, landingGutter }: SiteHeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111]/60 border-b border-border/40">
            <div
                className={`mx-auto flex h-14 w-full max-w-[95rem] items-center ${
                    landingGutter ? "px-4 md:px-20" : "px-4 sm:px-6 lg:px-8"
                }`}
            >
                <div className="flex flex-1 items-center gap-2 sm:gap-4">
                    {sidebarToggle && (
                        <div className="md:hidden">
                            {sidebarToggle}
                        </div>
                    )}
                    <Link href="/" className="flex items-center gap-1.5 group">
                        <ComponentryLogomark className="size-5 text-zinc-900 dark:text-white transition-opacity group-hover:opacity-80" />
                        <span className="text-sm font-bold font-display tracking-tight text-zinc-900 dark:text-white">COMPONENTRY</span>
                    </Link>
                    <nav className="hidden sm:flex items-center gap-4 text-sm font-medium ml-4">
                        <Link href="/docs" className="text-foreground/60 transition-colors hover:text-foreground">
                            Docs
                        </Link>
                        <Link href="/docs/mcp" className="text-foreground/60 transition-colors hover:text-foreground">
                            MCP
                        </Link>
                        <Link
                            href="/sponsors"
                            className="text-foreground/60 transition-colors hover:text-foreground"
                        >
                            Sponsors
                        </Link>
                    </nav>
                </div>
                <div className="ml-auto flex items-center gap-2 sm:gap-4">
                    <CommandMenu />
                </div>
            </div>
        </header>
    )
}
