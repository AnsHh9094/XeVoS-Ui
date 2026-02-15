import type React from "react"

export function ComponentryLogomark({ className, ...props }: React.SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
        <svg
            viewBox="120 120 272 272"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M120 160Q120 120 160 120H260Q300 120 300 160V220H352Q392 220 392 260V352Q392 392 352 392H260Q220 392 220 352V292H160Q120 292 120 252Z"
            />
        </svg>
    )
}
