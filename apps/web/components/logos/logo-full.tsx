/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type React from "react"
import { Logomark } from "./logomark"

export function LogoFull({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      <Logomark className="h-6 w-6" />
      <span className="font-bold text-lg tracking-tight">Xevos UI</span>
    </div>
  )
}
