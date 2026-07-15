/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import Link from "next/link"

import categories from "@/registry/generated/block-categories.json"
import { cn } from "@/lib/utils"

export function BlocksNav({ active }: { active?: string }) {
  return (
    <nav className="bg-background pb-3">
      <div className="mx-auto w-full max-w-[1360px] px-4 md:px-0">
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
      </div>
    </nav>
  )
} 
