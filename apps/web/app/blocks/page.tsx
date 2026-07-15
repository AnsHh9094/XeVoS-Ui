/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type { Metadata } from "next";
import { Fragment } from "react";

import { BlockDisplay } from "@/components/blocks/block-display";
import { BlocksStripeDivider } from "@/components/blocks/blocks-list-decor";
import { BlocksNav } from "@/components/blocks/blocks-nav";
import { getAllBlocks } from "@/lib/blocks/registry";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blocks | Xevos UI",
  description:
    "Production-ready Xevos UI blocks with live previews, source code, themes, and shadcn install commands.",
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
