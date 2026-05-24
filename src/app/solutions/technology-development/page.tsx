"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const builds = [
  {
    n: "01",
    title: "Custom Enterprise Software",
    body: "ERP, HR platforms, and inventory systems designed for your specific workflow — not someone else's idea of best practice.",
  },
  {
    n: "02",
    title: "Mobile & Web Applications",
    body: "Customer-facing platforms with world-class UX that honors local user behavior.",
  },
  {
    n: "03",
    title: "Integration Architecture",
    body: "We make your disparate systems talk to each other, creating a unified ecosystem where data flows freely.",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node",
  "Postgres",
  "AWS",
  "GCP",
  "Docker",
  "Kubernetes",
  "Tailwind",
  "Python",
  "Go",
];

export default function TechnologyDevelopmentPage() {
  const inHouseRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: inHouseRef,
    offset: ["start end", "end start"],
  });
  const inHouseY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="03 · Technology Development"
          headline="If it doesn't exist, we build it."
          body="Off-the-shelf software often fails the specific nuances of African business challenges. Evectus Development creates tailored technology that fits like a glove."
        />

        {/* What we build */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">What We Build</span>
              <h2 className="h-section">
                Tailored systems. Engineered for context.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-px bg-black/10">
              {builds.map((b, i) => (
                <motion.div
                  key={b.n}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="bg-white p-10 lg:p-12 flex flex-col gap-4"
                >
                  <span className="label text-[#A3A3A3]">{b.n}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="body-md text-black/80">{b.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Built in-house */}
        <section
          ref={inHouseRef}
          className="relative bg-black text-white px-6 lg:px-10 py-24 md:py-32 overflow-hidden"
        >
          <motion.div
            style={{ y: inHouseY }}
            className="absolute inset-0 -top-[10%] h-[120%] pointer-events-none"
          >
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2000&q=80"
              alt="Engineers collaborating on code"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
            className="relative z-10 mx-auto max-w-[1440px] flex flex-col gap-8"
          >
            <span className="label text-white/70">Built In-House</span>
            <p className="text-3xl md:text-5xl font-bold tracking-tight max-w-4xl leading-tight">
              Every line of code is written by engineers who understand both the
              technical and cultural context of the work.
            </p>
          </motion.div>
        </section>

        {/* Stack */}
        <section className="bg-white px-6 lg:px-10 py-24">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-12 max-w-3xl"
            >
              <span className="label">The Stack</span>
              <h2 className="h-section">Tools we reach for.</h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {stack.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: EASE_OUT_QUART,
                  }}
                  className="border border-black/20 px-4 py-2 text-sm"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          headline="Request a build."
          body="Tell us what doesn't exist yet."
          ctaLabel="Request a Build"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
