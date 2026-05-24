"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  {
    title: "Cloud Migration",
    body: "Secure, scalable, cost-effective. We migrate workloads with zero data loss and minimal downtime.",
  },
  {
    title: "Data Analytics",
    body: "Turn your data into actionable intelligence with dashboards your team will actually use.",
  },
  {
    title: "Change Management",
    body: "We shift the culture of your workforce to embrace technology — not resist it.",
  },
];

const steps = [
  { n: "01", label: "Audit" },
  { n: "02", label: "Blueprint" },
  { n: "03", label: "Deploy" },
  { n: "04", label: "Embed" },
];

export default function DigitalTransformationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="01 · Digital Transformation"
          headline="Modernize or get left behind."
          body="The world is moving fast. To make Africa a Global Powerhouse, our institutions must be digital, agile, and connected."
        />

        {/* The Challenge */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-6"
            >
              <span className="label">The Challenge</span>
              <h2 className="h-section">
                Many organizations want to digitize but fear the disruption.
              </h2>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-6"
            >
              <p className="body-lg">
                They face siloed data, outdated hardware, and resistant teams.
                This is the &ldquo;ordinary&rdquo; trap — the assumption that
                transformation must be painful, slow, and expensive. We
                disagree.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">The Evectus Solution</span>
              <h2 className="h-section">We handle the entire lifecycle.</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-px bg-black/10">
              {capabilities.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="bg-white p-10 flex flex-col gap-3"
                >
                  <h3 className="text-2xl font-bold tracking-tight">
                    {c.title}
                  </h3>
                  <p className="body-md text-black/80">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process snapshot */}
        <section className="bg-white px-6 lg:px-10 py-24">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Process Snapshot</span>
              <h2 className="h-section">
                From audit to adoption in 90 days.
              </h2>
            </motion.div>
            <ol className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-black/10 pt-12">
              {steps.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-3"
                >
                  <span className="text-5xl md:text-6xl font-bold tracking-tight">
                    {s.n}
                  </span>
                  <span className="label text-[#A3A3A3]">{s.label}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <CTABanner
          headline="Start your digital journey."
          body="A 30-minute discovery call. Zero obligation."
          ctaLabel="Book Discovery Call"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
