"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const deliverables = [
  {
    n: "01",
    title: "Market Entry Analysis",
    body: "Understanding the African consumer is nuanced. We provide deep-dive research and cultural insight that maps the real path to revenue.",
  },
  {
    n: "02",
    title: "Business Restructuring",
    body: "Sometimes you need to tear down to build up. We streamline organizational structures for agility and resilience.",
  },
  {
    n: "03",
    title: "Growth Strategy",
    body: "We identify revenue streams and partnerships that align with the Global Powerhouse vision — and execute against them.",
  },
];

const formats = [
  {
    title: "Sprint",
    duration: "2–3 weeks",
    body: "Focused diagnosis on a single high-stakes question.",
  },
  {
    title: "Roadmap",
    duration: "8–12 weeks",
    body: "Full strategy build with phased execution plan.",
  },
  {
    title: "Embed",
    duration: "3–6 months",
    body: "On-the-ground execution alongside your leadership team.",
  },
];

export default function StrategicConsultingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="02 · Strategic Consulting"
          headline="Navigate the future with clarity."
          body="Ambition requires a roadmap. Whether entering a new market or restructuring for growth, Evectus provides strategic foresight to mitigate risk and maximize reward."
        />

        {/* What we deliver */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="grid md:grid-cols-2 gap-12 mb-16 items-end"
            >
              <span className="label">What We Deliver</span>
              <h2 className="h-section">
                Strategy built for the African context.
              </h2>
            </motion.div>

            <div>
              {deliverables.map((d, i) => (
                <motion.div
                  key={d.n}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="grid md:grid-cols-[120px_1fr_2fr] gap-8 items-start border-t border-black/10 py-12"
                >
                  <span className="text-7xl md:text-8xl font-bold leading-none tracking-tight">
                    {d.n}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {d.title}
                  </h3>
                  <p className="body-lg text-black/80">{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement formats */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Engagement Formats</span>
              <h2 className="h-section">Match the work to the moment.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-px bg-black/10">
              {formats.map((f, i) => (
                <motion.div
                  key={f.title}
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
                  <span className="label text-[#A3A3A3]">Format</span>
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">
                    {f.title}
                  </h3>
                  <span className="label">{f.duration}</span>
                  <p className="body-md text-black/80">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          headline="Strategize with us."
          body="A 30-minute call to scope your challenge."
          ctaLabel="Book a Strategy Session"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
