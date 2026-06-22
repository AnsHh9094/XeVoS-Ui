"use client";

import { useEffect, useState } from "react";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import { CodeBlock } from "@/components/code-block";

interface LiveCodeBlockProps {
    defaultCode: string;
    lang?: string;
}

export function LiveCodeBlock({ defaultCode, lang = "tsx" }: LiveCodeBlockProps) {
    const { code } = usePlaygroundStore();
    const [displayCode, setDisplayCode] = useState(defaultCode);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Initialize store with default if empty
        usePlaygroundStore.getState().setCode(defaultCode);
    }, [defaultCode]);

    useEffect(() => {
        if (code) {
            setDisplayCode(code);
        }
    }, [code]);

    if (!isMounted) {
        return (
            <CodeBlock
                code={defaultCode}
                lang={lang}
                className="min-h-[200px] border-none !rounded-none !bg-transparent [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
            />
        );
    }

    return (
        <div className="relative group min-h-[200px]">
            <div className="absolute top-0 right-0 p-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-zinc-100/90 dark:bg-zinc-900/90 rounded-bl-md border-l border-b border-border">
                Real-time
            </div>
            <CodeBlock
                code={displayCode}
                lang={lang}
                className="min-h-[200px] border-none !rounded-none !bg-transparent [&_pre]:!overflow-x-auto [&_pre]:!overflow-y-hidden"
            />
        </div>
    );
}
