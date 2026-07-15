/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export function PageHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: {
  title: React.ReactNode
  description: React.ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <h1
        className={cn(
          "text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 lg:text-5xl dark:text-zinc-100",
          titleClassName
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          "mt-2 max-w-2xl text-pretty text-lg font-normal leading-relaxed text-muted-foreground/90",
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  )
}
