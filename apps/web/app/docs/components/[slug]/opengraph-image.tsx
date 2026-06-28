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
          backgroundColor: '#060606',
          position: 'relative',
          padding: 0,
        }}
      >
        {/* Subtle dot grid texture */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            display: 'flex',
          }}
        />

        {/* Vignette — fades grid toward edges */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(ellipse 75% 75% at 50% 55%, transparent 40%, #060606 100%)',
            display: 'flex',
          }}
        />

        {/* 45° hatching in the 4 outer border strips */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 64, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 7px)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 64, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 7px)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 64, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 7px)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 64, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 7px)', display: 'flex' }} />

        {/* The 4 layout lines */}
        <div style={{ position: 'absolute', left: 64, top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 64, top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 64, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 64, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex' }} />

        {/* Content box */}
        <div
          style={{
            position: 'absolute',
            top: 65,
            bottom: 65,
            left: 65,
            right: 65,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 52,
          }}
        >
          {/* Top: logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg viewBox="120 120 272 272" width={28} height={28}>
              <path fill="#ffffff" d="M120 160Q120 120 160 120H260Q300 120 300 160V220H352Q392 220 392 260V352Q392 392 352 392H260Q220 392 220 352V292H160Q120 292 120 252Z" />
            </svg>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: '#ffffff',
                fontFamily: 'sans-serif',
                letterSpacing: '0.025em',
              }}
            >
              COMPONENTRY
            </span>
          </div>

          {/* Middle: empty */}
          <div style={{ display: 'flex' }} />

          {/* Bottom: label + component name */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <span
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                fontFamily: 'monospace',
                marginBottom: 20,
              }}
            >
              Component
            </span>
            <h1
              style={{
                fontSize: titleFontSize,
                margin: 0,
                lineHeight: 1.1,
                paddingBottom: '0.15em',
                letterSpacing: '-0.05em',
                fontFamily: 'sans-serif',
                fontWeight: 900,
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 50%, #ffffff 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* Intersection dots */}
        <div style={{ position: 'absolute', left: 61, top: 61, width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: '50%', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 61, top: 61, width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: '50%', display: 'flex' }} />
        <div style={{ position: 'absolute', left: 61, bottom: 61, width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: '50%', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 61, bottom: 61, width: 7, height: 7, backgroundColor: '#FFFFFF', borderRadius: '50%', display: 'flex' }} />
      </div>
    ),
    { ...size },
  );
}
