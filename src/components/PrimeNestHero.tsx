"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/neon-button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Reveal } from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";

/**
 * Homepage hero — full-bleed image + bottom-anchored, left-aligned
 * messaging, staggered in on load. Text organization and stagger
 * cadence follow the reference pattern (eyebrow -> headline -> body ->
 * CTA row, each revealed in sequence, scroll cue fading in last).
 */
export function PrimeNestHero() {
  return (
    <section className="relative min-h-[640px] md:min-h-[760px] lg:min-h-[820px] w-full overflow-hidden flex flex-col justify-end bg-[#f2f2f2]">
      {/* Background Image */}
      <Parallax amount={8}>
        <Image
          src="/evectus-tech-hq.png"
          alt="Evectus Solutions technology innovation and strategic consulting headquarters at sunset"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </Parallax>

      {/* Dark overlay at top for navigation readability */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none z-10" />

      {/* Smooth gradient fade at bottom blending section into off-white (#f2f2f2) content below */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f2f2f2] via-[#f2f2f2]/80 to-transparent pointer-events-none z-10" />

      {/* Hero Content — bottom-anchored, left-aligned, staggered reveal */}
      <div className="relative z-20 w-full px-6 pb-28 pt-32 md:px-12 md:pb-36 lg:px-16">
        <div className="mr-auto max-w-[760px] lg:max-w-none">
          <Reveal y={20}>
            <span className="block font-satoshi text-xs font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">
              Evectus Solutions · Shifting The Culture
            </span>
          </Reveal>

          {/* Main Heading: Sans Bold Line 1 + Serif Italic Line 2 (Vertex AI device) */}
          <Reveal y={24} delay={0.1}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.04] tracking-tight drop-shadow-md sm:text-6xl lg:whitespace-nowrap lg:text-[4.2vw]">
              <span className="font-clash font-bold text-white">
                Find Your Superior
              </span>{" "}
              <span className="font-serif italic font-normal text-white/90">
                Solution Today
              </span>
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal y={24} delay={0.2}>
            <p className="mt-6 max-w-[56ch] font-satoshi text-lg md:text-xl text-white/80 font-normal leading-relaxed drop-shadow-sm">
              Discover high-performance digital transformation with Evectus Solutions — your trusted partner in building, scaling, and modernizing enterprise infrastructure.
            </p>
          </Reveal>

          {/* Call to Action — ink-filled primary + outline secondary */}
          <Reveal y={24} delay={0.3}>
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-3 md:gap-4">
              <Button asChild variant="light" size="lg">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/case-studies">View Our Work</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue — fades in last */}
      <Reveal
        y={0}
        delay={0.5}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <ScrollIndicator />
      </Reveal>
    </section>
  );
}

export default PrimeNestHero;
