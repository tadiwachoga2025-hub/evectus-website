import type { Metadata } from "next";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import {
  HairlineGrid,
  HairlineCell,
  HairlineList,
  HairlineRow,
} from "@/components/ui/Hairline";

const deliverables = [
  {
    n: "01",
    title: "Market Entry Analysis",
    body: "Understanding the African consumer is nuanced. We provide deep-dive research and cultural insight that maps the real path to revenue.",
  },
  {
    n: "02",
    title: "Business Restructuring",
    body: "Sometimes you need to tear down to build up. We streamline organizational structures for agility and resilience.",
  },
  {
    n: "03",
    title: "Growth Strategy",
    body: "We identify revenue streams and partnerships that align with the Global Powerhouse vision — and execute against them.",
  },
];

const formats = [
  {
    title: "Sprint",
    duration: "2–3 weeks",
    body: "Focused diagnosis on a single high-stakes question.",
  },
  {
    title: "Roadmap",
    duration: "8–12 weeks",
    body: "Full strategy build with phased execution plan.",
  },
  {
    title: "Embed",
    duration: "3–6 months",
    body: "On-the-ground execution alongside your leadership team.",
  },
];

export const metadata: Metadata = {
  title: "Strategic Consulting",
  description:
    "Market entry analysis, business restructuring, and growth strategy built on data and local insight — delivered as sprints, roadmaps, or embedded teams.",
};

export default function StrategicConsultingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageHero
          label="02 · Strategic Consulting"
          headline="Navigate the future with clarity."
          body="Ambition requires a roadmap. Whether entering a new market or restructuring for growth, Evectus provides strategic foresight to mitigate risk and maximize reward."
        />

        {/* What we deliver */}
        <Section tone="white">
          <SectionHeader
            eyebrow="What We Deliver"
            heading="Strategy built for the African context."
          />
          <HairlineList>
            {deliverables.map((d) => (
              <HairlineRow
                key={d.n}
                className="grid md:grid-cols-[120px_1fr_2fr] gap-8 items-start"
              >
                <span className="h-stat">{d.n}</span>
                <h3 className="h-card">{d.title}</h3>
                <p className="body-lg text-black/80">{d.body}</p>
              </HairlineRow>
            ))}
          </HairlineList>
        </Section>

        {/* Engagement formats */}
        <Section tone="white">
          <SectionHeader
            eyebrow="Engagement Formats"
            heading="Match the work to the moment."
          />
          <HairlineGrid columns={3}>
            {formats.map((f) => (
              <HairlineCell key={f.title}>
                <span className="label text-[#666666]">Format</span>
                <h3 className="h-card">{f.title}</h3>
                <span className="label">{f.duration}</span>
                <p className="body-md text-black/80">{f.body}</p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        <CTABanner
          headline="Strategize with us."
          body="A 30-minute call to scope your challenge."
          ctaLabel="Book a Strategy Session"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
