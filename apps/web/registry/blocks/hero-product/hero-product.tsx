import { ArrowRight, Sparkles, Zap } from "lucide-react"

import HeroGeometric from "@workspace/ui/components/hero-geometric"

const stats = [
  ["42ms", "median interaction"],
  ["18k", "animated surfaces shipped"],
  ["99.9%", "static delivery ready"],
]

export default function HeroProductBlock() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <HeroGeometric
        title1=""
        title2=""
        className="absolute inset-0 min-h-full opacity-80"
        color1="#38bdf8"
        color2="#f8fafc"
        speed={0.65}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent,theme(colors.background)_72%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-24 md:px-10">
        <div className="grid items-end gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-primary" />
              Launch-ready animated interface kit
            </div>

            <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Build product pages that feel alive.
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
              A high-impact hero block with motion, proof, and strong hierarchy,
              ready to drop into a modern React landing page.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Start building
                <ArrowRight className="size-4" />
              </a>
              <a className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background/70 px-5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-muted">
                View components
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-background/75 p-3 shadow-2xl shadow-black/10 backdrop-blur">
            <div className="rounded-[1.4rem] border border-border bg-muted/40 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Release velocity</p>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Zap className="size-4" />
                </div>
              </div>
              <div className="flex h-56 items-end gap-2">
                {[34, 62, 48, 76, 56, 92, 70, 88, 64, 96, 82, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-primary/80"
                      style={{ height: `${height}%`, opacity: 0.35 + index / 20 }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-3 md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-background/70 p-5 backdrop-blur"
            >
              <div className="text-2xl font-semibold tracking-tight">
                {value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
