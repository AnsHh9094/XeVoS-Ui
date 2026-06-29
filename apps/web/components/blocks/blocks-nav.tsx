import Link from "next/link"

import categories from "@/registry/generated/block-categories.json"
import { cn } from "@/lib/utils"

export function BlocksNav({ active }: { active?: string }) {
  return (
    <nav className="sticky top-14 z-30 screen-line-bottom bg-background/85 px-2 py-2 backdrop-blur">
      <div className="flex gap-1 overflow-x-auto">
        <Link
          href="/blocks"
          className={cn(
            "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
            !active && "bg-muted text-foreground"
          )}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/blocks/${category.name}`}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
              active === category.name && "bg-muted text-foreground"
            )}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}
