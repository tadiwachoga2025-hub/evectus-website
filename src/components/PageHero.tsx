"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_QUART },
  },
};

export default function PageHero({
  label,
  headline,
  body,
  imageSrc = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=80",
  imageAlt = "",
}: {
  label: string;
  headline: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const words = headline.split(" ");
  // Approximate end of headline stagger: delayChildren (0.1) + words * stagger (0.05) + word duration (0.7)
  const bodyDelay = 0.1 + words.length * 0.05 + 0.2;

  return (
    <section className="relative bg-black text-white pt-40 pb-28 px-6 lg:px-10 overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] flex flex-col gap-6">
        <motion.span
          className="label text-white/70"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
        >
          {label}
        </motion.span>
        <motion.h1
          className="h-hero max-w-5xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              variants={word}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>
        {body && (
          <motion.p
            className="body-lg max-w-2xl text-white/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: EASE_OUT_QUART,
              delay: bodyDelay,
            }}
          >
            {body}
          </motion.p>
        )}
      </div>
    </section>
  );
}
