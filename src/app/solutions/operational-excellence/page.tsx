import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineList, HairlineRow } from "@/components/ui/Hairline";
import StatStrip from "@/components/ui/StatStrip";

const steps = [
  {
    n: "01",
    title: "Process Optimization",
    body: "We map, analyze, and redesign your business processes to eliminate waste — typically reclaiming 30%+ of operational capacity.",
  },
  {
    n: "02",
    title: "Supply Chain Management",
    body: "Streamlining logistics so your product arrives faster, cheaper, more reliably.",
  },
  {
    n: "03",
    title: "Quality Assurance",
    body: "Implementing standards that ensure consistency, trust, and pride in your output.",
  },
];

const metrics = [
  { value: "+40%", label: "Efficiency Gain" },
  { value: "-60%", label: "Faster Processing" },
  { value: "95%", label: "Milestone Hit-Rate" },
  { value: "100%", label: "Partner Retention" },
];

export default function OperationalExcellencePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="04 · Operational Excellence"
          headline="Efficiency is the currency of growth."
          body="Great ideas fail in execution. Evectus ensures your operations are as extraordinary as your vision. We replace chaos with order — and order with precision."
        />

        {/* How we optimize */}
        <Section tone="white">
          <SectionHeader eyebrow="Our Approach" heading="How we optimize." />
          <HairlineList>
            {steps.map((s) => (
              <HairlineRow
                key={s.n}
                className="grid md:grid-cols-[120px_1fr_2fr] gap-8 items-start"
              >
                <span className="h-stat text-[#666666]">{s.n}</span>
                <h3 className="h-card">{s.title}</h3>
                <p className="body-lg text-black/80">{s.body}</p>
              </HairlineRow>
            ))}
          </HairlineList>
        </Section>

        {/* Numbers */}
        <Section tone="paper">
          <SectionHeader eyebrow="Numbers" heading="Outcomes we deliver." />
          <StatStrip stats={metrics} />
        </Section>

        <CTABanner
          headline="Optimize your business."
          body="See where you'll save first."
          ctaLabel="Book an Optimization Audit"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
