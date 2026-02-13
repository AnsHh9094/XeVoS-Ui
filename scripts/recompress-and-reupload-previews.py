#!/usr/bin/env python3
import argparse
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path
from typing import Iterable
from urllib.parse import urlparse

import boto3


ACCOUNT_ID = "eb98cc3f8d05e09105f9f8acc3e35e3f"
ACCESS_KEY_ID = "808c4b20493b1970fe20d97055cb65e2"
SECRET_ACCESS_KEY = "ebc2997bd62847e21eb54f7224101c1c8006d0036c3220854afb0f972e2deaf0"
BUCKET_NAME = "componentry"

REPO_ROOT = Path(__file__).resolve().parent.parent
REGISTRY_FILE = REPO_ROOT / "apps/web/registry/index.ts"
WORK_DIR = REPO_ROOT / "apps/web/public/preview-videos-recompress"
DOWNLOADS_DIR = WORK_DIR / "downloads"


def get_r2_client():
    return boto3.client(
        "s3",
        endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",
        aws_access_key_id=ACCESS_KEY_ID,
        aws_secret_access_key=SECRET_ACCESS_KEY,
    )


def parse_registry_urls(registry_file: Path) -> list[str]:
    content = registry_file.read_text(encoding="utf-8")
    pattern = r"https://pub-[^\"']+?/preview-videos/[^\"']+?\.mov(?:\?[^\"']+)?"
    urls = sorted(set(re.findall(pattern, content)))
    return urls


def download_file(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(url) as response, destination.open("wb") as out_file:
        shutil.copyfileobj(response, out_file)


def run_ffmpeg(input_path: Path, output_path: Path, args: Iterable[str]) -> None:
    cmd = ["ffmpeg", "-y", "-i", str(input_path), *args, str(output_path)]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def convert_media(input_mov: Path) -> tuple[Path, Path, Path | None]:
    base = input_mov.with_suffix("")
    webm = base.with_suffix(".webm")
    mp4 = base.with_suffix(".mp4")
    webp = base.with_suffix(".webp")
    jpg = base.with_suffix(".jpg")

    # Preview cards benefit from low decode cost and short clip durations.
    # Keeping these aggressively compressed gives faster first frame and hover start.
    common_video_filters = "scale='min(720,iw)':-2:flags=lanczos,fps=24"
    max_preview_seconds = "6"

    run_ffmpeg(
        input_mov,
        webm,
        [
            "-t",
            max_preview_seconds,
            "-vf",
            common_video_filters,
            "-an",
            "-c:v",
            "libvpx-vp9",
            "-row-mt",
            "1",
            "-deadline",
            "good",
            "-cpu-used",
            "4",
            "-crf",
            "38",
            "-b:v",
            "0",
            "-g",
            "48",
        ],
    )
    run_ffmpeg(
        input_mov,
        mp4,
        [
            "-t",
            max_preview_seconds,
            "-vf",
            common_video_filters,
            "-an",
            "-c:v",
            "libx264",
            "-preset",
            "veryfast",
            "-crf",
            "30",
            "-pix_fmt",
            "yuv420p",
            "-g",
            "48",
            "-keyint_min",
            "48",
            "-movflags",
            "+faststart",
        ],
    )
    try:
        run_ffmpeg(
            input_mov,
            webp,
            [
                "-vf",
                "scale='min(1280,iw)':-2:flags=lanczos",
                "-frames:v",
                "1",
                "-q:v",
                "85",
            ],
        )
    except subprocess.CalledProcessError:
        webp = None

    poster: Path | None = webp
    if poster is None:
        try:
            run_ffmpeg(
                input_mov,
                jpg,
                [
                    "-vf",
                    "scale='min(1280,iw)':-2:flags=lanczos",
                    "-frames:v",
                    "1",
                    "-q:v",
                    "4",
                ],
            )
            poster = jpg
        except subprocess.CalledProcessError:
            poster = None

    return webm, mp4, poster


def content_type_for(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix == ".webm":
        return "video/webm"
    if suffix == ".mp4":
        return "video/mp4"
    if suffix == ".webp":
        return "image/webp"
    if suffix == ".jpg" or suffix == ".jpeg":
        return "image/jpeg"
    return "application/octet-stream"


def upload_file(client, local_path: Path, object_key: str) -> None:
    client.upload_file(
        str(local_path),
        BUCKET_NAME,
        object_key,
        ExtraArgs={
            "ContentType": content_type_for(local_path),
            "CacheControl": "public, max-age=31536000, immutable",
        },
    )

def download_from_r2(client, object_key: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    client.download_file(BUCKET_NAME, object_key, str(destination))


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download .mov previews from registry URLs, convert, upload optimized media, and delete old .mov files."
    )
    parser.add_argument("--work-dir", default=str(WORK_DIR))
    parser.add_argument("--skip-delete", action="store_true")
    args = parser.parse_args()

    work_dir = Path(args.work_dir).resolve()
    downloads_dir = work_dir / "downloads"
    downloads_dir.mkdir(parents=True, exist_ok=True)

    urls = parse_registry_urls(REGISTRY_FILE)
    if not urls:
        print("No .mov preview URLs found in registry.")
        return 1

    print(f"Found {len(urls)} .mov URLs in registry.")
    s3 = get_r2_client()

    success = 0
    failed = 0
    for i, url in enumerate(urls, start=1):
        try:
            parsed = urlparse(url)
            key_mov = parsed.path.lstrip("/")
            local_mov = downloads_dir / key_mov

            print(f"[{i}/{len(urls)}] Downloading {key_mov}")
            try:
                download_file(url, local_mov)
            except Exception:
                print(f"[{i}/{len(urls)}] Public URL blocked, falling back to authenticated R2 download")
                download_from_r2(s3, key_mov, local_mov)

            print(f"[{i}/{len(urls)}] Converting {key_mov}")
            webm, mp4, poster = convert_media(local_mov)

            key_base = key_mov[: -len(".mov")]
            key_webm = f"{key_base}.webm"
            key_mp4 = f"{key_base}.mp4"
            print(f"[{i}/{len(urls)}] Uploading {key_webm}, {key_mp4}")
            upload_file(s3, webm, key_webm)
            upload_file(s3, mp4, key_mp4)
            if poster:
                poster_suffix = poster.suffix.lower()
                key_poster = f"{key_base}{poster_suffix}"
                upload_file(s3, poster, key_poster)

            if not args.skip_delete:
                print(f"[{i}/{len(urls)}] Deleting old {key_mov}")
                s3.delete_object(Bucket=BUCKET_NAME, Key=key_mov)

            try:
                local_mov.unlink()
            except OSError:
                pass

            success += 1
        except Exception as exc:
            failed += 1
            print(f"[{i}/{len(urls)}] FAILED for {url}: {exc}")

    print(f"Done. Successful: {success}, Failed: {failed}")
    print(f"Working files are in: {downloads_dir}")
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
