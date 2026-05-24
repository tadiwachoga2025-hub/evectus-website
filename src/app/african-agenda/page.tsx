"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    label: "THE VISION",
    title: "An Africa that creates and exports superior solutions.",
    body: "We envision an Africa that is not just a consumer of global trends but a creator and exporter of superior solutions. An Africa where businesses compete on the world stage and win.",
  },
  {
    label: "THE MISSION",
    title: "Shifting the culture, one solution at a time.",
    body: "We achieve this by replacing the ordinary acceptance of mediocrity with the extraordinary demand for excellence.",
  },
  {
    label: "THE IMPACT",
    title: "Measured by what we build, not what we say.",
    body: "Every project is measured against this goal: does it create jobs? does it improve infrastructure? does it build capacity?",
  },
];

const commitments = [
  {
    label: "LOCAL TALENT",
    title: "African experts. Global standards.",
    body: "We hire local experts and upskill them with global methodologies.",
  },
  {
    label: "SUSTAINABLE GROWTH",
    title: "Solutions that outlast the engagement.",
    body: "We build solutions that last — respecting environment and community.",
  },
];

export default function AfricanAgendaPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative h-screen overflow-hidden"
        >
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 pointer-events-none"
          >
            <Image
              src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=2000&q=80"
              alt="Aerial view of an African landscape"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-10 flex items-center">
            <div className="flex flex-col gap-6 max-w-5xl">
              <span className="label text-white">The African Agenda</span>
              <h1 className="h-hero text-white">
                Making Africa a Global Powerhouse.
              </h1>
            </div>
          </div>
        </section>

        {/* Vision / Mission / Impact */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: EASE_OUT_QUART,
                }}
                className="border-t border-black/10 py-16 grid md:grid-cols-[200px_1fr] gap-8"
              >
                <span className="label text-[#A3A3A3]">{p.label}</span>
                <div className="flex flex-col gap-6">
                  <h2 className="h-section max-w-3xl">{p.title}</h2>
                  <p className="body-lg max-w-2xl text-black/80">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Commitments */}
        <section className="bg-black text-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label text-white/70">Our Commitments</span>
              <h2 className="h-section">
                Promises we make to the continent.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12">
              {commitments.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-4"
                >
                  <span className="label text-white/70">{c.label}</span>
                  <h3 className="h-card">{c.title}</h3>
                  <p className="body-lg text-white/80">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          headline="Join the movement."
          body="Partner with Evectus on the African century."
          ctaLabel="Join the Movement"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
