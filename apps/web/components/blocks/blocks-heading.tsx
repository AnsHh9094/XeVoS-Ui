import { Geist } from "next/font/google"

import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-blocks-geist",
  display: "swap",
})

export function BlocksHeading({
  eyebrow = "Blocks",
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <section
      className={cn(
        geist.variable,
        "screen-line-bottom px-8 py-7 font-[family-name:var(--font-blocks-geist)] md:py-8"
      )}
    >
      <p className="text-xs font-normal uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl text-balance text-2xl font-normal tracking-normal md:text-3xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-pretty text-sm font-normal leading-6 text-muted-foreground">
        {description}
      </p>
    </section>
  )
}
