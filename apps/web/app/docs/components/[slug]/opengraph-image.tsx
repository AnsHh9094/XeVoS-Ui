import { ImageResponse } from "next/og";
import { getComponent } from "@/registry";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

const white = "#ffffff";
const ice = "#F6FCFF";
const fontSans = "Albert Sans, Arial, sans-serif";
const albertSans500 = fetch(
  "https://fonts.gstatic.com/s/albertsans/v4/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHmZP_rA.ttf",
).then((res) => res.arrayBuffer());
const albertSans600 = fetch(
  "https://fonts.gstatic.com/s/albertsans/v4/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHdZT_rA.ttf",
).then((res) => res.arrayBuffer());

function Mark({ size = 46 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="380 350 500 520"
      width={size}
      height={size}
    >
      <g fill="currentColor">
        <path d="M493 376 C467 383 448 394 430 411 C417 432 409 454 409 460 L409 749 C414 769 421 785 431 800 C447 816 464 827 478 833 C489 836 501 838 586 838 C603 828 610 817 610 813 L610 695 C610 651 584 614 543 600 C531 596 525 591 525 584 C525 576 531 571 544 567 C586 554 610 519 610 474 L610 401 C610 389 601 379 589 376 Z" />
        <rect x="634" y="376" width="210" height="206" rx="42" />
        <rect x="634" y="633" width="210" height="205" rx="42" />
      </g>
    </svg>
  );
}

function getTitleFontSize(title: string) {
  if (title.length > 28) return 64;
  if (title.length > 22) return 70;
  if (title.length > 18) return 76;
  return 80;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const component = getComponent(slug);
  const title = component?.title ?? slug;
  const category = component?.category ?? "Component";
  const titleFontSize = getTitleFontSize(title);
  const [fontMedium, fontSemibold] = await Promise.all([
    albertSans500,
    albertSans600,
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#061942",
        fontFamily: fontSans,
        backgroundImage:
          "radial-gradient(circle at 92% 8%, #ffffff 0%, #d7dceb 16%, rgba(215,220,235,0) 36%), radial-gradient(circle at 88% 88%, #bcc5e0 0%, rgba(188,197,224,0.58) 22%, rgba(188,197,224,0) 48%), radial-gradient(circle at 16% 10%, #061942 0%, rgba(6,25,66,0.78) 30%, rgba(6,25,66,0) 56%), linear-gradient(125deg, #061942 0%, #0870e8 50%, #539cf2 78%, #8bc0fc 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at 18% 20%, rgba(3,6,17,0.62), transparent 44%), radial-gradient(circle at 42% 56%, rgba(3,6,17,0.26), transparent 34%), linear-gradient(90deg, rgba(3,6,17,0.24), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at 12% 22%, rgba(3,6,17,0.42), transparent 24%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 104,
          top: 120,
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: white,
          fontFamily: fontSans,
          fontSize: 38,
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: "-0.045em",
        }}
      >
        <span
          style={{
            width: 46,
            height: 46,
            color: white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Mark size={46} />
        </span>
        Componentry
      </div>

      <div
        style={{
          position: "absolute",
          left: 104,
          top: 292,
          width: 920,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            marginBottom: 14,
            color: "rgba(255,255,255,0.68)",
            fontFamily: fontSans,
            fontSize: 30,
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.035em",
          }}
        >
          {category}
        </div>
        <div
          style={{
            color: ice,
            fontFamily: fontSans,
            fontSize: titleFontSize,
            fontWeight: 600,
            lineHeight: 0.96,
            letterSpacing: "-0.055em",
          }}
        >
          {title}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Albert Sans",
          data: fontMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Albert Sans",
          data: fontSemibold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
