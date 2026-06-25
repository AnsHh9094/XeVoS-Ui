"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { components, isNewComponent } from "@/registry"

type PreviewSources = {
    mp4: string
    webm: string
}

let preferredPreviewFormat: "webm" | "mp4" | null = null

function getPreferredPreviewSrc(sources: PreviewSources) {
    if (typeof window === "undefined") return sources.mp4
    if (!preferredPreviewFormat) {
        const probe = document.createElement("video")
        const supportsWebm = Boolean(probe.canPlayType('video/webm; codecs="vp9,opus"'))
        preferredPreviewFormat = supportsWebm ? "webm" : "mp4"
    }
    return preferredPreviewFormat === "webm" ? sources.webm : sources.mp4
}

function getPreviewSources(previewVideo?: string) {
    if (!previewVideo) return null
    const match = previewVideo.match(/^(.*)\.(mov|mp4|webm)(\?.*)?$/i)
    if (!match) return null
    const [, base, , query = ""] = match
    return {
        mp4: `${base}.mp4${query}`,
        webm: `${base}.webm${query}`,
    }
}

export function FloatingDocsSidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const [isHoverVideoReady, setIsHoverVideoReady] = React.useState(false)
    const [hoverPreview, setHoverPreview] = React.useState<{
        title: string
        videoSrc: string
        mp4: string
        webm: string
    } | null>(null)
    const [hoverPosition, setHoverPosition] = React.useState<{ x: number; y: number } | null>(null)
    const warmedPreviewKeys = React.useRef(new Set<string>())
    const warmingVideos = React.useRef(new Map<string, HTMLVideoElement>())

    const warmPreviewAssets = React.useCallback((sources: PreviewSources) => {
        if (typeof window === "undefined") return
        const selectedSrc = getPreferredPreviewSrc(sources)
        if (warmedPreviewKeys.current.has(selectedSrc)) return

        warmedPreviewKeys.current.add(selectedSrc)

        const video = document.createElement("video")
        video.preload = "auto"
        video.muted = true
        video.playsInline = true
        video.src = selectedSrc
        video.load()
        warmingVideos.current.set(selectedSrc, video)
    }, [])

    const getPreviewPosition = React.useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            const cardWidth = 224
            const cardHeight = 170
            const offset = 18
            const maxX = Math.max(16, window.innerWidth - cardWidth - 16)
            const maxY = Math.max(16, window.innerHeight - cardHeight - 16)
            const x = Math.max(16, Math.min(event.clientX + offset, maxX))
            const y = Math.max(16, Math.min(event.clientY + offset, maxY))
            return { x, y }
        },
        []
    )

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
                setHoverPosition(null)
                return
            }
            warmPreviewAssets(sources)
            setHoverPosition(getPreviewPosition(event))

            setHoverPreview({
                title: item.title,
                videoSrc: getPreferredPreviewSrc(sources),
                mp4: sources.mp4,
                webm: sources.webm,
            })
        },
        [getPreviewPosition, warmPreviewAssets]
    )

    const updateHoverPosition = React.useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            setHoverPosition(getPreviewPosition(event))
        },
        [getPreviewPosition]
    )

    // Close when path changes
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    React.useEffect(() => {
        if (!isOpen) {
            setHoverPreview(null)
            setHoverPosition(null)
            setIsHoverVideoReady(false)
        }
    }, [isOpen])

    React.useEffect(() => {
        if (!hoverPreview) {
            setIsHoverVideoReady(false)
            return
        }
        setIsHoverVideoReady(false)
    }, [hoverPreview?.videoSrc])

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
            {/* Trigger Button */}
            <div
                className=""
                onMouseEnter={() => setIsOpen(true)}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "group flex h-9 w-9 items-center justify-center rounded-md bg-background/60 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background/80 hover:text-foreground",
                        isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
                    )}
                    aria-label="Open Navigation"
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="1" y="2" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                        <rect x="1" y="2" width="5.5" height="14" rx="2.5" fill="currentColor" />
                    </svg>
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
                        className="fixed top-4 bottom-4 left-6 z-50 w-72 flex flex-col"
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

                                                const slug = item.href.split('/').pop()
                                                const comp = slug ? components[slug] : undefined
                                                const isNew = comp ? isNewComponent(comp) : false

                                                return (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onMouseEnter={(e) => updateHoverPreview(item, e)}
                                                        onMouseMove={updateHoverPosition}
                                                        onMouseLeave={() => {
                                                            setHoverPreview(null)
                                                            setHoverPosition(null)
                                                        }}
                                                        onClick={() => {
                                                            setHoverPreview(null)
                                                            setHoverPosition(null)
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
                            {hoverPreview && hoverPosition && (
                                <motion.div
                                    key={hoverPreview.videoSrc}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.08, ease: "easeOut" }}
                                    className="fixed z-[70] w-56 pointer-events-none"
                                    style={{
                                        left: hoverPosition.x,
                                        top: hoverPosition.y,
                                    }}
                                >
                                    <div className="overflow-hidden rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-2xl">
                                        <div className="relative h-32 w-full bg-zinc-100 dark:bg-zinc-800/60">
                                            <video
                                                key={hoverPreview.videoSrc}
                                                src={hoverPreview.videoSrc}
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
                                            />
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
