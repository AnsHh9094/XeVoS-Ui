/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import { cn } from "@/lib/utils"

interface DocsSidebarIconProps {
  className?: string
  dividerClassName?: string
}

export function DocsSidebarIcon({ className, dividerClassName }: DocsSidebarIconProps) {
  return (
    <span
      className={cn("relative inline-grid size-4 shrink-0 place-items-center", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.32698 2.63803C0 3.27976 0 4.11984 0 5.8V10.2C0 11.8802 0 12.7202 0.32698 13.362C0.614601 13.9265 1.07354 14.3854 1.63803 14.673C2.27976 15 3.11984 15 4.8 15H11.2C12.8802 15 13.7202 15 14.362 14.673C14.9265 14.3854 15.3854 13.9265 15.673 13.362C16 12.7202 16 11.8802 16 10.2V5.8C16 4.11984 16 3.27976 15.673 2.63803C15.3854 2.07354 14.9265 1.6146 14.362 1.32698C13.7202 1 12.8802 1 11.2 1H4.8C3.11984 1 2.27976 1 1.63803 1.32698C1.07354 1.6146 0.614601 2.07354 0.32698 2.63803Z"
          fill="currentColor"
        />
      </svg>
      <span
        className={cn(
          "absolute left-[18.75%] top-[18.75%] h-[62.5%] w-[28.125%] rounded-[1px] bg-background",
          dividerClassName
        )}
      />
    </span>
  )
} 
