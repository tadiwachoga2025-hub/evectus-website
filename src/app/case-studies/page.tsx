"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { CountUp } from "@/components/ui/count-up";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const stats = [
  { v: "5", l: "Products Shipped" },
  { v: "100%", l: "On-Time Delivery" },
  { v: "95%", l: "Milestone Hit-Rate" },
  { v: "100%", l: "Partner Retention" },
];

const caseOneMeta = [
  { k: "SECTOR", v: "Education Technology" },
  { k: "SOLUTION", v: "AI-powered teacher portal with report card generation" },
  { k: "OUTCOME", v: "Automated 80% of manual admin work for teachers" },
];

const caseTwoMeta = [
  { k: "SECTOR", v: "Legal Technology" },
  { k: "SOLUTION", v: "Full-stack case & practice management system" },
  { k: "OUTCOME", v: "Unified case tracking, billing, and document management" },
];

const caseThreeMeta = [
  { k: "SECTOR", v: "Faith & Media Streaming" },
  { k: "SOLUTION", v: "Live streaming platform for ministries and congregations" },
  { k: "OUTCOME", v: "Global reach with sub-2s stream latency" },
];

export default function CaseStudiesPage() {
  const caseOneRef = useRef<HTMLElement>(null);
  const caseTwoRef = useRef<HTMLElement>(null);
  const caseThreeRef = useRef<HTMLElement>(null);

  const { scrollYProgress: caseOneProgress } = useScroll({
    target: caseOneRef,
    offset: ["start end", "end start"],
  });
  const caseOneY = useTransform(caseOneProgress, [0, 1], ["-8%", "8%"]);

  const { scrollYProgress: caseTwoProgress } = useScroll({
    target: caseTwoRef,
    offset: ["start end", "end start"],
  });
  const caseTwoY = useTransform(caseTwoProgress, [0, 1], ["-8%", "8%"]);

  const { scrollYProgress: caseThreeProgress } = useScroll({
    target: caseThreeRef,
    offset: ["start end", "end start"],
  });
  const caseThreeY = useTransform(caseThreeProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="Our Work"
          headline="Real software. Real impact."
          body="We build products that solve genuine problems — for schools, law firms, ministries, and businesses across Africa and beyond."
          imageSrc="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=2000&q=80"
          imageAlt="Analytics charts on a screen"
        />

        {/* Stats strip */}
        <section className="bg-white py-16 px-6 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-2"
                >
                  <CountUp
                    value={s.v}
                    className="text-5xl md:text-6xl font-bold tracking-tight"
                  />
                  <span className="label text-[#A3A3A3]">{s.l}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SchoolPulse */}
        <motion.section
          ref={caseOneRef}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
          className="bg-white py-24 md:py-32 px-6 lg:px-10"
        >
          <div className="mx-auto max-w-[1440px] grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6">
              <span className="label text-[#A3A3A3]">
                PRODUCT 01 · EDTECH
              </span>
              <h2 className="h-section">SchoolPulse</h2>
              <p className="body-lg">
                Teachers spend more time on paperwork than in the classroom.
                SchoolPulse changes that. Our AI-powered teacher portal
                automates report card generation, attendance tracking, and
                grade management — giving educators back the time to teach.
              </p>
              <div className="flex flex-col mt-4">
                {caseOneMeta.map((m) => (
                  <div
                    key={m.k}
                    className="grid grid-cols-[120px_1fr] gap-4 text-sm pt-3 border-t border-black/10"
                  >
                    <span className="label text-[#A3A3A3]">{m.k}</span>
                    <span>{m.v}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/products"
                className="label mt-2 hover:text-black/60 transition-colors w-fit"
              >
                View All Products →
              </Link>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden">
              <motion.div
                style={{ y: caseOneY }}
                className="absolute inset-0 pointer-events-none"
              >
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80"
                  alt="Teacher working with students in a classroom"
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* LegalPro */}
        <motion.section
          ref={caseTwoRef}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
          className="bg-[#f5f5f5] py-24 md:py-32 px-6 lg:px-10"
        >
          <div className="mx-auto max-w-[1440px] grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="group relative aspect-[4/5] overflow-hidden order-2 md:order-1">
              <motion.div
                style={{ y: caseTwoY }}
                className="absolute inset-0 pointer-events-none"
              >
                <Image
                  src="https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=1600&q=80"
                  alt="Legal documents and scales of justice"
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <span className="label text-[#A3A3A3]">
                PRODUCT 02 · LEGALTECH
              </span>
              <h2 className="h-section">LegalPro</h2>
              <p className="body-lg">
                African law firms are managing complex caseloads with outdated
                tools. LegalPro is a full-stack practice management system
                built to handle cases, deadlines, documents, clients, and
                billing — all from one platform designed for the way lawyers
                actually work.
              </p>
              <div className="flex flex-col mt-4">
                {caseTwoMeta.map((m) => (
                  <div
                    key={m.k}
                    className="grid grid-cols-[120px_1fr] gap-4 text-sm pt-3 border-t border-black/10"
                  >
                    <span className="label text-[#A3A3A3]">{m.k}</span>
                    <span>{m.v}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/products"
                className="label mt-2 hover:text-black/60 transition-colors w-fit"
              >
                View All Products →
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Healing Institute TV */}
        <motion.section
          ref={caseThreeRef}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
          className="bg-white py-24 md:py-32 px-6 lg:px-10"
        >
          <div className="mx-auto max-w-[1440px] grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-6">
              <span className="label text-[#A3A3A3]">
                PRODUCT 03 · FAITH-TECH
              </span>
              <h2 className="h-section">Healing Institute TV</h2>
              <p className="body-lg">
                A faith community shouldn&apos;t be limited by geography.
                Healing Institute TV is a live streaming and on-demand platform
                built to connect ministries with their congregations globally —
                engineered for reliability, scale, and community.
              </p>
              <div className="flex flex-col mt-4">
                {caseThreeMeta.map((m) => (
                  <div
                    key={m.k}
                    className="grid grid-cols-[120px_1fr] gap-4 text-sm pt-3 border-t border-black/10"
                  >
                    <span className="label text-[#A3A3A3]">{m.k}</span>
                    <span>{m.v}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/products"
                className="label mt-2 hover:text-black/60 transition-colors w-fit"
              >
                View All Products →
              </Link>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden">
              <motion.div
                style={{ y: caseThreeY }}
                className="absolute inset-0 pointer-events-none"
              >
                <Image
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80"
                  alt="People gathered in worship and community"
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        <CTABanner
          headline="Want to work with us?"
          body="We take on select client engagements. Tell us what you're building."
          ctaLabel="Start a Conversation"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
