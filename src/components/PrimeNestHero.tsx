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
      {/* Background Image — client-supplied.
          A boardroom mid-session, high floor, city beyond the glass. Chosen over
          the previous dusk skyline because it shows the work rather than the
          setting, and it carries no cloud.
          Source is square (2000x2000); the hero is a wide band, so object-cover
          shows roughly the middle 43% — the faces, laptops and table. The
          out-of-focus figure at lower left is what the headline sits on. */}
      <Parallax amount={8}>
        <Image
          src="/hero-boardroom.jpg"
          alt="A strategy session in a high-rise boardroom, colleagues around a long table with laptops and documents, the city visible through floor-to-ceiling windows"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </Parallax>

      {/* Two edge scrims only, each doing one job, so the middle of the frame
          stays clean. The previous pass ran a full-height from-black/70 wash
          across 85% of the width — needed for the dusk photo's bright orange
          horizon, but on this darker image it just muddies the whole picture. */}

      {/* Top: the nav is transparent over the hero and this image is brightest
          at the top (windows), so white nav links need help here. */}
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none z-10" />

      {/* Left: the headline runs to roughly 70% of the width, and its right half
          crosses the brightest part of the frame — the lit table and laptops.
          Tested by compositing the real crop with the real type: without this,
          "Solution Today" sat on near-white. Stops at 72% so the far right of
          the photograph stays untouched. */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[72%] bg-gradient-to-r from-black/45 to-transparent pointer-events-none z-10" />

      {/* Bottom: darkens the band the headline, subtitle and CTAs occupy. */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/85 via-black/42 to-transparent pointer-events-none z-10" />

      {/* No bottom fade. A `from-[#f2f2f2]` gradient used to rise 12rem up the
          frame to blend into the paper section below, but it read as milky fog
          sitting over the lower half of the photo. A clean edge between the
          image and the paper band is sharper and reads as intentional. */}

      {/* Hero Content — bottom-anchored, left-aligned, staggered reveal */}
      {/* Bottom-anchored (the section is justify-end), so pb- is what lifts the
          block. It also clears the h-48 paper fade, which the old pb-28 sat
          inside — the copy was washing out against the gradient. */}
      <div className="relative z-20 w-full px-6 pb-40 pt-32 md:px-12 md:pb-48 lg:px-16">
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
