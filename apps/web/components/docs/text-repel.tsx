import React from "react"
import { TextRepel } from "@workspace/ui/components/text-repel"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { MousePointer } from "lucide-react"

const usageCode = `import { TextRepel } from "@/components/ui/text-repel"

<TextRepel
  text="Move your cursor here"
  className="text-4xl font-bold"
/>`

const defaultCode = `import { TextRepel } from "@/components/ui/text-repel"

<TextRepel text="Move your cursor here" className="text-4xl font-bold" />`

const attractCode = `<TextRepel
  text="Magnetic Pull"
  mode="attract"
  strength={35}
  className="text-4xl font-bold"
/>`

const strongCode = `<TextRepel
  text="Force Field"
  radius={160}
  strength={70}
  className="text-4xl font-bold"
/>`

const bouncyCode = `<TextRepel
  text="Jelly Text"
  stiffness={120}
  damping={6}
  mass={0.6}
  strength={50}
  className="text-4xl font-bold"
/>`

const subtleCode = `<TextRepel
  text="Subtle Drift"
  radius={80}
  strength={20}
  stiffness={300}
  damping={25}
  className="text-4xl font-bold"
/>`

function CursorHint() {
    return (
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60 select-none mt-5">
            <MousePointer className="w-3 h-3" />
            Move your cursor over the text
        </span>
    )
}

export async function TextRepelDocs() {
    const sourceCode = (await readComponentSource("text-repel")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Text Repel"
            description="A physics-based text animation where each letter reacts to cursor proximity. Letters are pushed away (or attracted) in real-time with spring dynamics, creating an interactive magnetic force-field effect."
            preview={
                <div className="flex flex-col items-center justify-center">
                    <TextRepel
                        text="Move your cursor here"
                        className="text-4xl font-bold text-foreground"
                    />
                    <CursorHint />
                </div>
            }
            previewCode={defaultCode}
            installPackageName="text-repel"
            installDependencies="framer-motion clsx tailwind-merge"
            installSourceCode={sourceCode}
            usageCode={usageCode}
            examples={[
                {
                    title: "Attract Mode",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <TextRepel
                                text="Magnetic Pull"
                                mode="attract"
                                strength={35}
                                className="text-4xl font-bold text-foreground"
                            />
                            <CursorHint />
                        </div>
                    ),
                    code: attractCode,
                },
                {
                    title: "Strong Force Field",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <TextRepel
                                text="Force Field"
                                radius={160}
                                strength={70}
                                className="text-4xl font-bold text-foreground"
                            />
                            <CursorHint />
                        </div>
                    ),
                    code: strongCode,
                },
                {
                    title: "Bouncy Jelly",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <TextRepel
                                text="Jelly Text"
                                stiffness={120}
                                damping={6}
                                mass={0.6}
                                strength={50}
                                className="text-4xl font-bold text-foreground"
                            />
                            <CursorHint />
                        </div>
                    ),
                    code: bouncyCode,
                },
                {
                    title: "Subtle Drift",
                    preview: (
                        <div className="flex flex-col items-center justify-center">
                            <TextRepel
                                text="Subtle Drift"
                                radius={80}
                                strength={20}
                                stiffness={300}
                                damping={25}
                                className="text-4xl font-bold text-foreground"
                            />
                            <CursorHint />
                        </div>
                    ),
                    code: subtleCode,
                },
            ]}
            props={[
                {
                    name: "text",
                    type: "string",
                    description: "The text content to display.",
                },
                {
                    name: "radius",
                    type: "number",
                    default: "120",
                    description: "Cursor influence radius in pixels — letters within this distance react.",
                },
                {
                    name: "strength",
                    type: "number",
                    default: "45",
                    description: "Maximum displacement in pixels at closest proximity.",
                },
                {
                    name: "mode",
                    type: '"repel" | "attract"',
                    default: '"repel"',
                    description: "Whether letters are pushed away from or pulled toward the cursor.",
                },
                {
                    name: "stiffness",
                    type: "number",
                    default: "180",
                    description: "Spring stiffness — higher values make letters snap back faster.",
                },
                {
                    name: "damping",
                    type: "number",
                    default: "14",
                    description: "Spring damping — lower values produce bouncier motion.",
                },
                {
                    name: "mass",
                    type: "number",
                    default: "0.4",
                    description: "Spring mass — higher values make letters feel heavier.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for the container.",
                },
                {
                    name: "letterClassName",
                    type: "string",
                    description: "CSS classes applied to each individual letter.",
                },
            ]}
        />
    )
}
