"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { components, type ComponentCategory, type ComponentMetadata } from "@/registry"
import { Logomark } from "@/components/logos/logomark"

import { FloatingNavbar } from "@/components/floating-navbar"
// ─── Component Card ────────────────────────────────────────────────────────
function ComponentCard({
  component,
  index,
}: {
  component: ComponentMetadata
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.02 * index,
        ease: "easeOut",
      }}
    >
      <Link
        href={`/docs/components/${component.slug}`}
        className="group relative flex flex-col rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:border-zinc-300 dark:hover:border-zinc-700"
      >
        {/* ── Preview area (Floating) ── */}
        <div className="p-1.5">
          <div className="relative h-[220px] w-full rounded-xl bg-zinc-50 dark:bg-zinc-900/80 group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/80 transition-colors border border-dashed border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
            {component.previewVideo ? (
              <video
                src={component.previewVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              /* Placeholder for future video/interaction */
              null
            )}
          </div>
        </div>

        {/* ── Info area ── */}
        <div className="flex flex-col gap-1.5 px-4 pb-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {component.title}
            </h3>
            {component.isNew && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                New
              </span>
            )}
          </div>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {component.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

const categoryOrder: ComponentCategory[] = [
  "Text Animations",
  "Components",
  "Hero Backgrounds",
  "Visual Effects",
]

// ─── Main Docs Page ─────────────────────────────────────────────────────────
export default function DocsPage() {
  const allComponents = Object.values(components)
  const [activeSection, setActiveSection] = useState<string>("")



  useEffect(() => {
    const observers = categoryOrder.map((cat) => {
      const id = cat.toLowerCase().replace(/\s+/g, "-")
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setActiveSection(cat)
          }
        },
        { rootMargin: "-20% 0px -50% 0px" } // Trigger when section is near center/top
      )
      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const grouped = categoryOrder
    .map(cat => ({
      category: cat,
      items: allComponents.filter(c => c.category === cat),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] text-zinc-900 dark:text-zinc-100 font-sans overflow-x-hidden">
      {/* ── Overlays ── */}
      <div className="fixed top-0 left-0 right-0 z-40 h-24 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80 pointer-events-none backdrop-blur-[1px]" />
      <div className="fixed bottom-0 left-0 right-0 z-40 h-24 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80 pointer-events-none backdrop-blur-[1px]" />

      {/* ── Top Floating Header ── */}
      <FloatingNavbar />

      {/* ── Floating Dock Nav ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 pointer-events-none">
        <nav className="flex items-center gap-1 p-1.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-xl shadow-lg shadow-zinc-200/20 dark:shadow-black/20 pointer-events-auto">
          {categoryOrder.map((cat) => {
            const isActive = activeSection === cat
            return (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(cat.toLowerCase().replace(/\s+/g, '-'))?.scrollIntoView({ behavior: 'smooth' })
                  setActiveSection(cat)
                }}
                className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg ${isActive
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </a>
            )
          })}
        </nav>
      </div>

      <main className="max-w-[1400px] mx-auto pt-32 pb-32 px-6 sm:px-8 relative z-10">

        {/* ── Hero ── */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent leading-[1.1] mb-2 inline-block">
            Crafted Components.
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
            A growing collection of animated primitives for React.
          </p>
        </div>





        {/* ── Categories ── */}
        <div className="space-y-24">
          {grouped.map(({ category, items }) => {
            return (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((component, i) => (
                    <ComponentCard
                      key={component.slug}
                      component={component}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* ── Footer ── */}
        <div className="mt-32 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logomark className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
              <p className="text-xs text-zinc-400 dark:text-zinc-600">
                Built by{" "}
                <Link
                  href="https://x.com/harshjdhv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                >
                  @harshjdhv
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://x.com/harshjdhv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com/harshjdhv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </main >
    </div >
  )
}
