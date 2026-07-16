# Preview Media Upload Guide

This guide explains how to process and publish component preview media.

Each component preview now has three remote assets in Cloudflare R2:

```text
preview-videos/<category-folder>/<asset-name>.webm
preview-videos/<category-folder>/<asset-name>.mp4
preview-videos/<category-folder>/<asset-name>.webp
```

The `.webp` file is the static poster shown on `/docs`. The videos are only loaded when a user hovers or focuses a card. Do not commit generated poster images into `apps/web/public`; previews should be fetched from R2.

## Prerequisites
Ensure your Cloudflare R2 credentials are set in the `.env` file at the root of the project:
```env
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=xevos-ui
R2_PUBLIC_URL=https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev
```

## Workflow

1. **Record your video**: Create your screen recording for the component (e.g., `recording.mov`).
2. **Move to temporary folder**: Place the video file inside the `temporary/` folder at the root of the project.
3. **Configure the script**: Open `scripts/auto-upload-preview.py` and set the variables at the top of the file:
   ```python
   # ===========================================================================
   # EDIT THESE VARIABLES FOR EACH UPLOAD
   # ===========================================================================
   VIDEO_FILENAME = "main.mov"
   COMPONENT_SLUG = "cursor-driven-particle-typography" # e.g. "cursor-driven-particle-typography"
   # ===========================================================================
   ```
4. **Run the script**:
   ```bash
   ./scripts/venv/bin/python scripts/auto-upload-preview.py
   ```
5. **Verify the public poster URL**: The script prints the `Image:` URL. It must end in `.webp` and return `200`:
   ```bash
   curl -I https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/<category-folder>/<asset-name>.webp
   ```

## What the script does automatically
* Looks up the component in `apps/web/registry/index.ts` to figure out its category.
* Converts the original recording to optimized `WebM` and `MP4` formats, plus a `WebP` poster image.
* Uploads the optimized assets to Cloudflare R2.
* Updates the `previewVideo` field for your component directly inside `registry/index.ts`.
* Cleans up the generated files.

## URL convention

Only the `previewVideo` URL is stored in `apps/web/registry/index.ts`.

```ts
previewVideo:
  "https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/example.webm",
```

The `/docs` page derives the poster URL by replacing the video extension with `.webp`:

```text
https://pub-a50e7f4ea75a4970a1738e50d53b6eb1.r2.dev/preview-videos/component-animations/example.webp
```

Because of that, the poster must use the exact same path and base filename as the uploaded videos.

## If WebP generation fails

Some local `ffmpeg` builds cannot encode WebP. If the script prints a JPEG fallback or does not print an `.webp` `Image:` URL, convert the generated poster to WebP before upload and upload that `.webp` file to the same R2 prefix.

Example temporary conversion with Sharp CLI:

```bash
pnpm dlx sharp-cli -i temporary/.preview-upload-tmp/<asset-name>.jpg \
  -o temporary/.preview-upload-tmp \
  -f webp \
  -q 78
```

Then upload the resulting file as:

```text
preview-videos/<category-folder>/<asset-name>.webp
```

You're done when the `.webm`, `.mp4`, and `.webp` URLs all return `200`.
