"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/components/ui/Reveal";

// Was a 12th local copy of [0.22, 1, 0.36, 1]. It shipped on nine pages, each
// directly above a CTABanner animating on the shared curve — so a single scroll
// ran two different easings. Now both use EASE.
const EASE_OUT_QUART = EASE;

export default function PageHero({
  label,
  headline,
  body,
  imageSrc = "/hero-team.jpg",
  imageAlt = "Evectus team collaborating on business growth",
}: {
  label: string;
  headline: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative flex min-h-[480px] flex-col justify-end overflow-hidden bg-neutral-900 text-white md:min-h-[580px] lg:min-h-[640px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />

      <div className="relative z-10 w-full px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40 lg:px-20">
        <div className="mr-auto max-w-[820px]">
          <motion.p
            className="text-xs uppercase tracking-widest text-white/90 drop-shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
          >
            {label}
          </motion.p>
          <motion.h1
            className="mt-6 font-serif text-[2.4rem] font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl drop-shadow-md"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT_QUART, delay: 0.1 }}
          >
            {headline}
          </motion.h1>
          {body && (
            <motion.p
              className="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/80 md:text-xl drop-shadow-sm"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: EASE_OUT_QUART,
                delay: 0.2,
              }}
            >
              {body}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
