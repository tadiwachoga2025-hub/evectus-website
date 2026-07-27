import type { Metadata } from "next";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { Section, SectionHeader } from "@/components/ui/Section";
import { HairlineGrid, HairlineCell, HairlineList, HairlineRow } from "@/components/ui/Hairline";

const phases = [
  {
    n: "01",
    label: "DISCOVERY & AUDIT",
    title: "We listen. We learn.",
    body: "We analyze your current state without judgment, identifying the ordinary pain points that hold you back.",
  },
  {
    n: "02",
    label: "STRATEGY & DESIGN",
    title: "We blueprint the solution.",
    body: "We design the target system and sequence the roadmap — scope, milestones, and budget defined before implementation begins.",
  },
  {
    n: "03",
    label: "IMPLEMENTATION",
    title: "We execute with precision.",
    body: "Whether it's software code or strategic rollout, we do the work — on time, on budget.",
  },
  {
    n: "04",
    label: "TRANSFER & SUPPORT",
    title: "We transfer knowledge.",
    body: "We don't create dependency. We transfer knowledge to your team and provide ongoing support to ensure sustainability.",
  },
];

const expectations = [
  {
    label: "WEEKLY",
    title: "Status reports & demos",
    body: "Every week you receive a clear progress report and a working demo of what we've built — no surprises, no fluff.",
  },
  {
    label: "BIWEEKLY",
    title: "Stakeholder alignment calls",
    body: "Twice a month we bring your leadership and ours into the same room to validate direction and unblock decisions.",
  },
  {
    label: "ALWAYS",
    title: "Direct partner access via Slack / WhatsApp",
    body: "You will never wait days for an answer. A senior partner is reachable on your channel of choice, every day.",
  },
];

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "The Evectus Method: four disciplined phases from discovery and audit to knowledge transfer — with weekly demos and direct partner access throughout.",
};

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <PageHero
          label="Our Process"
          headline="The Evectus Method: from ordinary to extraordinary."
          body="Four phases, weekly demos, and direct partner access — the discipline behind on-time, on-budget delivery."
          imageSrc="/heroes/process-planning.jpg"
          imageAlt="Whiteboard planning session"
        />

        {/* Four phases */}
        <Section tone="white">
          <SectionHeader
            eyebrow="Four Phases"
            heading="Disciplined. Transparent. Repeatable."
          />
          <HairlineList>
            {phases.map((p) => (
              <HairlineRow key={p.n} className="grid md:grid-cols-[280px_1fr] gap-8">
                <div className="flex flex-col gap-3">
                  <span className="h-stat">{p.n}</span>
                  <span className="label text-[#666666]">{p.label}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="h-card mb-3">{p.title}</h3>
                  <p className="body-lg max-w-2xl text-black/80">{p.body}</p>
                </div>
              </HairlineRow>
            ))}
          </HairlineList>
        </Section>

        {/* What you can expect */}
        <Section tone="paper">
          <SectionHeader
            eyebrow="What You Can Expect"
            heading="A working rhythm built around your team."
          />
          <HairlineGrid columns={3}>
            {expectations.map((e) => (
              <HairlineCell key={e.label}>
                <span className="label text-[#666666]">{e.label}</span>
                <h3 className="h-card">{e.title}</h3>
                <p className="body-md text-black/80">{e.body}</p>
              </HairlineCell>
            ))}
          </HairlineGrid>
        </Section>

        <CTABanner
          headline="See how we work."
          body="Schedule a 30-minute discovery call."
          ctaLabel="Book a Discovery Call"
          ctaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
