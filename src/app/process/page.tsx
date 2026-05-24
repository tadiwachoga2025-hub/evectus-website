"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const phases = [
  {
    n: "01",
    label: "DISCOVERY & AUDIT",
    title: "We listen. We learn.",
    body: "We analyze your current state without judgment, identifying the ordinary pain points that hold you back.",
  },
  {
    n: "02",
    label: "STRATEGY & DESIGN",
    title: "We blueprint the solution.",
    body: "Using ingenuity, we design a superior solution and blueprint the roadmap to your transformation.",
  },
  {
    n: "03",
    label: "IMPLEMENTATION",
    title: "We execute with precision.",
    body: "Whether it's software code or strategic rollout, we do the work — on time, on budget.",
  },
  {
    n: "04",
    label: "TRANSFER & SUPPORT",
    title: "We transfer knowledge.",
    body: "We don't create dependency. We transfer knowledge to your team and provide ongoing support to ensure sustainability.",
  },
];

const expectations = [
  {
    label: "WEEKLY",
    title: "Status reports & demos",
    body: "Every week you receive a clear progress report and a working demo of what we've built — no surprises, no fluff.",
  },
  {
    label: "BIWEEKLY",
    title: "Stakeholder alignment calls",
    body: "Twice a month we bring your leadership and ours into the same room to validate direction and unblock decisions.",
  },
  {
    label: "ALWAYS",
    title: "Direct partner access via Slack / WhatsApp",
    body: "You will never wait days for an answer. A senior partner is reachable on your channel of choice, every day.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="Our Process"
          headline="The Evectus Method: from ordinary to extraordinary."
          body="A defined process ensures we deliver on our promises of Integrity and Trust."
          imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&q=80"
          imageAlt="Whiteboard planning session"
        />

        {/* Four phases */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Four Phases</span>
              <h2 className="h-section">
                Disciplined. Transparent. Repeatable.
              </h2>
            </motion.div>
            <div className="flex flex-col">
              {phases.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: EASE_OUT_QUART,
                  }}
                  className="border-t border-black/10 py-12 grid md:grid-cols-[280px_1fr] gap-8"
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-7xl md:text-9xl font-bold leading-none tracking-tight">
                      {p.n}
                    </span>
                    <span className="label text-[#A3A3A3]">{p.label}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="h-card mb-3">{p.title}</h3>
                    <p className="body-lg max-w-2xl text-black/80">{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What you can expect */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">What You Can Expect</span>
              <h2 className="h-section">
                A working rhythm built around your team.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-10">
              {expectations.map((e, i) => (
                <motion.div
                  key={e.label}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-4"
                >
                  <span className="label text-[#A3A3A3]">{e.label}</span>
                  <h3 className="h-card">{e.title}</h3>
                  <p className="body-md text-black/80">{e.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          headline="See how we work."
          body="Schedule a 30-minute discovery call."
          ctaLabel="Book a Discovery Call"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
