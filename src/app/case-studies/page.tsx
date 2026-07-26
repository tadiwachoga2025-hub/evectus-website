import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineList, HairlineRow } from "@/components/ui/Hairline";
import StatStrip from "@/components/ui/StatStrip";
import Parallax from "@/components/ui/Parallax";

const stats = [
  { label: "Products Shipped", value: "5" },
  { label: "On-Time Delivery", value: "100%" },
  { label: "Milestone Hit-Rate", value: "95%" },
  { label: "Partner Retention", value: "100%" },
];

type CaseMeta = { k: string; v: string };

type Case = {
  title: string;
  kicker: string;
  body: string;
  meta: CaseMeta[];
  image: string;
  alt: string;
  tone: "white" | "paper";
  reversed: boolean;
};

const CASES: Case[] = [
  {
    title: "SchoolPulse",
    kicker: "PRODUCT 01 · EDTECH",
    body: "Teachers spend more time on paperwork than in the classroom. SchoolPulse changes that. Our AI-powered teacher portal automates report card generation, attendance tracking, and grade management — giving educators back the time to teach.",
    meta: [
      { k: "SECTOR", v: "Education Technology" },
      { k: "SOLUTION", v: "AI-powered teacher portal with report card generation" },
      { k: "OUTCOME", v: "Automated 80% of manual admin work for teachers" },
    ],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80",
    alt: "Teacher working with students in a classroom",
    tone: "white",
    reversed: false,
  },
  {
    title: "LegalPro",
    kicker: "PRODUCT 02 · LEGALTECH",
    body: "African law firms are managing complex caseloads with outdated tools. LegalPro is a full-stack practice management system built to handle cases, deadlines, documents, clients, and billing — all from one platform designed for the way lawyers actually work.",
    meta: [
      { k: "SECTOR", v: "Legal Technology" },
      { k: "SOLUTION", v: "Full-stack case & practice management system" },
      { k: "OUTCOME", v: "Unified case tracking, billing, and document management" },
    ],
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=1600&q=80",
    alt: "Legal documents and scales of justice",
    tone: "paper",
    reversed: true,
  },
  {
    title: "Healing Institute TV",
    kicker: "PRODUCT 03 · FAITH-TECH",
    body: "A faith community shouldn't be limited by geography. Healing Institute TV is a live streaming and on-demand platform built to connect ministries with their congregations globally — engineered for reliability, scale, and community.",
    meta: [
      { k: "SECTOR", v: "Faith & Media Streaming" },
      { k: "SOLUTION", v: "Live streaming platform for ministries and congregations" },
      { k: "OUTCOME", v: "Global reach with sub-2s stream latency" },
    ],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80",
    alt: "People gathered in worship and community",
    tone: "white",
    reversed: false,
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="Our Work"
          headline="Real software. Real impact."
          body="We build products that solve genuine problems — for schools, law firms, ministries, and businesses across Africa and beyond."
          imageSrc="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=2000&q=80"
          imageAlt="Analytics charts on a screen"
        />

        <Section tone="white">
          <StatStrip stats={stats} />
        </Section>

        {CASES.map((c) => (
          <Section
            key={c.title}
            tone={c.tone}
            innerClassName="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <div className={c.reversed ? "order-1 md:order-2" : undefined}>
              <SectionHeader eyebrow={c.kicker} heading={c.title} body={c.body} />
              <HairlineList className="mb-6">
                {c.meta.map((m) => (
                  <HairlineRow key={m.k} className="grid grid-cols-[120px_1fr] gap-4 text-sm">
                    <span className="label text-[#666666]">{m.k}</span>
                    <span>{m.v}</span>
                  </HairlineRow>
                ))}
              </HairlineList>
              <Link
                href="/products"
                className="label mt-2 hover:text-black/60 transition-colors w-fit"
              >
                View the {c.title} build <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div
              className={`group relative aspect-[4/5] overflow-hidden${
                c.reversed ? " order-2 md:order-1" : ""
              }`}
            >
              <Parallax amount={8}>
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Parallax>
            </div>
          </Section>
        ))}

        <CTABanner
          headline="Want to work with us?"
          body="We take on select client engagements. Tell us what you're building."
          ctaLabel="Start a Conversation"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
