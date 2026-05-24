"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { CountUp } from "@/components/ui/count-up";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const stats = [
  { v: "+40%", l: "Avg. Efficiency Gain" },
  { v: "100%", l: "Digital Adoption" },
  { v: "95%", l: "Milestone Hit-Rate" },
  { v: "100%", l: "Partner Retention" },
];

const caseOneMeta = [
  { k: "CHALLENGE", v: "Inefficient manual processes" },
  { k: "SOLUTION", v: "Digital transformation + custom ERP" },
  { k: "RESULT", v: "+40% revenue, -60% processing time" },
];

const caseTwoMeta = [
  { k: "CHALLENGE", v: "No expansion roadmap" },
  { k: "SOLUTION", v: "Strategic consulting + market analysis" },
  { k: "RESULT", v: "2 new markets, profitable in year one" },
];

export default function CaseStudiesPage() {
  const caseOneRef = useRef<HTMLElement>(null);
  const caseTwoRef = useRef<HTMLElement>(null);

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

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="Case Studies"
          headline="Proof of the extraordinary."
          body="Real results. Real transformation. Real numbers."
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

        {/* Featured Case Study 1 */}
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
                CASE STUDY 01 · ENTERPRISE
              </span>
              <h2 className="h-section">
                40% revenue recovery in 6 months.
              </h2>
              <p className="body-lg">
                An established enterprise was bleeding revenue through
                inefficient manual processes. We deployed a custom ERP solution
                and rebuilt their data pipeline. The result: 40% revenue
                recovery and 60% faster processing time.
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
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden">
              <motion.div
                style={{ y: caseOneY }}
                className="absolute inset-0 pointer-events-none"
              >
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
                  alt="Data analytics dashboard with code"
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Featured Case Study 2 (reverse) */}
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
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80"
                  alt="Professional working on a laptop"
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <span className="label text-[#A3A3A3]">
                CASE STUDY 02 · STRATEGY
              </span>
              <h2 className="h-section">
                Two new markets in twelve months.
              </h2>
              <p className="body-lg">
                A regional player wanted to expand but lacked a strategic
                playbook. Our market entry analysis identified two
                high-opportunity territories. Within 12 months, both were live
                and profitable.
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
            </div>
          </div>
        </motion.section>

        <CTABanner
          headline="Want the full deck?"
          body="Request our case study deck — confidentiality respected."
          ctaLabel="Request Case Deck"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
