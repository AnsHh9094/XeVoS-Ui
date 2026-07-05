import type { Metadata } from "next";
import { Fragment } from "react";

import { BlockDisplay } from "@/components/blocks/block-display";
import { BlocksStripeDivider } from "@/components/blocks/blocks-list-decor";
import { BlocksNav } from "@/components/blocks/blocks-nav";
import { getAllBlocks } from "@/lib/blocks/registry";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blocks | Componentry",
  description:
    "Production-ready Componentry blocks with live previews, source code, themes, and shadcn install commands.",
};

export default function BlocksPage() {
  const blocks = getAllBlocks();

  return (
    <>
      <BlocksNav />

      {blocks.map((block) => (
        <Fragment key={block.name}>
          <BlockDisplay name={block.name} />
          <BlocksStripeDivider />
        </Fragment>
      ))}
    </>
  );
}
