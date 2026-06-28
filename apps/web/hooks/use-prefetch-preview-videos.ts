"use client";

import { useEffect } from "react";
import { components } from "@/registry";

let preferredFormat: "webm" | "mp4" | null = null;

function detectFormat(): "webm" | "mp4" {
  if (preferredFormat) return preferredFormat;
  if (typeof document === "undefined") return "mp4";
  const probe = document.createElement("video");
  const supportsWebm = Boolean(
    probe.canPlayType('video/webm; codecs="vp9,opus"'),
  );
  preferredFormat = supportsWebm ? "webm" : "mp4";
  return preferredFormat;
}

function getVideoUrl(previewVideo: string): string | null {
  const match = previewVideo.match(/^(.*)\.(mov|mp4|webm)(\?.*)?$/i);
  if (!match) return null;
  const [, base, , query = ""] = match;
  const fmt = detectFormat();
  return `${base}.${fmt}${query}`;
}

const prefetched = new Set<string>();

/**
 * Prefetch all preview video URLs using `<link rel="prefetch">`.
 * These are fetched at the browser's lowest priority using idle bandwidth,
 * so they won't block or slow down anything on the current page.
 * Once cached, they load instantly on /docs.
 */
export function usePrefetchPreviewVideos() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Small delay to let the current page fully settle first
    const timeoutId = setTimeout(() => {
      const urls: string[] = [];
      for (const comp of Object.values(components)) {
        if (!comp.previewVideo) continue;
        const url = getVideoUrl(comp.previewVideo);
        if (url && !prefetched.has(url)) {
          urls.push(url);
          prefetched.add(url);
        }
      }

      // Inject prefetch links in small batches to avoid flooding
      let i = 0;
      const batchSize = 3;
      const interval = setInterval(() => {
        const batch = urls.slice(i, i + batchSize);
        if (batch.length === 0) {
          clearInterval(interval);
          return;
        }
        for (const url of batch) {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "video";
          link.href = url;
          // Keep prefetch in no-cors mode so public R2 assets without ACAO
          // headers don't fail with console CORS errors.
          document.head.appendChild(link);
        }
        i += batchSize;
      }, 200); // stagger batches by 200ms

      return () => clearInterval(interval);
    }, 2000); // wait 2s after mount so the hero fully loads first

    return () => clearTimeout(timeoutId);
  }, []);
}
