"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

type Product = {
  n: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  stack: string[];
  status: "Live" | "Beta" | "In Development";
  accent: string;
};

const products: Product[] = [
  {
    n: "01",
    name: "SchoolPulse",
    tagline: "The intelligent teacher portal.",
    description:
      "An AI-powered school management platform that handles report card generation, attendance tracking, grade management, and proactive insights — giving teachers back the time to teach.",
    category: "EdTech SaaS",
    stack: ["Next.js", "TypeScript", "AI/LLM"],
    status: "Live",
    accent: "#4F46E5",
  },
  {
    n: "02",
    name: "LegalPro",
    tagline: "Law practice, modernised.",
    description:
      "A comprehensive legal case and practice management system built for law firms and in-house legal teams. Manage cases, deadlines, documents, and billing — from one streamlined platform.",
    category: "LegalTech SaaS",
    stack: ["TypeScript", "Next.js", "PostgreSQL"],
    status: "Beta",
    accent: "#0EA5E9",
  },
  {
    n: "03",
    name: "Notify SMS",
    tagline: "Reach anyone. Instantly.",
    description:
      "A programmable SMS notification platform designed for businesses that need reliable, high-throughput messaging. Simple APIs, real-time delivery tracking, and a developer-first experience.",
    category: "Communication Platform",
    stack: ["Java", "Spring Boot", "SMS APIs"],
    status: "Live",
    accent: "#10B981",
  },
  {
    n: "04",
    name: "StarPlus",
    tagline: "Entertainment without limits.",
    description:
      "A feature-rich media streaming client built for next-generation content consumption. StarPlus delivers a seamless, premium viewing experience with a modern, responsive interface.",
    category: "Entertainment",
    stack: ["TypeScript", "React Native"],
    status: "In Development",
    accent: "#F59E0B",
  },
  {
    n: "05",
    name: "Healing Institute TV",
    tagline: "Faith. Community. Stream.",
    description:
      "A faith-based live streaming and on-demand video platform connecting ministries with their congregations globally. Built for scale, reliability, and spiritual community.",
    category: "Faith-Tech",
    stack: ["TypeScript", "Next.js", "Streaming APIs"],
    status: "Live",
    accent: "#8B5CF6",
  },
];

const statusStyles: Record<Product["status"], string> = {
  Live: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beta: "bg-blue-50 text-blue-700 border-blue-200",
  "In Development": "bg-amber-50 text-amber-700 border-amber-200",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="Our Products"
          headline="Software built to last."
          body="We don't just consult — we build. Every product we ship is engineered with precision, designed with purpose, and built for the African context and beyond."
          imageSrc="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=2000&q=80"
          imageAlt="Code on a monitor — software development"
        />

        {/* Products Grid */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">What We&apos;ve Built</span>
              <h2 className="h-section">
                Five products. Five problems solved.
              </h2>
              <p className="body-lg max-w-2xl">
                From education technology to legal software, communication
                infrastructure to media streaming — we build what Africa needs.
              </p>
            </motion.div>

            <div className="flex flex-col gap-px bg-black/10">
              {products.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.06,
                    ease: EASE_OUT_QUART,
                  }}
                >
                  <div className="group bg-white p-10 lg:p-14 grid md:grid-cols-[1fr_auto] gap-8 items-start hover:bg-black hover:text-white transition-colors duration-300">
                    {/* Left: main content */}
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="label text-[#A3A3A3] group-hover:text-white/50">
                          {p.n}
                        </span>
                        <span
                          className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${statusStyles[p.status]} group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20`}
                        >
                          {p.status}
                        </span>
                        <span className="label text-[#A3A3A3] group-hover:text-white/50">
                          {p.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="h-card mb-1">{p.name}</h3>
                        <p className="text-lg font-medium text-black/60 group-hover:text-white/60 leading-snug">
                          {p.tagline}
                        </p>
                      </div>

                      <p className="body-md text-black/75 group-hover:text-white/80 max-w-2xl">
                        {p.description}
                      </p>

                      {/* Stack tags */}
                      <div className="flex flex-wrap gap-2 mt-1">
                        {p.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs tracking-wide uppercase border border-black/15 group-hover:border-white/20 px-3 py-1 rounded-full text-black/60 group-hover:text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: accent bar + number */}
                    <div className="hidden md:flex flex-col items-end gap-3 pt-1 shrink-0">
                      <div
                        className="w-1 h-20 rounded-full opacity-40 group-hover:opacity-70 transition-opacity"
                        style={{ backgroundColor: p.accent }}
                      />
                      <span
                        className="text-6xl font-bold leading-none opacity-10 group-hover:opacity-20 tracking-tighter transition-opacity"
                        aria-hidden="true"
                      >
                        {p.n}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio statement */}
        <section className="bg-black text-white px-6 lg:px-10 py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
              className="max-w-4xl"
            >
              <span className="label text-white/50 mb-6 block">
                Our Approach
              </span>
              <h2 className="h-section mb-8">
                We are a product studio, not a body shop.
              </h2>
              <p className="body-lg text-white/75 max-w-3xl mb-6">
                Every product we build solves a real problem that African
                businesses face. We don&apos;t build for the sake of building —
                we build because the solution doesn&apos;t exist yet, or
                because the existing ones weren&apos;t built for us.
              </p>
              <p className="body-lg text-white/75 max-w-3xl">
                When we take on client engagements, we bring the same product
                discipline — rigorous discovery, rapid iteration, and delivery
                that works on day one.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_QUART }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10 pt-12"
            >
              {[
                { v: "5", l: "Products Shipped" },
                { v: "3", l: "Live in Production" },
                { v: "100%", l: "TypeScript Codebase" },
                { v: "2026", l: "Year of Operation" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-2">
                  <span className="text-5xl md:text-6xl font-bold tracking-tight">
                    {s.v}
                  </span>
                  <span className="label text-white/50">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <CTABanner
          headline="Want to build something?"
          body="Tell us about your idea. We'll tell you how we'd ship it."
          ctaLabel="Start the Conversation"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
