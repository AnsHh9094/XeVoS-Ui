"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"
import { components, isNewComponent } from "@/registry"
import { useDocsSidebar } from "@/components/docs-sidebar-context"

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

export function FloatingDocsSidebarPanel() {
  const pathname = usePathname()
  const { isOpen, close } = useDocsSidebar()
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

  const getPreviewPosition = React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const cardWidth = 224
    const cardHeight = 170
    const offset = 18
    const maxX = Math.max(16, window.innerWidth - cardWidth - 16)
    const maxY = Math.max(16, window.innerHeight - cardHeight - 16)
    const x = Math.max(16, Math.min(event.clientX + offset, maxX))
    const y = Math.max(16, Math.min(event.clientY + offset, maxY))
    return { x, y }
  }, [])

  const updateHoverPreview = React.useCallback(
    (item: { title: string; href: string }, event: React.MouseEvent<HTMLAnchorElement>) => {
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

  React.useEffect(() => {
    close()
  }, [pathname, close])

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320, opacity: 0, filter: "blur(10px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ x: -60, opacity: 0, filter: "blur(5px)" }}
          transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }}
          className="fixed top-4 bottom-4 left-6 z-50 flex w-72 flex-col"
          onMouseLeave={close}
        >
          <div className="flex flex-1 flex-col gap-1 overflow-hidden rounded-3xl border border-zinc-200/60 bg-white p-2 shadow-2xl shadow-black/40 dark:border-zinc-800/60 dark:bg-[#121212]">
            <div className="mb-2 flex items-center justify-between border-b border-zinc-100 px-4 py-4 dark:border-zinc-800/50">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                Documentation
              </span>
              <button
                type="button"
                onClick={close}
                className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mask-image-b flex-1 overflow-y-auto px-2 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {docsConfig.nav.map((group, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h4 className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-900/40 dark:text-zinc-100/30">
                    {group.title}
                  </h4>
                  <div className="flex flex-col gap-0.5">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href
                      const slug = item.href.split("/").pop()
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
                            close()
                          }}
                          className={cn(
                            "group flex items-center justify-between rounded-md border border-transparent px-3 py-1 text-[13px] font-medium transition-all duration-200",
                            isActive
                              ? "translate-x-1 font-semibold text-zinc-900 dark:text-white"
                              : "text-zinc-500 hover:translate-x-1 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300"
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

            <div className="pointer-events-none absolute bottom-2 left-2 right-2 h-8 rounded-b-2xl bg-gradient-to-t from-white to-transparent dark:from-zinc-950" />
          </div>

          <AnimatePresence>
            {hoverPreview && hoverPosition && (
              <motion.div
                key={hoverPreview.videoSrc}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.08, ease: "easeOut" }}
                className="pointer-events-none fixed z-[70] w-56"
                style={{
                  left: hoverPosition.x,
                  top: hoverPosition.y,
                }}
              >
                <div className="overflow-hidden rounded-xl border border-zinc-200/70 bg-white/95 shadow-2xl backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-900/95">
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
  )
}
