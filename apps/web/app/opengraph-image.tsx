import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fafafa",
          position: "relative",
          overflow: "hidden",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginTop: 80,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="380 350 500 520"
            width={76}
            height={78}
          >
            <g fill="#09090b">
              <path d="M493 376 C467 383 448 394 430 411 C417 432 409 454 409 460 L409 749 C414 769 421 785 431 800 C447 816 464 827 478 833 C489 836 501 838 586 838 C603 828 610 817 610 813 L610 695 C610 651 584 614 543 600 C531 596 525 591 525 584 C525 576 531 571 544 567 C586 554 610 519 610 474 L610 401 C610 389 601 379 589 376 Z" />
              <rect x="634" y="376" width="210" height="206" rx="42" />
              <rect x="634" y="633" width="210" height="205" rx="42" />
            </g>
          </svg>

          <span
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#09090b",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            Componentry
          </span>
        </div>

        <span
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "#52525b",
            marginTop: 20,
            letterSpacing: "-0.01em",
          }}
        >
          Premium React UI Components
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: "auto",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: "#52525b" }}>
            Open source
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#a1a1aa" }}>
            ·
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#52525b" }}>
            Copy &amp; paste
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#a1a1aa" }}>
            ·
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#52525b" }}>
            Fully customizable
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
