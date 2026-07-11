import { ImageResponse } from 'next/og';
import { getComponent } from '@/registry';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const component = getComponent(slug);
  const title = component?.title ?? slug;

  const titleFontSize =
    title.length > 22 ? 72 : title.length > 16 ? 88 : title.length > 10 ? 100 : 110;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#fafafa',
          position: 'relative',
        }}
      >
        {/* Layout lines */}
        <div style={{ position: 'absolute', left: 64, top: 0, bottom: 0, width: 1, backgroundColor: '#e4e4e7', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 64, top: 0, bottom: 0, width: 1, backgroundColor: '#e4e4e7', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 64, left: 0, right: 0, height: 1, backgroundColor: '#e4e4e7', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 64, left: 0, right: 0, height: 1, backgroundColor: '#e4e4e7', display: 'flex' }} />

        {/* Corner dots */}
        <div style={{ position: 'absolute', left: 61, top: 61, width: 7, height: 7, backgroundColor: '#d4d4d8', borderRadius: '50%', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 61, top: 61, width: 7, height: 7, backgroundColor: '#d4d4d8', borderRadius: '50%', display: 'flex' }} />
        <div style={{ position: 'absolute', left: 61, bottom: 61, width: 7, height: 7, backgroundColor: '#d4d4d8', borderRadius: '50%', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 61, bottom: 61, width: 7, height: 7, backgroundColor: '#d4d4d8', borderRadius: '50%', display: 'flex' }} />

        {/* Top-left: small logo (below the top line) */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="380 350 500 520"
            width={28}
            height={29}
          >
            <g fill="#09090b">
              <path d="M493 376 C467 383 448 394 430 411 C417 432 409 454 409 460 L409 749 C414 769 421 785 431 800 C447 816 464 827 478 833 C489 836 501 838 586 838 C603 828 610 817 610 813 L610 695 C610 651 584 614 543 600 C531 596 525 591 525 584 C525 576 531 571 544 567 C586 554 610 519 610 474 L610 401 C610 389 601 379 589 376 Z" />
              <rect x="634" y="376" width="210" height="206" rx="42" />
              <rect x="634" y="633" width="210" height="205" rx="42" />
            </g>
          </svg>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#a1a1aa',
              letterSpacing: '0.05em',
            }}
          >
            COMPONENTRY
          </span>
        </div>

        {/* Component title */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            right: 80,
            bottom: 100,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontFamily: 'monospace',
              marginBottom: 16,
            }}
          >
            Component
          </span>
          <h1
            style={{
              fontSize: titleFontSize,
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.05em',
              fontFamily: 'sans-serif',
              fontWeight: 900,
              color: '#000000',
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    { ...size },
  );
}
