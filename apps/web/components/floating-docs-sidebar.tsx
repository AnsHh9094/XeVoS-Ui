"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { components } from "@/registry"

type PreviewSources = {
    mp4: string
    webm: string
    webp: string
}

function getPreviewSources(previewVideo?: string) {
    if (!previewVideo) return null
    const match = previewVideo.match(/^(.*)\.(mov|mp4|webm)(\?.*)?$/i)
    if (!match) return null
    const [, base, , query = ""] = match
    return {
        mp4: `${base}.mp4${query}`,
        webm: `${base}.webm${query}`,
        webp: `${base}.webp${query}`,
    }
}

export function FloatingDocsSidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const [isHoverVideoReady, setIsHoverVideoReady] = React.useState(false)
    const [hasHoverPosterError, setHasHoverPosterError] = React.useState(false)
    const [hoverPreview, setHoverPreview] = React.useState<{
        title: string
        mp4: string
        webm: string
        webp: string
        x: number
        y: number
    } | null>(null)
    const warmedPreviewKeys = React.useRef(new Set<string>())
    const warmingVideos = React.useRef(new Map<string, HTMLVideoElement>())

    const warmPreviewAssets = React.useCallback((sources: PreviewSources) => {
        if (typeof window === "undefined") return
        if (warmedPreviewKeys.current.has(sources.mp4)) return

        warmedPreviewKeys.current.add(sources.mp4)

        const posterImage = new Image()
        posterImage.src = sources.webp

        const video = document.createElement("video")
        video.preload = "auto"
        video.muted = true
        video.playsInline = true
        video.src = sources.mp4
        video.load()
        warmingVideos.current.set(sources.mp4, video)
    }, [])

    const updateHoverPreview = React.useCallback(
        (
            item: { title: string; href: string },
            event: React.MouseEvent<HTMLAnchorElement>
        ) => {
            const slug = item.href.split("/").pop()
            if (!slug) {
                setHoverPreview(null)
                return
            }

            const previewVideo = components[slug]?.previewVideo
            const sources = getPreviewSources(previewVideo)
            if (!sources) {
                setHoverPreview(null)
                return
            }
            warmPreviewAssets(sources)

            const cardWidth = 224
            const cardHeight = 170
            const offset = 18
            const maxX = Math.max(16, window.innerWidth - cardWidth - 16)
            const maxY = Math.max(16, window.innerHeight - cardHeight - 16)

            const x = Math.max(16, Math.min(event.clientX + offset, maxX))
            const y = Math.max(16, Math.min(event.clientY + offset, maxY))

            setHoverPreview({
                title: item.title,
                mp4: sources.mp4,
                webm: sources.webm,
                webp: sources.webp,
                x,
                y,
            })
        },
        [warmPreviewAssets]
    )

    // Close when path changes
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    React.useEffect(() => {
        if (!isOpen) {
            setHoverPreview(null)
            setIsHoverVideoReady(false)
        }
    }, [isOpen])

    React.useEffect(() => {
        if (!hoverPreview) {
            setIsHoverVideoReady(false)
            setHasHoverPosterError(false)
            return
        }
        setIsHoverVideoReady(false)
        setHasHoverPosterError(false)
    }, [hoverPreview])

    React.useEffect(() => {
        if (!isOpen) return

        const initialSources: PreviewSources[] = []
        for (const group of docsConfig.nav) {
            for (const item of group.items) {
                const slug = item.href.split("/").pop()
                if (!slug) continue
                const previewVideo = components[slug]?.previewVideo
                const sources = getPreviewSources(previewVideo)
                if (!sources) continue
                initialSources.push(sources)
                if (initialSources.length >= 5) break
            }
            if (initialSources.length >= 5) break
        }

        initialSources.forEach((sources) => warmPreviewAssets(sources))
    }, [isOpen, warmPreviewAssets])

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
                                                        onMouseEnter={(e) => updateHoverPreview(item, e)}
                                                        onMouseMove={(e) => updateHoverPreview(item, e)}
                                                        onMouseLeave={() => setHoverPreview(null)}
                                                        onClick={() => {
                                                            setHoverPreview(null)
                                                            setIsOpen(false)
                                                        }}
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

                        <AnimatePresence>
                            {hoverPreview && (
                                <motion.div
                                    key={hoverPreview.mp4}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.08, ease: "easeOut" }}
                                    className="fixed z-[70] w-56 pointer-events-none"
                                    style={{
                                        left: hoverPreview.x,
                                        top: hoverPreview.y,
                                    }}
                                >
                                    <div className="overflow-hidden rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-2xl">
                                        <div className="relative h-32 w-full bg-zinc-100 dark:bg-zinc-800/60">
                                            <img
                                                src={hoverPreview.webp}
                                                alt={`${hoverPreview.title} preview`}
                                                loading="eager"
                                                onError={() => setHasHoverPosterError(true)}
                                                className="absolute inset-0 h-full w-full object-cover"
                                                style={{ display: hasHoverPosterError ? "none" : undefined }}
                                            />
                                            <video
                                                key={hoverPreview.mp4}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                preload="auto"
                                                onLoadedData={() => setIsHoverVideoReady(true)}
                                                className={cn(
                                                    "relative h-full w-full object-cover transition-opacity duration-150",
                                                    isHoverVideoReady ? "opacity-100" : "opacity-0"
                                                )}
                                            >
                                                <source src={hoverPreview.webm} type="video/webm" />
                                                <source src={hoverPreview.mp4} type="video/mp4" />
                                            </video>
                                        </div>
                                        <div className="px-2.5 py-2">
                                            <p className="truncate text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
                                                {hoverPreview.title}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
