import React from "react";
import { AnimatedGradientPreview } from "@/components/docs/previews/animated-gradient-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const importCode = `import { AnimatedGradient } from "@/components/ui/animated-gradient"`;
const defaultCode = `<AnimatedGradient config={{ preset: "Aurora" }} />`;

export async function AnimatedGradientDocs() {
    const sourceCode =
        (await readComponentSource("animated-gradient")) ||
        "// Unable to load source code";

    return (
        <DocsPageLayout
            title="Animated Gradient"
            description="A beautiful, animated, and customizable WebGL gradient with noise capabilities."
            preview={<AnimatedGradientPreview />}
            previewCode={defaultCode}
            installPackageName="animated-gradient"
            installDependencies=""
            installSourceCode={sourceCode}
            importCode={importCode}
            usageCode={defaultCode}
            fullWidthPreview={true}
            hideDefaultPreviewVariant={true}
            examples={[
                {
                    title: "Aurora",
                    preview: <AnimatedGradientPreview config={{ preset: "Aurora" }} />,
                    code: `<AnimatedGradient config={{ preset: "Aurora" }} />`,
                    fullWidth: true
                },
                {
                    title: "Oceanic",
                    preview: <AnimatedGradientPreview config={{ preset: "Oceanic" }} />,
                    code: `<AnimatedGradient config={{ preset: "Oceanic" }} />`,
                    fullWidth: true
                },
                {
                    title: "Amber",
                    preview: <AnimatedGradientPreview config={{ preset: "Amber" }} />,
                    code: `<AnimatedGradient config={{ preset: "Amber" }} />`,
                    fullWidth: true
                },
                {
                    title: "Toxic",
                    preview: <AnimatedGradientPreview config={{ preset: "Toxic" }} />,
                    code: `<AnimatedGradient config={{ preset: "Toxic" }} />`,
                    fullWidth: true
                },
                {
                    title: "Ghost",
                    preview: <AnimatedGradientPreview config={{ preset: "Ghost" }} />,
                    code: `<AnimatedGradient config={{ preset: "Ghost" }} />`,
                    fullWidth: true
                },
            ]}
            props={[
                {
                    name: "config",
                    type: "GradientConfig",
                    description: "Preset or custom configuration for the gradient pattern.",
                },
                {
                    name: "noise",
                    type: "NoiseConfig",
                    description: "Options to apply a noise overlay.",
                },
                {
                    name: "radius",
                    type: "string",
                    default: '"0px"',
                    description: "Border radius applied to the container.",
                },
                {
                    name: "className",
                    type: "string",
                    description: "Additional CSS classes for styling.",
                },
                {
                    name: "style",
                    type: "CSSProperties",
                    description: "Additional inline CSS styles.",
                },
            ]}
        />
    );
}
