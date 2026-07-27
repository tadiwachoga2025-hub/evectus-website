import type { Metadata } from "next";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineGrid, HairlineCell } from "@/components/ui/Hairline";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const capabilities = [
  {
    title: "Cloud Migration",
    body: "Secure, scalable, cost-effective. We migrate workloads with zero data loss and minimal downtime.",
  },
  {
    title: "Data Analytics",
    body: "Turn your data into actionable intelligence with dashboards your team will actually use.",
  },
  {
    title: "Change Management",
    body: "We shift the culture of your workforce to embrace technology — not resist it.",
  },
];

const steps = [
  { n: "01", label: "Audit" },
  { n: "02", label: "Blueprint" },
  { n: "03", label: "Deploy" },
  { n: "04", label: "Embed" },
];

export const metadata: Metadata = {
  title: "Digital Transformation",
  description:
    "Cloud migration, data analytics, and change management — we modernize infrastructure and embed a digital-first culture with minimal disruption.",
};

export default function DigitalTransformationPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageHero
          label="01 · Digital Transformation"
          headline="Modernize or get left behind."
          body="The world is moving fast. To make Africa a Global Powerhouse, our institutions must be digital, agile, and connected."
        />

        {/* The Challenge */}
        <Section
          tone="white"
          innerClassName="grid md:grid-cols-2 gap-12 items-start"
        >
          <Reveal className="flex flex-col gap-6">
            <span className="label">The Challenge</span>
            <h2 className="h-section">
              Many organizations want to digitize but fear the disruption.
            </h2>
          </Reveal>
          <Reveal className="flex flex-col gap-6" delay={0.1}>
            <p className="body-lg">
              They face siloed data, outdated hardware, and resistant teams.
              This is the &ldquo;ordinary&rdquo; trap — the assumption that
              transformation must be painful, slow, and expensive. We
              disagree.
            </p>
          </Reveal>
        </Section>

        {/* Our Solution */}
        <Section tone="paper">
          <SectionHeader
            eyebrow="The Evectus Solution"
            heading="We handle the entire lifecycle."
          />
          <HairlineGrid columns={3}>
            {capabilities.map((c) => (
              <HairlineCell key={c.title}>
                <h3 className="h-card">{c.title}</h3>
                <p className="body-md text-black/80">{c.body}</p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        {/* Process snapshot */}
        <Section tone="white">
          <SectionHeader
            eyebrow="Process Snapshot"
            heading="From audit to adoption in 90 days."
          />
          <RevealGroup>
            <ol className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-black/10 pt-12">
              {steps.map((s) => (
                <li key={s.n}>
                  <RevealItem className="flex flex-col gap-3">
                    <span className="h-stat">{s.n}</span>
                    <span className="label text-[#666666]">{s.label}</span>
                  </RevealItem>
                </li>
              ))}
            </ol>
          </RevealGroup>
        </Section>

        <CTABanner
          headline="Start your digital journey."
          body="A 30-minute discovery call. Zero obligation."
          ctaLabel="Book Discovery Call"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
