import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "apps/web/public/opengraph-image.png");
const targetUrl = process.argv[2] ?? "http://localhost:3000/og-preview";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

await page.goto(targetUrl, { waitUntil: "networkidle" });
await page.addStyleTag({
  content: `
    nextjs-portal,
    [data-nextjs-dev-overlay],
    [data-nextjs-toast],
    [data-next-badge-root] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
  `,
});
await page.evaluate(() => {
  document
    .querySelectorAll("nextjs-portal, [data-next-badge-root]")
    .forEach((node) => node.remove());
});
await page.waitForTimeout(1800);
await page.screenshot({ path: outputPath, type: "png" });
await browser.close();

console.log(`Generated ${outputPath}`); 
