import { Geist } from "next/font/google"

import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-blocks-geist",
  display: "swap",
})

export function BlocksHeading({
  title,
}: {
  title: string
}) {
  return (
    <section
      className={cn(
        geist.variable,
        "px-3 py-9 font-[family-name:var(--font-blocks-geist)] md:px-4 md:py-12"
      )}
    >
      <h1 className="max-w-none text-balance text-[1.875rem] font-medium leading-[1.12] tracking-normal md:whitespace-nowrap md:text-[2.5rem] lg:text-[2.75rem]">
        {title}
      </h1>
    </section>
  )
}
