"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    label: "INTEGRITY",
    title: "We do what's right, not what's easy.",
    body: "Transparency in our dealings, honesty in our assessments, and ethical standards in every solution we deploy.",
  },
  {
    label: "TRUST",
    title: "Relationships are the currency of business.",
    body: "We earn trust through delivery, consistency, and communication. When Evectus commits, Evectus delivers.",
  },
  {
    label: "INGENUITY",
    title: "Ordinary is not in our vocabulary.",
    body: "We approach every problem with fresh eyes — leveraging local insight and global best practices to craft exceptional solutions.",
  },
];

const team = [
  {
    name: "Tadiwa Choga",
    role: "Founder and CEO",
    imageSrc: "/team/tadiwa-choga.jpg",
  },
  {
    name: "Tafara Jiya",
    role: "Head of Marketing",
    imageSrc: "/team/head-of-marketing.jpg",
  },
  {
    name: "Benedict Jonga",
    role: "Head of Sales",
    imageSrc: "/team/head-of-sales.jpg",
  },
  {
    name: "Slyvester Magodoro",
    role: "Chief Operations Officer",
    imageSrc: "/team/coo.jpg",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="About Evectus"
          headline="Built on integrity. Driven by ingenuity. Rooted in trust."
          body="Evectus Solutions was founded on a simple premise: Africa deserves better. Better systems, better strategies, better outcomes."
          imageSrc="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=2000&q=80"
          imageAlt="Team meeting in a modern office"
        />

        {/* Our values */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Our Values</span>
              <h2 className="h-section">
                Three principles. Every engagement.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-px bg-black/10">
              {values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="bg-white p-10 flex flex-col gap-4"
                >
                  <span className="label text-[#A3A3A3]">{v.label}</span>
                  <h3 className="h-card">{v.title}</h3>
                  <p className="body-md text-black/80">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our team */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Our Team</span>
              <h2 className="h-section">
                Strategists. Technologists. Believers.
              </h2>
            </motion.div>
            <div className="grid grid-cols-4 gap-3 sm:gap-6">
              {team.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -4 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col"
                >
                  <div className="relative aspect-[3/4] bg-[#A3A3A3] overflow-hidden">
                    {m.imageSrc && (
                      <Image
                        src={m.imageSrc}
                        alt={`${m.name} — ${m.role}`}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 bg-white flex flex-col gap-1">
                    <span className="text-base font-bold">{m.name}</span>
                    <span className="text-sm text-[#A3A3A3]">{m.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Where we work */}
        <section className="bg-white px-6 lg:px-10 py-24">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
            className="mx-auto max-w-[1440px] flex flex-col gap-6"
          >
            <span className="label">Offices</span>
            <h2 className="h-section">
              Harare. Lagos. Nairobi. Cape Town.
            </h2>
            <p className="body-lg max-w-2xl text-black/80">
              We operate where our clients are. Our home office is in Harare;
              our project teams deploy across the continent.
            </p>
          </motion.div>
        </section>

        <CTABanner
          headline="Meet the team."
          body="Get in touch — we'd love to hear about your work."
          ctaLabel="Get in Touch"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
