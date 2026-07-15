/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type React from "react"
import { Logomark } from "./logomark"

export function LogoSquare({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={`flex items-center justify-center bg-primary text-primary-foreground rounded-lg ${className}`}
      {...props}
    >
      <Logomark className="h-2/3 w-2/3" />
    </div>
  )
}
