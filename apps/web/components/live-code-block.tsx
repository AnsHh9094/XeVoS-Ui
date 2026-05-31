"use client";

import { useEffect, useState } from "react";
import { usePlaygroundStore } from "@/hooks/use-playground-store";
import { CopyButton } from "@/components/copy-button";

interface LiveCodeBlockProps {
    defaultCode: string;
    lang?: string;
}

export function LiveCodeBlock({ defaultCode, lang = "tsx" }: LiveCodeBlockProps) {
    const { code } = usePlaygroundStore();
    const [displayCode, setDisplayCode] = useState(defaultCode);
    const [html, setHtml] = useState("");
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

    useEffect(() => {
        let active = true;
        const fetchHtml = async () => {
            try {
                const response = await fetch("/api/docs/source", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: displayCode, lang }),
                });
                if (!response.ok) return;
                const data = await response.json();
                if (active && data.html) {
                    setHtml(data.html);
                }
            } catch (e) {
                console.error("Failed to fetch highlighted code", e);
            }
        };
        fetchHtml();
        return () => { active = false; };
    }, [displayCode, lang]);

    if (!isMounted) {
        return (
            <div className="relative text-sm w-full border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 rounded-xl min-h-[200px]">
                <div className="h-full flex items-center justify-center p-4">
                    <pre className="text-muted-foreground w-full overflow-x-auto"><code>{defaultCode}</code></pre>
                </div>
            </div>
        );
    }

    return (
        <div className="relative text-sm w-full border border-border overflow-hidden bg-zinc-100 dark:bg-zinc-900/50 rounded-xl min-h-[200px] flex flex-col" data-code-block>
            <CopyButton code={displayCode.trim()} />
            <div
                className="flex-1 min-h-[200px] [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:!overflow-y-hidden overflow-auto"
                dangerouslySetInnerHTML={{ __html: html || `<pre><code>${displayCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>` }}
            />
        </div>
    );
}
