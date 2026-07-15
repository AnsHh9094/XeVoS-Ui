/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type React from "react"

export function XevosUILogomark({ className, ...props }: React.SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className={className}
            {...props}
        >
            <rect x="0" y="0" width="100" height="100" rx="18" fill="currentColor" fillOpacity="0.06" />
            <g fill="currentColor" transform="translate(10,12)">
                {/* Stylized X */}
                <path d="M6 0 L18 0 L38 20 L58 0 L70 0 L40 30 L70 60 L58 60 L38 40 L18 60 L6 60 L36 30 Z" />
                {/* Stylized E */}
                <path d="M84 6 H96 V12 H88 V28 H96 V34 H88 V50 H96 V56 H84 Z" transform="translate(-28,0)" />
            </g>
        </svg>
    )
}
