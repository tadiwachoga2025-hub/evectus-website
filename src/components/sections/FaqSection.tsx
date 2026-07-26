"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "How does Evectus structure client engagements?",
    a: "We work on fixed-scope deliverables or dedicated engineering sprints with clear milestones and defined KPIs. We never bill on open-ended hourly retainers without explicit outcome commitments.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Initial discovery and architecture design take 2 to 3 weeks. Production deployment for core system MVPs typically ranges from 6 to 12 weeks depending on system complexity and legacy data migration needs.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You retain 100% full ownership of all custom code, data schemas, cloud configurations, and documentation produced during the engagement upon project completion.",
  },
  {
    q: "What support and knowledge transfer take place after handover?",
    a: "Every engagement concludes with comprehensive internal team training, documented operational runbooks, and a 30-day post-launch warranty period with optional long-term SLA support.",
  },
] as const;

export function FaqSection() {
  return (
    <section className="bg-white px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24 border-t border-[#1e1e1e]/10">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-14 text-center">
          <Reveal y={20}>
            <span className="font-satoshi text-xs font-bold uppercase tracking-widest text-[#666666]">
              Frequently Asked Questions
            </span>
            <h2 className="font-clash text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mt-3">
              Common Inquiries
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="flex flex-col">
          {FAQS.map((faq) => (
            <RevealItem
              key={faq.q}
              className="flex flex-col gap-3 border-b border-[#1e1e1e]/10 py-8 md:flex-row md:gap-10"
            >
              <h3 className="md:w-80 shrink-0 font-clash text-lg sm:text-xl font-bold text-[#111111]">
                {faq.q}
              </h3>
              <p className="font-satoshi text-base leading-relaxed text-[#666666]">
                {faq.a}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default FaqSection;
