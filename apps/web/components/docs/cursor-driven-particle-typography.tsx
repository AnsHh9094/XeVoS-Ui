import React from "react"
import { CursorDrivenParticleTypography } from "@workspace/ui/components/cursor-driven-particle-typography"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const importCode = `import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography"`

const defaultCode = `import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography"

<CursorDrivenParticleTypography text="Componentry" />`

export async function CursorDrivenParticleTypographyDocs() {
    const sourceCode = (await readComponentSource("cursor-driven-particle-typography")) || "// Unable to load source code"

    return (
        <DocsPageLayout
            title="Particle Typography"
            description="Renders dynamic typography constructed entirely from particles that elegantly disperse and reassemble upon cursor interaction using spring physics."

            preview={
                <div className="w-full h-full min-h-[400px] flex items-center justify-center relative">
                    <CursorDrivenParticleTypography
                        text="Design"
                        fontSize={140}
                        particleDensity={4}
                        className="w-full h-full"
                    />
                </div>
            }
            previewCode={defaultCode}

            installPackageName="cursor-driven-particle-typography"
            installSourceCode={sourceCode}
            installSourceFilename="components/ui/cursor-driven-particle-typography.tsx"

            usageCode={importCode}

            examples={[
                {
                    title: "Custom Particle Color",
                    preview: (
                        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative">
                            <CursorDrivenParticleTypography
                                text="Create"
                                color="#2563eb"
                                particleSize={2}
                                dispersionStrength={20}
                            />
                        </div>
                    ),
                    code: `<CursorDrivenParticleTypography
  text="Create"
  color="#2563eb"
  particleSize={2}
  dispersionStrength={20}
/>`,
                },
                {
                    title: "Fine Particles (High Density)",
                    preview: (
                        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative">
                            <CursorDrivenParticleTypography
                                text="Details"
                                particleDensity={2}
                                particleSize={1}
                                fontSize={120}
                            />
                        </div>
                    ),
                    code: `<CursorDrivenParticleTypography
  text="Details"
  particleDensity={2}
  particleSize={1}
  fontSize={120}
/>`,
                }
            ]}

            props={[
                {
                    name: "text",
                    type: "string",
                    description: "The text content to render with particles.",
                },
                {
                    name: "fontSize",
                    type: "number",
                    default: "120",
                    description: "Base font size in pixels. Scales down automatically for smaller containers.",
                },
                {
                    name: "fontFamily",
                    type: "string",
                    default: '"Inter, sans-serif"',
                    description: "Font family for the text.",
                },
                {
                    name: "particleSize",
                    type: "number",
                    default: "1.5",
                    description: "Radius of each particle in pixels.",
                },
                {
                    name: "particleDensity",
                    type: "number",
                    default: "6",
                    description: "Spacing between original pixel sampling. Lower number = more particles (higher density). Warning: very low numbers may impact performance.",
                },
                {
                    name: "dispersionStrength",
                    type: "number",
                    default: "15",
                    description: "How strongly the cursor pushes particles away on hover.",
                },
                {
                    name: "returnSpeed",
                    type: "number",
                    default: "0.08",
                    description: "Strength of the spring physics pulling particles back to their origin.",
                },
                {
                    name: "color",
                    type: "string",
                    description: "Custom color for the particles. If omitted, it inherits parent text color.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for custom styling of the wrapper div.",
                },
            ]}
        />
    )
}
