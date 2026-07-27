import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineGrid, HairlineCell } from "@/components/ui/Hairline";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

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

const offices = [
  { city: "Harare", label: "HOME OFFICE" },
  { city: "Lagos", label: "PROJECT TEAMS" },
  { city: "Nairobi", label: "PROJECT TEAMS" },
  { city: "Cape Town", label: "PROJECT TEAMS" },
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind Evectus Solutions — Harare-based strategists and technologists building better systems for Africa on integrity, trust, and ingenuity.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageHero
          label="About Evectus"
          headline="Built on integrity. Driven by ingenuity. Rooted in trust."
          body="Evectus Solutions was founded on a simple premise: Africa deserves better. Better systems, better strategies, better outcomes."
          imageSrc="/heroes/about-team.jpg"
          imageAlt="Team meeting in a modern office"
        />

        {/* Our values */}
        <Section tone="white">
          <SectionHeader
            eyebrow="Our Values"
            heading="Three principles. Every engagement."
          />
          <HairlineGrid columns={3}>
            {values.map((v) => (
              <HairlineCell key={v.label}>
                <span className="label text-[#666666]">{v.label}</span>
                <h3 className="h-card">{v.title}</h3>
                <p className="body-md text-black/80">{v.body}</p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        {/* Our team */}
        <Section tone="paper">
          <SectionHeader
            eyebrow="Our Team"
            heading="Strategists. Technologists. Believers."
          />
          <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
            {team.map((m) => (
              <RevealItem
                key={m.name}
                className="flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1e1e1e]/10">
                  {m.imageSrc ? (
                    <Image
                      src={m.imageSrc}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="h-card text-[#1e1e1e]/40">
                        {getInitials(m.name)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 bg-white p-4">
                  <span className="body-lg font-bold">{m.name}</span>
                  <span className="label text-[#666666]">{m.role}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* Where we work */}
        <Section tone="white">
          <SectionHeader
            eyebrow="Offices"
            heading="Harare. Lagos. Nairobi. Cape Town."
            body="We operate where our clients are. Our home office is in Harare; our project teams deploy across the continent."
          />
          <HairlineGrid columns={4}>
            {offices.map((o) => (
              <HairlineCell key={o.city}>
                <span className="label text-[#666666]">{o.label}</span>
                <h3 className="h-card">{o.city}</h3>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

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
