import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineGrid, HairlineCell } from "@/components/ui/Hairline";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";

const builds = [
  {
    n: "01",
    title: "Custom Enterprise Software",
    body: "ERP, HR platforms, and inventory systems designed for your specific workflow — not someone else's idea of best practice.",
  },
  {
    n: "02",
    title: "Mobile & Web Applications",
    body: "Customer-facing platforms with world-class UX that honors local user behavior.",
  },
  {
    n: "03",
    title: "Integration Architecture",
    body: "We make your disparate systems talk to each other, creating a unified ecosystem where data flows freely.",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node",
  "Postgres",
  "AWS",
  "GCP",
  "Docker",
  "Kubernetes",
  "Tailwind",
  "Python",
  "Go",
];

export const metadata: Metadata = {
  title: "Technology Development",
  description:
    "Custom enterprise software, mobile and web applications, and integration architecture — tailored technology built for African business challenges.",
};

export default function TechnologyDevelopmentPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageHero
          label="03 · Technology Development"
          headline="If it doesn't exist, we build it."
          body="Off-the-shelf software often fails the specific nuances of African business challenges. Evectus Development creates tailored technology that fits like a glove."
        />

        {/* What we build */}
        <Section tone="white">
          <SectionHeader eyebrow="What We Build" heading="Tailored systems. Engineered for context." />
          <HairlineGrid columns={3}>
            {builds.map((b) => (
              <HairlineCell key={b.n}>
                <span className="label text-[#666666]">{b.n}</span>
                <h3 className="h-card">{b.title}</h3>
                <p className="body-md text-black/80">{b.body}</p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        {/* Built in-house */}
        <Section tone="ink" className="relative overflow-hidden">
          <Parallax amount={10}>
            <Image
              src="/heroes/tech-dev-dashboard.jpg"
              alt="Engineers collaborating on code"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />
          <Reveal className="relative z-10 flex flex-col gap-8">
            <span className="label text-white/70">Built In-House</span>
            <p className="h-section max-w-4xl">
              Every line of code is written by engineers who understand both the
              technical and cultural context of the work.
            </p>
          </Reveal>
        </Section>

        {/* Stack */}
        <Section tone="white">
          <SectionHeader eyebrow="The Stack" heading="Tools we reach for." />
          <RevealGroup className="flex flex-wrap gap-3">
            {stack.map((s) => (
              <RevealItem
                key={s}
                y={12}
                className="border border-black/20 px-4 py-2 text-sm"
              >
                {s}
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        <CTABanner
          headline="Request a build."
          body="Tell us what doesn't exist yet."
          ctaLabel="Request a Build"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
