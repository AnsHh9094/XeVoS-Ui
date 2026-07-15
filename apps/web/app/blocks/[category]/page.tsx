/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";

import { BlockDisplay } from "@/components/blocks/block-display";
import { BlocksStripeDivider } from "@/components/blocks/blocks-list-decor";
import { BlocksNav } from "@/components/blocks/blocks-nav";
import { getAllBlocks } from "@/lib/blocks/registry";
import categories from "@/registry/generated/block-categories.json";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const item = categories.find((candidate) => candidate.name === category);

  if (!item) return {};

  return {
    title: `${item.title} Blocks | Xevos UI`,
    description: item.description,
  };
}

export default async function BlocksCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const item = categories.find((candidate) => candidate.name === category);

  if (!item) notFound();

  const blocks = getAllBlocks([category]);

  return (
    <>
      <BlocksNav active={category} />

      {blocks.map((block) => (
        <Fragment key={block.name}>
          <BlockDisplay name={block.name} />
          <BlocksStripeDivider />
        </Fragment>
      ))}
    </>
  );
} 
