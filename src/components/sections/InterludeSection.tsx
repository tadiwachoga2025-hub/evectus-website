"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";

export function InterludeSection() {
  return (
    <section className="relative flex min-h-[600px] h-screen max-h-[900px] items-center overflow-hidden bg-[#14120f] text-white">
      {/* Full-bleed background image */}
      <Parallax amount={10}>
        <Image
          src="/evectus-tech-hq.png"
          alt="Evectus Solutions technology headquarters"
          fill
          sizes="100vw"
          className="scale-110 object-cover opacity-60"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/80" />

      {/* Top right tag */}
      <div className="absolute right-6 top-20 z-10 md:right-12 md:top-24 lg:right-20">
        <Reveal y={20}>
          <p className="text-right font-satoshi text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
            Interlude · No Cookie-Cutter Fixes
          </p>
        </Reveal>
      </div>

      {/* Center Statement */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="mr-auto max-w-[820px]">
          <Reveal y={24}>
            <h2 className="font-clash text-4xl font-bold leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">Built for the standard</span>
              <span className="block font-serif italic font-normal text-white/90 mt-1">
                Africa deserves.
              </span>
            </h2>
          </Reveal>

          <Reveal y={24} delay={0.15}>
            <p className="mt-8 max-w-[54ch] font-serif text-lg italic leading-relaxed text-white/85 sm:text-xl">
              Every engagement is engineered to global standards and grounded in local context — not templated software, not outsourced thinking, and not a slide deck that never ships.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom left attribution */}
      <div className="absolute bottom-10 left-6 z-10 md:left-12 lg:left-20">
        <Reveal y={0} delay={0.3}>
          <p className="font-satoshi text-[11px] font-bold uppercase tracking-[0.25em] text-white/60">
            — Shifting the Culture
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default InterludeSection;
