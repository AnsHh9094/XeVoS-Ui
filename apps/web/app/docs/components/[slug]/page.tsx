import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getComponent } from "@/registry";
import { getDocsImporter, getDocsSlugs } from "@/components/docs/lazy-registry";
import { DocsPageLayout } from "@/components/docs-page-layout";

// -----------------------------------------------------------------------------
// PERFORMANCE OPTIMIZATIONS:
// 1. generateStaticParams - Pre-builds ALL component pages at build time
// 2. Lazy imports - Only loads the specific component being viewed
// 3. Suspense - Allows streaming for heavy content
// -----------------------------------------------------------------------------

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

/**
 * Pre-generate all component pages at build time.
 * This is THE most important optimization - pages are served as static HTML.
 */
export async function generateStaticParams() {
    const slugs = getDocsSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const component = getComponent(params.slug);

    if (!component) {
        return {};
    }

    return {
        title: `${component.title} Component`,
        description: component.description,
        alternates: {
            canonical: `https://componentry.fun/docs/components/${component.slug}`,
        },
    };
}

// Loading skeleton for docs page
function DocsPageSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row w-full h-full min-h-screen lg:h-screen bg-[#f3f4f6] dark:bg-[#080808] overflow-hidden">
            {/* Left Column: Scrollable Content Skeleton */}
            <div className="w-full lg:basis-1/2 lg:max-w-1/2 h-full flex flex-col relative z-20 bg-[#f3f4f6] dark:bg-[#080808]">
                {/* Gradients */}
                <div className="absolute top-0 left-0 right-0 z-30 h-32 bg-gradient-to-b from-[#f3f4f6] via-[#f3f4f6]/95 to-transparent dark:from-[#080808] dark:via-[#080808]/95 pointer-events-none backdrop-blur-[1px]" />

                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="px-8 lg:px-16 pt-32 lg:pt-48 pb-40 space-y-20 max-w-3xl mx-auto w-full animate-pulse">

                        {/* Header Section */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <div className="h-12 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                                <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
                                <div className="h-6 w-2/3 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg" />
                            </div>
                        </div>

                        {/* Installation Section */}
                        <div className="space-y-6">
                            <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="h-16 w-full bg-zinc-200 dark:bg-zinc-800/30 rounded-xl" />
                        </div>

                        {/* Usage Section */}
                        <div className="space-y-6">
                            <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                            <div className="h-48 w-full bg-zinc-200 dark:bg-zinc-800/30 rounded-xl border border-zinc-200 dark:border-zinc-800" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Preview Skeleton */}
            <div className="flex-1 lg:basis-1/2 lg:max-w-1/2 lg:h-full lg:sticky lg:top-0 order-first lg:order-last bg-[#f3f4f6] dark:bg-[#080808] flex flex-col z-10">
                <div className="relative w-full h-[400px] lg:h-full p-4 lg:pt-3 lg:pb-3 lg:pr-3 lg:pl-1.5 overflow-hidden">
                    <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800/20 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

// Async component that loads the docs component
async function DocsContent({ slug }: { slug: string }) {
    const importer = getDocsImporter(slug);

    if (!importer) {
        return null;
    }

    // Dynamically import the component
    const docModule = await importer();
    const DocsComponent = "default" in docModule ? docModule.default : null;

    if (!DocsComponent) {
        return null;
    }

    return <DocsComponent />;
}

export default async function ComponentPage(props: PageProps) {
    const params = await props.params;
    const component = getComponent(params.slug);

    if (!component) {
        return notFound();
    }

    const importer = getDocsImporter(params.slug);

    // If we have a dedicated docs component, render it with Suspense
    if (importer) {
        return (
            <Suspense fallback={<DocsPageSkeleton />}>
                <DocsContent slug={params.slug} />
            </Suspense>
        );
    }

    // Fallback for components without dedicated docs
    return (
        <DocsPageLayout
            title={component.title}
            description={component.description}
            installPackageName={component.slug}
            preview={
                <div className="border border-border rounded-xl p-12 flex flex-col justify-center items-center bg-muted/20 min-h-[350px] gap-4">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium">{component.title} Preview</h3>
                        <p className="text-sm text-muted-foreground">
                            Component preview will appear here.
                        </p>
                    </div>
                </div>
            }
            previewCode="// Preview code coming soon"
            usageCode="// Usage examples coming soon"
            examples={[]}
            props={[]}
        />
    );
}
