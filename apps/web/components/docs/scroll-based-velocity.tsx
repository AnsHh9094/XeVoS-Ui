
import React from "react"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"
import { ScrollBasedVelocityDemo } from "@/components/docs/previews/scroll-based-velocity-preview"

const basicCode = `import { ScrollBasedVelocity } from "@/components/ui/scroll-based-velocity";

<ScrollBasedVelocity
  text="Velocity Scroll"
  default_velocity={5}
  className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground drop-shadow-sm md:text-7xl md:leading-[5rem]"
/>`

export async function ScrollBasedVelocityDocs() {
    const sourceCode = (await readComponentSource("scroll-based-velocity")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Scroll Based Velocity"
            description="Text that scrolls across the screen and speeds up based on the user's scroll velocity."
            preview={<ScrollBasedVelocityDemo />}
            previewCode={basicCode}
            installPackageName="scroll-based-velocity"
            installDependencies="framer-motion"
            installSourceCode={sourceCode}
            installSourceFilename="components/ui/scroll-based-velocity.tsx"
            usageCode={basicCode}
            fullWidthPreview={true}
            props={[
                {
                    name: "text",
                    type: "string",
                    description: "The text to display and scroll.",
                },
                {
                    name: "default_velocity",
                    type: "number",
                    default: "5",
                    description: "The base speed of the scrolling.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Classes to style the text element.",
                },
            ]}
        />
    )
}
