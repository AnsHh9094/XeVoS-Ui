import React from "react"
import { LayeredStack } from "@workspace/ui/components/layered-stack"
import { DocsPageLayout } from "@/components/docs-page-layout"
import { readComponentSource } from "@/lib/source-code"

const importCode = `import { LayeredStack } from "@/components/ui/layered-stack"`

const images = [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800",
];

const defaultCode = `import { LayeredStack } from "@/components/ui/layered-stack"

const images = [
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800",
];

export const Demo = () => {
    return (
        <LayeredStack className="w-full max-w-[920px] grid grid-cols-4 gap-4 p-8">
            {images.map((img, i) => (
                <img key={i} src={img} alt={\`Scientific element \${i}\`} className="object-cover w-full aspect-[250/320] shadow-xl" />
            ))}
        </LayeredStack>
    );
};`

export async function LayeredStackDocs() {
  const sourceCode = (await readComponentSource("layered-stack")) || "// Unable to load source code"

  return (
    <DocsPageLayout
      title="Layered Stack"
      description="A stack of layered cards that reset and spring out on mouse interactions."
      
      preview={
        <div className="flex w-full min-h-[500px] items-center justify-center p-8">
            <LayeredStack className="w-full max-w-[920px] grid grid-cols-4 gap-4 p-8">
                {images.map((img, i) => (
                    <img key={i} src={img} alt={`Scientific element ${i}`} className="object-cover w-full aspect-[250/320] shadow-xl" />
                ))}
            </LayeredStack>
        </div>
      }
      previewCode={defaultCode}
      
      installPackageName="layered-stack"
      installDependencies="gsap"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/layered-stack.tsx"
      
      usageCode={importCode}
      
      props={[
        {
          name: "children",
          type: "ReactNode",
          description: "The layered items inside the stack.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for styling.",
        },
      ]}
    />
  )
}
