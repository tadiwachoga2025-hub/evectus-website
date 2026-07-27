import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineList, HairlineRow } from "@/components/ui/Hairline";
import StatStrip from "@/components/ui/StatStrip";
import { Reveal } from "@/components/ui/Reveal";

type Product = {
  n: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  stack: string[];
  status: "Live" | "Beta" | "In Development";
  accent: string;
  href: string;
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
    href: "/case-studies#schoolpulse",
  },
  {
    n: "02",
    name: "LegalPro",
    tagline: "Law practice, modernized.",
    description:
      "A comprehensive legal case and practice management system built for law firms and in-house legal teams. Manage cases, deadlines, documents, and billing — from one streamlined platform.",
    category: "LegalTech SaaS",
    stack: ["TypeScript", "Next.js", "PostgreSQL"],
    status: "Beta",
    accent: "#0EA5E9",
    href: "/case-studies#legalpro",
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
    href: "/contact",
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
    href: "/contact",
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
    href: "/case-studies#healing-institute",
  },
];

const statusStyles: Record<Product["status"], string> = {
  Live: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Beta: "bg-blue-50 text-blue-700 border-blue-200",
  "In Development": "bg-amber-50 text-amber-700 border-amber-200",
};

const productStats = [
  { label: "Products Shipped", value: "5" },
  { label: "Live in Production", value: "3" },
  { label: "TypeScript Codebase", value: "100%" },
  { label: "Year of Operation", value: "2026" },
];

export const metadata: Metadata = {
  title: "Products",
  description:
    "Five products built in-house: SchoolPulse, LegalPro, Notify SMS, StarPlus, and Healing Institute TV — software engineered for the African context and beyond.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageHero
          label="Our Products"
          headline="Software built to last."
          body="We don't just consult — we build. From education and legal practice to messaging and streaming, our products are engineered in-house for the African market — three of five already live in production."
          imageSrc="/heroes/products-code.jpg"
          imageAlt="Code on a monitor — software development"
        />

        {/* Products Grid */}
        <Section tone="paper">
          <SectionHeader
            eyebrow="What We've Built"
            heading="Five products. Five problems solved."
            body="From education technology to legal software, communication infrastructure to media streaming — we build what Africa needs."
          />

          <HairlineList>
            {products.map((p) => (
              <HairlineRow key={p.n} className="p-0">
                <Link
                  href={p.href}
                  className="group grid cursor-pointer items-start gap-8 bg-white px-10 py-8 transition-colors duration-300 hover:bg-black hover:text-white md:grid-cols-[1fr_auto] md:px-14 md:py-10"
                >
                  {/* Left: main content */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="label text-[#666666] group-hover:text-white/50 transition-colors duration-300">
                        {p.n}
                      </span>
                      <span
                        className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${statusStyles[p.status]} group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 transition-colors duration-300`}
                      >
                        {p.status}
                      </span>
                      <span className="label text-[#666666] group-hover:text-white/50 transition-colors duration-300">
                        {p.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="h-card mb-1">{p.name}</h3>
                      <p className="text-lg font-medium text-black/60 group-hover:text-white/60 leading-snug transition-colors duration-300">
                        {p.tagline}
                      </p>
                    </div>

                    <p className="body-md text-black/75 group-hover:text-white/80 max-w-2xl transition-colors duration-300">
                      {p.description}
                    </p>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs tracking-wide uppercase border border-black/15 group-hover:border-white/20 px-3 py-1 rounded-full text-black/60 group-hover:text-white/60 transition-colors duration-300"
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
                      className="h-stat leading-none opacity-10 group-hover:opacity-20 transition-opacity"
                      aria-hidden="true"
                    >
                      {p.n}
                    </span>
                  </div>
                </Link>
              </HairlineRow>
            ))}
          </HairlineList>
        </Section>

        {/* Studio statement */}
        <Section tone="ink">
          <SectionHeader
            eyebrow="Our Approach"
            heading="We are a product studio, not a body shop."
            onInk
          />
          <Reveal className="-mt-6 max-w-4xl md:-mt-8">
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
          </Reveal>

          <StatStrip
            stats={productStats}
            onInk
            className="mt-16 border-t border-white/10 pt-12"
          />
        </Section>

        <CTABanner
          headline="Want to build something?"
          body="Tell us about your idea. We'll tell you how we'd ship it."
          ctaLabel="Start the Conversation"
          ctaHref="/contact"
          finePrint="We reply within 24 hours"
        />
      </main>
      <Footer />
    </>
  );
}
