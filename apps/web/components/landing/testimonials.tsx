"use client"

import { motion } from "framer-motion"

const XIcon = () => (
  <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const DiscordIcon = () => (
  <svg className="size-3.5" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z" />
  </svg>
)

type TestimonialSource = "x" | "discord"

interface Testimonial {
  quote: string
  name: string
  handle: string
  initials: string
  source: TestimonialSource
  meta?: string
}

const row1: Testimonial[] = [
  {
    quote: "very nice stuff!",
    name: "Pasquale Vitiello",
    handle: "@pacovitiello",
    initials: "PV",
    source: "x",
    meta: "Design Engineer @ Cal.com",
  },
  {
    quote: "what is going on @shadcn? In just a few hours I've discovered a bunch of new shadcn libraries I had never seen before... componentry fun by @harshjdhv... I thought I'd caught them all!",
    name: "Ali Bey",
    handle: "@alibey_10",
    initials: "AB",
    source: "x",
    meta: "151 likes · 8.5k views",
  },
  {
    quote: "particle typography — npx shadcn add @componentry/cursor-driven-particle-typography",
    name: "Ali Bey",
    handle: "@alibey_10",
    initials: "AB",
    source: "x",
    meta: "303 likes · 15k views",
  },
]

const row2: Testimonial[] = [
  {
    quote: "Loved it!! Great UI Library. Keep Building Man!!",
    name: "Tency テンシ",
    handle: "100xSchool Discord",
    initials: "T",
    source: "discord",
  },
  {
    quote: "love how it shows previews on hover in sidebar.. perfect enough spacing.. super clean",
    name: "Amitanshu Sahu",
    handle: "100xSchool Discord",
    initials: "AS",
    source: "discord",
  },
  {
    quote: "you got a design eye @Harsh",
    name: "Community Member",
    handle: "100xSchool Discord",
    initials: "CM",
    source: "discord",
  },
  {
    quote: "nice bro",
    name: "PATIL",
    handle: "100xSchool Discord",
    initials: "P",
    source: "discord",
  },
  {
    quote: "looking good",
    name: "Insane",
    handle: "100xSchool Discord",
    initials: "I",
    source: "discord",
  },
]

function TestimonialCard({ item }: { item: Testimonial }) {
  const isX = item.source === "x"
  return (
    <div className="group relative flex h-auto w-[320px] shrink-0 flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-[#161616] p-5 transition-colors duration-300 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transform-gpu [backface-visibility:hidden]">
      {/* Source badge + quote */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-4 flex-1">
          &ldquo;{item.quote}&rdquo;
        </p>
        <span
          className={`shrink-0 ${
            isX
              ? "text-zinc-400 dark:text-zinc-500"
              : "text-indigo-400 dark:text-indigo-500"
          }`}
        >
          {isX ? <XIcon /> : <DiscordIcon />}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-2.5 mt-auto pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
        <div className="size-7 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">{item.initials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{item.name}</p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600 truncate">
            {item.handle}
            {item.meta && <span className="text-zinc-300 dark:text-zinc-700"> · {item.meta}</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: Testimonial[]
  direction?: "left" | "right"
  speed?: number
}) {
  // Duplicate until we have enough cards for a seamless loop
  let displayed = [...items]
  while (displayed.length < 12) displayed = [...displayed, ...items]

  const anim =
    direction === "left"
      ? "marquee-left var(--dur) linear infinite"
      : "marquee-right var(--dur) linear infinite"

  return (
    <div className="group flex overflow-hidden [--gap:0.875rem]">
      {[0, 1].map((clone) => (
        <div
          key={clone}
          aria-hidden={clone === 1}
          className="flex shrink-0 [gap:var(--gap)] pr-[var(--gap)] will-change-transform group-hover:[animation-play-state:paused]"
          style={{
            "--dur": `${speed}s`,
            animation: anim,
            minWidth: "100%",
          } as React.CSSProperties}
        >
          {displayed.map((item, i) => (
            <TestimonialCard key={`${clone}-${i}`} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-100%,0,0); }
        }
        @keyframes marquee-right {
          from { transform: translate3d(-100%,0,0); }
          to   { transform: translate3d(0,0,0); }
        }
      `}</style>

      <section className="w-full pt-6 pb-20 overflow-hidden">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 px-4"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600 mb-3">
            What developers are saying
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-100">
            Loved by the community
          </h2>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col gap-3"
        >
          <MarqueeRow items={row1} direction="left" speed={40} />
          <MarqueeRow items={row2} direction="right" speed={35} />

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#111] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#111] to-transparent z-10" />
        </motion.div>
      </section>
    </>
  )
}
