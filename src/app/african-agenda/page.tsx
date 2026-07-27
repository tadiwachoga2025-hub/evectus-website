import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineGrid, HairlineCell, HairlineList, HairlineRow } from "@/components/ui/Hairline";
import { Reveal } from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";

const pillars = [
  {
    label: "THE VISION",
    title: "An Africa that creates and exports superior solutions.",
    body: "We envision an Africa that is not just a consumer of global trends but a builder that competes on the world stage — and wins.",
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

export const metadata: Metadata = {
  title: "The African Agenda",
  description:
    "Making Africa a Global Powerhouse: our vision of a continent that creates and exports superior solutions — measured in jobs, infrastructure, and capacity.",
};

export default function AfricanAgendaPage() {
  return (
    <>
      <Navbar overlay />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[600px] h-screen max-h-[900px] overflow-hidden">
          <Parallax amount={10} className="pointer-events-none">
            <Image
              src="/heroes/agenda-africa.jpg"
              alt="Aerial view of an African landscape"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-10 flex items-center">
            <div className="flex flex-col gap-6 max-w-5xl">
              <Reveal delay={0}>
                <span className="label text-white">The African Agenda</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="h-hero text-white">
                  Making Africa a Global Powerhouse.
                </h1>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Vision / Mission / Impact */}
        <Section tone="white">
          <HairlineList>
            {pillars.map((p) => (
              <HairlineRow key={p.label} className="grid md:grid-cols-[200px_1fr] gap-8">
                <span className="label text-[#666666]">{p.label}</span>
                <div className="flex flex-col gap-6">
                  <h2 className="h-section max-w-3xl">{p.title}</h2>
                  <p className="body-lg max-w-2xl text-black/80">{p.body}</p>
                </div>
              </HairlineRow>
            ))}
          </HairlineList>
        </Section>

        {/* Commitments */}
        <Section tone="ink">
          <SectionHeader
            eyebrow="Our Commitments"
            heading="Promises we make to the continent."
            onInk
          />
          <HairlineGrid columns={2} tone="ink">
            {commitments.map((c) => (
              <HairlineCell key={c.label} tone="ink">
                <span className="label text-white/70">{c.label}</span>
                <h3 className="h-card">{c.title}</h3>
                <p className="body-lg text-white/80">{c.body}</p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        <CTABanner
          headline="Join the movement."
          body="Partner with Evectus on the African century."
          ctaLabel="Partner With Us"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
