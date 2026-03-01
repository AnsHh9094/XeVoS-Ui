# Preview Video Upload Guide

This guide explains how to use the automated preview video uploader to process and publish new component previews.

## Prerequisites
Ensure your Cloudflare R2 credentials are set in the `.env` file at the root of the project:
```env
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=componentry
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

## What the script does automatically
* Looks up the component in `apps/web/registry/index.ts` to figure out its category.
* Converts the original recording to optimized `WebM` and `MP4` formats, plus a `WebP` poster image.
* Uploads the optimized assets to Cloudflare R2.
* Updates the `previewVideo` field for your component directly inside `registry/index.ts`.
* Cleans up the generated files.

You're done! Your new preview video will now show up automatically in the documentation.
