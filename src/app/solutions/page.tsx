"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    n: "01",
    title: "Digital Transformation",
    body: "Modernize infrastructure, migrate to secure cloud, and embed a digital-first culture into your workforce.",
    href: "/solutions/digital-transformation",
  },
  {
    n: "02",
    title: "Strategic Consulting",
    body: "Navigate market shifts, regulatory changes, and expansion goals with strategies built on data and local insight.",
    href: "/solutions/strategic-consulting",
  },
  {
    n: "03",
    title: "Technology Development",
    body: "Custom apps, enterprise software, and integration platforms designed for the unique challenges of the African market.",
    href: "/solutions/technology-development",
  },
  {
    n: "04",
    title: "Operational Excellence",
    body: "Analyze workflows, identify bottlenecks, and implement lean methodologies that save money and time.",
    href: "/solutions/operational-excellence",
  },
];

const values = [
  {
    label: "Integrity",
    heading: "We do what is right, not what is easy.",
    body: "Every recommendation we make is grounded in what serves your organization long-term — not what closes a deal.",
  },
  {
    label: "Trust",
    heading: "Relationships are the currency of business.",
    body: "Our partners stay with us because we show up, deliver, and stand behind every commitment we make.",
  },
  {
    label: "Ingenuity",
    heading: "Ordinary is not in our vocabulary.",
    body: "We solve the problem in front of us with the creativity, rigor, and craft that the moment demands.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="Our Solutions"
          headline="Comprehensive solutions for a complex world."
          body="We don't offer cookie-cutter packages. We provide superior solutions tailored to your everyday problems."
          imageSrc="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=80"
          imageAlt="Strategy session at a glass conference table"
        />

        {/* Four pillars */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">What We Deliver</span>
              <h2 className="h-section">
                Built for the African context. Measured by global standards.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-px bg-black/10">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                >
                  <Link
                    href={p.href}
                    className="group bg-white p-10 lg:p-12 flex flex-col gap-4 hover:bg-black hover:text-white transition-colors duration-300 h-full"
                  >
                    <span className="label text-[#A3A3A3] group-hover:text-white/60">
                      {p.n}
                    </span>
                    <h3 className="h-card">{p.title}</h3>
                    <p className="body-md text-black/80 group-hover:text-white/85">
                      {p.body}
                    </p>
                    <span className="label mt-4 group-hover:text-white">
                      Learn More →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Evectus */}
        <section className="bg-black text-white px-6 lg:px-10 py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label text-white/70">Why Evectus</span>
              <h2 className="h-section">
                Three principles. Every engagement. No exceptions.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-12 border-t border-white/15 pt-12">
              {values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ x: -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-4"
                >
                  <span className="label text-white/60">{v.label}</span>
                  <h3 className="h-card">{v.heading}</h3>
                  <p className="body-md text-white/80">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          headline="Find your solution."
          body="Tell us about your challenge — we'll show you how we'd solve it."
          ctaLabel="Book a Consultation"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
