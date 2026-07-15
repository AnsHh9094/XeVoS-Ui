/**
 * XeVoS UI — https://github.com/AnsHh9094/XeVoS-Ui
 * Copyright (c) 2026 Anand Ansh (AnsHh9094)
 * SPDX-License-Identifier: MIT
 * This notice must be retained in all copies or substantial portions (MIT License).
 */
import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
  type BundledTheme,
} from "shiki";

// Singleton pattern - cache the highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null;

// Pre-load only the languages we actually use
const LANGS: BundledLanguage[] = ["tsx", "typescript", "bash", "json"];
const THEMES: BundledTheme[] = ["github-light", "github-dark", "dark-plus"];

/**
 * Get or create a cached Shiki highlighter instance.
 * This is a CRITICAL performance optimization - creating a highlighter
 * is expensive (~200-500ms), so we only do it once.
 */
export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: THEMES,
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

/**
 * Shared HTML cache for code blocks.
 * In development, this provides instant re-renders.
 * In production, this works alongside Next.js page caching.
 */
const htmlCache = new Map<string, string>();

/**
 * Highlight code with caching.
 * Uses a content-addressable cache key to avoid redundant highlighting.
 */
export async function highlightCode(
  code: string,
  lang: BundledLanguage = "tsx",
  options: {
    lightTheme?: BundledTheme;
    darkTheme?: BundledTheme;
  } = {},
): Promise<string> {
  const lightTheme = options.lightTheme ?? "github-light";
  const darkTheme = options.darkTheme ?? "github-dark";
  const cacheKey = `${lang}:${lightTheme}:${darkTheme}:${code}`;

  const cached = htmlCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const highlighter = await getHighlighter();

  const html = highlighter.codeToHtml(code.trim(), {
    lang,
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    transformers: [
      {
        name: "line-numbers",
        code(node) {
          if (!node.properties.class) node.properties.class = "";
          node.properties.class += " grid counter-reset-line";
        },
        line(node, line) {
          node.properties["data-line"] = line;
        },
      },
    ],
  });

  // Cache the result (limit cache size to prevent memory issues)
  if (htmlCache.size > 500) {
    // Clear oldest entries (simple LRU approximation)
    const firstKey = htmlCache.keys().next().value;
    if (firstKey) htmlCache.delete(firstKey);
  }
  htmlCache.set(cacheKey, html);

  return html;
} 
