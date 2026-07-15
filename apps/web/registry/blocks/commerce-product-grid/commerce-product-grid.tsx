/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import { Heart, ShoppingBag, SlidersHorizontal, Star } from "lucide-react"

const products = [
  ["Signal Jacket", "$248", "Weatherproof shell", "from-cyan-200 to-slate-300"],
  ["Field Tote", "$128", "Waxed canvas carry", "from-lime-200 to-stone-300"],
  ["Studio Lamp", "$196", "Soft cast aluminum", "from-amber-100 to-zinc-300"],
  ["Travel Knit", "$154", "Merino performance", "from-rose-100 to-neutral-300"],
]

export default function CommerceProductGridBlock() {
  return (
    <section className="min-h-screen bg-background px-5 py-8 text-foreground md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Curated drop
            </p>
            <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
              Utility objects with a sharper point of view.
            </h1>
          </div>
          <button className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-border px-4 text-sm font-medium transition hover:bg-muted">
            <SlidersHorizontal className="size-4" />
            Filters
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["New arrivals", "Outdoor", "Workspace", "Travel"].map((label) => (
            <button
              key={label}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(([name, price, description, gradient]) => (
            <article
              key={name}
              className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`relative aspect-[4/5] bg-gradient-to-br ${gradient}`}
              >
                <button className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition hover:bg-background">
                  <Heart className="size-4" />
                </button>
                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-background/55 p-5 backdrop-blur">
                  <div className="h-28 rounded-xl border border-white/50 bg-white/35 shadow-inner" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-medium">{name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <p className="font-medium">{price}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-3 fill-current" />
                    ))}
                  </div>
                  <button className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:scale-105">
                    <ShoppingBag className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
