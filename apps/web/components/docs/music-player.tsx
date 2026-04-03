import React from "react";
import { DocsPageLayout } from "@/components/docs-page-layout";
import { readComponentSource } from "@/lib/source-code";
import { MusicPlayerPreview } from "@/components/docs/previews/music-player-preview";
import { MusicPlayer } from "@workspace/ui/components/music-player";

const importCode = `import { MusicPlayer } from "@/components/ui/music-player";`;

const defaultCode = `import { MusicPlayer } from "@/components/ui/music-player";

export default function Demo() {
  return (
    <MusicPlayer 
      src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      coverArt="https://i.scdn.co/image/ab67616d0000b27315ebbedaacef61af244262a8"
      className="w-full max-w-sm"
    />
  );
}`;

export async function MusicPlayerDocs() {
  const sourceCode =
    (await readComponentSource("music-player")) ||
    "// Unable to load source code";

  return (
    <DocsPageLayout
      title="Music Player"
      description="A playful circular audio player built to look like a spinning vinyl record with a swinging tonearm."
      preview={<MusicPlayerPreview />}
      previewCode={defaultCode}
      installPackageName="music-player"
      installDependencies="framer-motion"
      installSourceCode={sourceCode}
      installSourceFilename="components/ui/music-player.tsx"
      usageCode={defaultCode}
      props={[
        {
          name: "src",
          type: "string",
          description: "The source URL of the audio file or YouTube video to play.",
        },
        {
          name: "coverArt",
          type: "string",
          description: "The URL of the album cover image (used as record label and background).",
        },
        {
          name: "autoPlay",
          type: "boolean",
          default: "false",
          description: "Whether to auto-play the audio when the component mounts.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes to apply spacing or override styles.",
        },
      ]}
    />
  );
}
