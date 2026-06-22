"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { components } from "@/registry"

export function FloatingDocsSidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    // Close when path changes
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <>
            {/* Trigger Button - Matches Breadcrumbs Style */}
            <div
                className="hidden xl:block"
                onMouseEnter={() => setIsOpen(true)}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border border-border/40 bg-white/50 dark:bg-zinc-800/50 text-muted-foreground backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-white/80 dark:hover:bg-zinc-700/80 hover:scale-105 active:scale-95 group",
                        isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
                    )}
                    aria-label="Open Navigation"
                >
                    <Menu className="w-3.5 h-3.5 group-hover:text-foreground transition-colors" />
                </button>
            </div>

            {/* Floating Sidebar Container - Full Height "Floating" Style */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: -320, opacity: 0, filter: "blur(10px)" }}
                        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ x: -60, opacity: 0, filter: "blur(5px)" }}
                        transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }}
                        className="fixed top-4 bottom-4 left-4 z-50 w-72 hidden xl:flex flex-col"
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <div className="flex-1 flex flex-col gap-1 overflow-hidden p-2 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#121212] shadow-2xl shadow-black/40">

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-100 dark:border-zinc-800/50 mb-2">
                                <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Documentation</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mask-image-b">
                                {docsConfig.nav.map((group, index) => (
                                    <div key={index} className="mb-6 last:mb-0">
                                        <h4 className="mb-2 px-3 text-[10px] font-semibold text-zinc-900/40 dark:text-zinc-100/30 uppercase tracking-widest">
                                            {group.title}
                                        </h4>
                                        <div className="flex flex-col gap-0.5">
                                            {group.items.map((item) => {
                                                const isActive = pathname === item.href

                                                // Check if new
                                                const slug = item.href.split('/').pop()
                                                const isNew = slug && components[slug]?.isNew

                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className={cn(
                                                            "group flex items-center justify-between rounded-md px-3 py-1 text-[13px] font-medium transition-all duration-200 border border-transparent",
                                                            isActive
                                                                ? "text-zinc-900 dark:text-white font-semibold translate-x-1"
                                                                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 hover:translate-x-1"
                                                        )}
                                                    >
                                                        <span className="truncate">{item.title}</span>
                                                        {isNew && (
                                                            <span className="ml-2 inline-flex items-center rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 dark:text-blue-400">
                                                                NEW
                                                            </span>
                                                        )}
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Fade Gradient (visual polish) */}
                            <div className="absolute bottom-2 left-2 right-2 h-8 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none rounded-b-2xl" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
