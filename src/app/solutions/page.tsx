import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineGrid, HairlineCell } from "@/components/ui/Hairline";

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

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Four practice areas — Digital Transformation, Strategic Consulting, Technology Development, and Operational Excellence — tailored to your everyday problems.",
};

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageHero
          label="Our Solutions"
          headline="Four practices. One standard of delivery."
          body="Digital Transformation, Strategic Consulting, Technology Development, and Operational Excellence — each engagement scoped to the problem in front of you, never a cookie-cutter package."
          imageSrc="/heroes/solutions-strategy.jpg"
          imageAlt="Strategy session at a glass conference table"
        />

        {/* Four pillars */}
        <Section tone="paper">
          <SectionHeader
            eyebrow="What We Deliver"
            heading="Built for the African context. Measured by global standards."
          />
          <HairlineGrid columns={2}>
            {pillars.map((p) => (
              <HairlineCell key={p.n}>
                <Link
                  href={p.href}
                  className="group -m-8 flex h-full cursor-pointer flex-col gap-4 p-8 hover:bg-black hover:text-white transition-colors duration-300 md:-m-10 md:p-10 lg:-m-12 lg:p-12"
                >
                  <span className="h-stat text-[#666666] group-hover:text-white/60 transition-colors duration-300">
                    {p.n}
                  </span>
                  <h3 className="h-card">{p.title}</h3>
                  <p className="body-md text-black/80 group-hover:text-white/85 transition-colors duration-300">
                    {p.body}
                  </p>
                  <span className="label mt-4 group-hover:text-white transition-colors duration-300">
                    Learn More <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        {/* Why Evectus */}
        <Section tone="ink">
          <SectionHeader
            eyebrow="Why Evectus"
            heading="Three principles. Every engagement. No exceptions."
            onInk
          />
          <HairlineGrid columns={3} tone="ink">
            {values.map((v) => (
              <HairlineCell key={v.label} tone="ink">
                <span className="label text-white/60">{v.label}</span>
                <h3 className="h-card">{v.heading}</h3>
                <p className="body-md text-white/80">{v.body}</p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        <CTABanner
          headline="Find your solution."
          body="Tell us about your challenge — we'll show you how we'd solve it."
          ctaLabel="Book a Consultation"
          ctaHref="/contact"
          finePrint="We reply within 24 hours"
        />
      </main>
      <Footer />
    </>
  );
}
