import type React from "react"
import type { Metadata, Viewport } from "next"
import { Albert_Sans, JetBrains_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { JsonLd } from "@/components/seo/json-ld"
import { RouteScrollbarController } from "@/components/route-scrollbar-controller"

const fontSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
})

const fontDisplay = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const siteUrl = "https://www.componentry.fun"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Componentry — Animated React UI Components for Modern Apps",
    template: "%s | Componentry - UI Component Library",
  },
  description: "Beautiful, animated, copy-paste React UI components built with Tailwind CSS, TypeScript, and Framer Motion. Free and open-source.",
  keywords: [
    "Componentry",
    "Componentry UI",
    "componentry.fun",
    "UI component library",
    "React components",
    "React UI library",
    "UI components",
    "component library",
    "Tailwind CSS components",
    "TypeScript components",
    "Framer Motion",
    "Next.js components",
    "animated components",
    "copy paste components",
    "free UI components",
    "open source components",
    "modern UI",
    "web components",
    "frontend components",
    "design system",
    "React developer",
    "frontend developer",
    "shadcn alternative",
    "radix ui",
    "beautiful UI",
    "premium components",
    "handcrafted components",
  ],
  authors: [
    { name: "Harsh Jadhav", url: "https://twitter.com/harshjdhv" },
    { name: "Harsh Jadhav", url: "https://github.com/harshjdhv" },
  ],
  creator: "Harsh Jadhav",
  publisher: "Harsh Jadhav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Componentry — Animated React UI Components for Modern Apps",
    description: "Beautiful, animated, copy-paste React UI components built with Tailwind CSS, TypeScript, and Framer Motion. Free and open-source.",
    siteName: "Componentry",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Componentry - Premium React UI Component Library",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Componentry - Premium React UI Component Library",
    description: "Beautiful, animated, copy-paste React UI components built with Tailwind CSS, TypeScript, and Framer Motion. Free and open-source.",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Componentry - Premium React UI Component Library",
      },
    ],
    creator: "@harshjdhv",
    site: "@harshjdhv",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  category: "technology",
  classification: "UI Component Library",
  other: {
    "msapplication-TileImage": "/opengraph-image",
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <head>
        <JsonLd />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} ${fontDisplay.variable} relative font-sans antialiased`}
        style={{ "--font-heading": "var(--font-display)" } as React.CSSProperties}
      >
        <div className="isolate relative flex min-h-svh flex-col">
          <RouteScrollbarController />
          <Providers>{children}</Providers>
        </div>
        <SpeedInsights />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="26f17963-74a5-48ce-8d5c-6cebb2ca2baa"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
