"use client";

import { ComponentryLogomark } from "@/components/logos/componentry-logomark";

export default function OpenGraphPreviewPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#061942]">
      <section className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_92%_8%,#ffffff_0%,#d7dceb_16%,rgba(215,220,235,0)_36%),radial-gradient(circle_at_88%_88%,#bcc5e0_0%,rgba(188,197,224,0.58)_22%,rgba(188,197,224,0)_48%),radial-gradient(circle_at_16%_10%,#061942_0%,rgba(6,25,66,0.78)_30%,rgba(6,25,66,0)_56%),linear-gradient(125deg,#061942_0%,#0870e8_50%,#539cf2_78%,#8bc0fc_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(3,6,17,0.62),transparent_44%),radial-gradient(circle_at_42%_56%,rgba(3,6,17,0.26),transparent_34%),linear-gradient(90deg,rgba(3,6,17,0.24),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(3,6,17,0.42),transparent_24%)]" />

        <div className="absolute left-[104px] top-[120px] flex items-center gap-4 text-[38px] font-semibold leading-none tracking-[-0.045em] text-white">
          <div className="flex size-[46px] items-center justify-center">
            <ComponentryLogomark className="size-[46px] text-white drop-shadow-[0_18px_46px_rgba(255,255,255,0.2)]" />
          </div>
          Componentry
        </div>

        <div className="absolute left-[104px] top-[292px]">
          <h1 className="text-[80px] font-semibold leading-[0.96] tracking-[-0.055em] text-[#F6FCFF] drop-shadow-[0_20px_54px_rgba(3,6,17,0.42)]">
            Components &amp; Blocks
          </h1>
          <p className="mt-3 text-[43px] font-medium leading-none tracking-[-0.045em] text-white/78 drop-shadow-[0_14px_42px_rgba(3,6,17,0.28)]">
            animated, copy-paste React UI
          </p>
        </div>
      </section>
    </main>
  );
}
