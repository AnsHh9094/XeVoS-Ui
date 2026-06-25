import React from "react"
import { LetterCascade } from "@workspace/ui/components/letter-cascade"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { MousePointer, Pointer } from "lucide-react"

const usageCode = `import { LetterCascade } from "@/components/ui/letter-cascade"

<LetterCascade
  text="Hover Me"
  className="text-4xl font-bold"
/>`

const defaultCode = `import { LetterCascade } from "@/components/ui/letter-cascade"

<LetterCascade text="Hover Me" className="text-4xl font-bold" />`

const centerStaggerCode = `<LetterCascade
  text="Center Wave"
  staggerFrom="center"
  className="text-4xl font-bold"
/>`

const bouncyCode = `<LetterCascade
  text="Bouncy"
  stiffness={350}
  damping={8}
  staggerDuration={0.06}
  className="text-4xl font-bold"
/>`

const clickCode = `<LetterCascade
  text="Click Me!"
  triggerOnClick
  staggerFrom="center"
  stiffness={280}
  damping={14}
  className="text-4xl font-bold"
/>`

const snappyCode = `<LetterCascade
  text="Snappy"
  stiffness={500}
  damping={22}
  staggerDuration={0.02}
  className="text-4xl font-bold"
/>`

function HoverHint() {
    return (
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60 select-none mt-5">
            <MousePointer className="w-3 h-3" />
            Hover over the text
        </span>
    )
}

function ClickHint() {
    return (
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60 select-none mt-5">
            <Pointer className="w-3 h-3" />
            Click the text
        </span>
    )
}

export async function LetterCascadeDocs() {
    const sourceCode = (await readComponentSource("letter-cascade")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Letter Cascade"
            description="A 3D split-flap text animation where letters flip with perspective depth, motion blur, and spring physics. Each character tilts back while its echo flips into view from below, creating a satisfying cascading wave."
            preview={
                <div className="flex flex-col items-center justify-center">
                    <LetterCascade
                        text="Hover Me"
                        className="text-4xl font-bold text-foreground"
                    />
                    <HoverHint />
                </div>
            }
            previewCode={defaultCode}
            installPackageName="letter-cascade"
            installDependencies="framer-motion clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={usageCode}
            examples={[
                {
                    title: "Center Wave",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <LetterCascade
                                text="Center Wave"
                                staggerFrom="center"
                                className="text-4xl font-bold text-foreground"
                            />
                            <HoverHint />
                        </div>
                    ),
                    code: centerStaggerCode,
                },
                {
                    title: "Extra Bouncy",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <LetterCascade
                                text="Bouncy"
                                stiffness={350}
                                damping={8}
                                staggerDuration={0.06}
                                className="text-4xl font-bold text-foreground"
                            />
                            <HoverHint />
                        </div>
                    ),
                    code: bouncyCode,
                },
                {
                    title: "Click Trigger",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <LetterCascade
                                text="Click Me!"
                                triggerOnClick
                                staggerFrom="center"
                                stiffness={280}
                                damping={14}
                                className="text-4xl font-bold text-foreground"
                            />
                            <ClickHint />
                        </div>
                    ),
                    code: clickCode,
                },
                {
                    title: "Snappy",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <LetterCascade
                                text="Snappy"
                                stiffness={500}
                                damping={22}
                                staggerDuration={0.02}
                                className="text-4xl font-bold text-foreground"
                            />
                            <HoverHint />
                        </div>
                    ),
                    code: snappyCode,
                },
            ]}
            props={[
                {
                    name: "text",
                    type: "string",
                    description: "The text content to animate.",
                },
                {
                    name: "staggerDuration",
                    type: "number",
                    default: "0.04",
                    description: "Delay in seconds between each letter's animation start.",
                },
                {
                    name: "staggerFrom",
                    type: '"first" | "last" | "center" | number',
                    default: '"first"',
                    description: "Origin point of the stagger wave.",
                },
                {
                    name: "stiffness",
                    type: "number",
                    default: "220",
                    description: "Spring stiffness — higher values produce snappier motion.",
                },
                {
                    name: "damping",
                    type: "number",
                    default: "16",
                    description: "Spring damping — lower values produce bouncier motion.",
                },
                {
                    name: "triggerOnClick",
                    type: "boolean",
                    default: "false",
                    description: "When true, the animation triggers on click instead of hover.",
                },
                {
                    name: "onComplete",
                    type: "() => void",
                    description: "Callback fired when the full animation cycle completes.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for the container.",
                },
                {
                    name: "letterClassName",
                    type: "string",
                    description: "CSS classes applied to each individual letter span.",
                },
            ]}
        />
    )
}
