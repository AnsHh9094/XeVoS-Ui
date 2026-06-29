import { Activity, ArrowUpRight, CircleCheck, Radio } from "lucide-react"

const metrics = [
  { label: "Revenue", value: "$184.2k", delta: "+18.4%" },
  { label: "Conversion", value: "7.82%", delta: "+2.1%" },
  { label: "Active users", value: "24,891", delta: "+11.6%" },
]

const events = [
  "Checkout latency dropped below 120ms",
  "Segment campaign exceeded baseline",
  "Inventory sync completed successfully",
]

export default function MetricsCommandCenterBlock() {
  return (
    <section className="min-h-screen bg-background px-5 py-8 text-foreground md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-2xl border border-border bg-muted/30 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Command center</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Growth pulse
              </h1>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Radio className="size-3.5" />
              Live
            </span>
          </div>

          <div className="mt-8 space-y-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border bg-background p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {metric.delta}
                    <ArrowUpRight className="size-3" />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <main className="rounded-2xl border border-border bg-background p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Acquisition curve</p>
              <h2 className="text-2xl font-semibold tracking-tight">
                Weekly performance
              </h2>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
              <Activity className="size-4 text-primary" />
              12 regions online
            </div>
          </div>

          <div className="mt-8 grid h-[360px] grid-cols-12 items-end gap-2 rounded-2xl bg-muted/35 p-4">
            {[42, 56, 44, 72, 68, 84, 76, 92, 88, 97, 90, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="rounded-t-lg bg-primary"
                  style={{ height: `${height}%`, opacity: 0.28 + index / 18 }}
                />
              )
            )}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event}
                className="flex gap-3 rounded-xl border border-border bg-muted/25 p-4"
              >
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm leading-6 text-muted-foreground">
                  {event}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  )
}
