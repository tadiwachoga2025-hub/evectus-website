"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { CountUp } from "@/components/ui/count-up";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: "01",
    title: "Process Optimization",
    body: "We map, analyze, and redesign your business processes to eliminate waste — typically reclaiming 30%+ of operational capacity.",
  },
  {
    n: "02",
    title: "Supply Chain Management",
    body: "Streamlining logistics so your product arrives faster, cheaper, more reliably.",
  },
  {
    n: "03",
    title: "Quality Assurance",
    body: "Implementing standards that ensure consistency, trust, and pride in your output.",
  },
];

const metrics = [
  { v: "+40%", l: "Efficiency Gain" },
  { v: "-60%", l: "Faster Processing" },
  { v: "95%", l: "Milestone Hit-Rate" },
  { v: "100%", l: "Partner Retention" },
];

export default function OperationalExcellencePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="04 · Operational Excellence"
          headline="Efficiency is the currency of growth."
          body="Great ideas fail in execution. Evectus ensures your operations are as extraordinary as your vision. We replace chaos with order — and order with precision."
        />

        {/* How we optimize */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Our Approach</span>
              <h2 className="h-section">How we optimize.</h2>
            </motion.div>
            <div>
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="border-t border-black/10 py-12 grid md:grid-cols-[120px_1fr_2fr] gap-8 items-start"
                >
                  <span className="label text-[#A3A3A3]">{s.n}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="body-lg text-black/80">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Numbers</span>
              <h2 className="h-section">Outcomes we deliver.</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.l}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-2"
                >
                  <CountUp
                    value={m.v}
                    className="text-6xl md:text-7xl font-bold tracking-tight"
                  />
                  <span className="label text-[#A3A3A3]">{m.l}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          headline="Optimize your business."
          body="See where you'll save first."
          ctaLabel="Book an Optimization Audit"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
