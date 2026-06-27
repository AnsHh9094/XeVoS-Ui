"use client"

import * as React from "react"
import Link from "next/link"

import { FloatingDocsSidebar } from "@/components/floating-docs-sidebar"
import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteHeader } from "@/components/site-header"
import { motion, AnimatePresence } from "framer-motion"
import { TableOfContents } from "@/components/table-of-contents"

interface DocsClientLayoutProps {
    title: string
    description: string
    leftContent: React.ReactNode
    rightContent: React.ReactNode
    classicContent: React.ReactNode
}

export function DocsClientLayout({
    title,
    description,
    leftContent,
    rightContent,
    classicContent,
}: DocsClientLayoutProps) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div
            className="flex flex-col w-full min-h-screen bg-[#f3f4f6] dark:bg-[#111] text-foreground transition-colors duration-300"
        >
                {/* Top Navbar */}
                <SiteHeader sidebarToggle={<FloatingDocsSidebar />} />

                <div className="flex-1 w-full max-w-[95rem] mx-auto flex pt-14">
                    {/* Fixed Sidebar for desktop */}
                    <DocsSidebar />

                    {/* Main Content Area */}
                    <main className="flex-1 w-full min-w-0 px-6 sm:px-12 lg:px-16 xl:px-24 py-16 space-y-16 lg:space-y-20 pb-40 dark:bg-[#141414]">
                        <header className="space-y-10">
                            <div className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    <motion.h1
                                        layoutId="title"
                                        className="text-4xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 pb-2"
                                    >
                                        {title}
                                    </motion.h1>
                                    <motion.p
                                        layoutId="desc"
                                        className="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl font-normal"
                                    >
                                        {description}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </header>

                        <div className="w-full prose prose-zinc dark:prose-invert max-w-none">
                            {classicContent}
                        </div>
                    </main>

                    {/* Table of Contents */}
                    <TableOfContents />
                </div>
            </div>
        )
}
