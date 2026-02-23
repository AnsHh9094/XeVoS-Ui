import React from "react";
import { ScrubInputDemo, ScrubInputMultipleDemo } from "@/components/docs/previews/scrub-input-preview";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";

const basicUsageCode = `import { useState } from "react";
import { ScrubInput } from "@/components/ui/scrub-input";

export function Demo() {
  const [opacity, setOpacity] = useState(44);

  return (
    <ScrubInput 
      label="Opacity" 
      value={opacity} 
      onChange={setOpacity} 
      min={0} 
      max={100} 
    />
  );
}`;

const multipleCode = `import { useState } from "react";
import { ScrubInput } from "@/components/ui/scrub-input";

export function SettingsDemo() {
  const [radius, setRadius] = useState(12);
  const [blur, setBlur] = useState(24);

  return (
    <div className="flex flex-col gap-4">
      <ScrubInput 
        label="Border Radius" 
        value={radius} 
        onChange={setRadius} 
        min={0} 
        max={100} 
      />
      <ScrubInput 
        label="Blur" 
        value={blur} 
        onChange={setBlur} 
        min={0} 
        max={50} 
      />
    </div>
  );
}`;

export async function ScrubInputDocs() {
  const sourceCode =
    (await readComponentSource("scrub-input")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Scrub Input"
      description="An interactive inline slider component styled as a pill, allowing users to scrub values smoothly. Modeled after modern design tool interfaces."
      preview={<ScrubInputDemo />}
      previewCode={basicUsageCode}
      installPackageName="scrub-input"
      installDependencies="lucide-react"
      installSourceCode={sourceCode}
      usageCode={basicUsageCode}
      fullWidthPreview={false}
      examples={[
        {
          title: "Multiple Inputs",
          preview: <ScrubInputMultipleDemo />,
          code: multipleCode,
          fullWidth: false,
        },
      ]}
      props={[
        {
          name: "label",
          type: "string",
          default: '""',
          description: "Text label displayed inside the component.",
        },
        {
          name: "value",
          type: "number",
          default: "undefined",
          description: "The controlled value of the scrub input.",
        },
        {
          name: "defaultValue",
          type: "number",
          default: "0",
          description: "The initial value when uncontrolled.",
        },
        {
          name: "onChange",
          type: "(value: number) => void",
          default: "undefined",
          description: "Callback fired when the value changes.",
        },
        {
          name: "min",
          type: "number",
          default: "0",
          description: "The minimum allowed value.",
        },
        {
          name: "max",
          type: "number",
          default: "100",
          description: "The maximum allowed value.",
        },
        {
          name: "step",
          type: "number",
          default: "1",
          description: "The granularity of the variable adjustments.",
        },
      ]}
    />
  );
}
