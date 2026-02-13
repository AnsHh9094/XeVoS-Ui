#!/usr/bin/env bash
set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required but not installed."
  exit 1
fi

INPUT_DIR="${1:-}"

if [[ -z "$INPUT_DIR" ]]; then
  echo "Usage: $0 <input-directory-containing-.mov-files>"
  exit 1
fi

if [[ ! -d "$INPUT_DIR" ]]; then
  echo "Directory does not exist: $INPUT_DIR"
  exit 1
fi

echo "Optimizing .mov previews in: $INPUT_DIR"

shopt -s nullglob
FILES=("$INPUT_DIR"/*.mov)
if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No .mov files found in $INPUT_DIR"
  exit 0
fi

for input in "${FILES[@]}"; do
  base="${input%.mov}"
  webm="${base}.webm"
  mp4="${base}.mp4"
  poster="${base}.webp"

  echo "Processing: $(basename "$input")"

  # High-quality VP9 for smallest preview size at good visual fidelity.
  ffmpeg -y -i "$input" \
    -vf "scale='min(1280,iw)':-2:flags=lanczos,fps=30" \
    -an -c:v libvpx-vp9 -row-mt 1 -deadline good -cpu-used 2 -crf 32 -b:v 0 \
    "$webm"

  # Broad compatibility fallback.
  ffmpeg -y -i "$input" \
    -vf "scale='min(1280,iw)':-2:flags=lanczos,fps=30" \
    -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart \
    "$mp4"

  # Poster frame for future usage in cards if needed.
  ffmpeg -y -i "$input" \
    -vf "scale='min(1280,iw)':-2:flags=lanczos" \
    -frames:v 1 -q:v 85 \
    "$poster"
done

echo "Done. Generated .webm, .mp4, and .webp files."
