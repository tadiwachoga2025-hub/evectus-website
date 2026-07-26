"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const SERVICES = [
  {
    n: "01",
    title: "Digital Transformation",
    body: "Replacing outdated legacy infrastructure with modern cloud-native systems, zero-trust security, and real-time operational telemetry.",
    href: "/solutions/digital-transformation",
  },
  {
    n: "02",
    title: "Strategic Consulting",
    body: "Data-driven market entry strategy, regulatory advisory, and digital transformation roadmaps tailored to the African context.",
    href: "/solutions/strategic-consulting",
  },
  {
    n: "03",
    title: "Technology Development",
    body: "Custom web and mobile application engineering, complex API integrations, and proprietary enterprise software solutions.",
    href: "/solutions/technology-development",
  },
  {
    n: "04",
    title: "Operational Excellence",
    body: "Lean workflow analysis, automated process orchestration, and performance scaling that reclaims operational capacity.",
    href: "/solutions/operational-excellence",
  },
] as const;

const CLAIMS = [
  "Zero Cookie-Cutter Fixes",
  "100% On-Time Delivery",
  "95% Milestone Hit-Rate",
  "100% Partner Retention",
  "Built For Africa",
  "Full Knowledge Transfer",
] as const;

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 overflow-hidden bg-[#14120f] text-white">
      <div className="mx-auto max-w-[1248px] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-8 lg:gap-14">
          {/* Right Column — Big Statement.
              Deliberately FIRST in the DOM even though it sits second on md+.
              The `order-*` classes place it visually; source order is what a
              screen reader follows, and the h2 must precede the h3s below it
              (WCAG 1.3.2 Meaningful Sequence). Do not reorder these blocks. */}
          <div className="order-1 flex flex-col md:order-2 md:col-span-7 md:items-end md:text-right">
            <Reveal x={-24} y={0}>
              <p className="font-satoshi text-xs font-bold uppercase tracking-widest text-white/90 md:text-right">
                Four Practice Areas
              </p>
              <p className="mt-2 font-satoshi text-[11px] font-bold uppercase tracking-widest text-white/60 md:text-right">
                Grounded · Engineering · Performance
              </p>
              <h2 className="mt-8 font-clash text-4xl font-bold leading-[0.98] tracking-tight md:mt-10 md:text-6xl lg:text-7xl">
                <span className="block">One partner.</span>
                <span className="block font-serif italic font-normal text-white/80 mt-1">
                  Every solution
                </span>
                <span className="block mt-1">delivered.</span>
              </h2>
              <p className="mt-8 max-w-[52ch] font-satoshi text-base leading-relaxed text-white/80 md:mt-10">
                Four practice areas. One engineering team held to a single standard — measurable outcomes, complete knowledge transfer, and enterprise systems built to outlast the engagement.
              </p>
              <div className="mt-8 md:mt-10">
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 font-satoshi text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Explore Our Solutions
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Left Column — Numbered Capabilities Index */}
          <div className="order-2 md:order-1 md:col-span-5">
            <Reveal y={20}>
              <p className="font-satoshi text-xs font-bold uppercase tracking-widest text-white/70">
                Capabilities Index · Four
              </p>
            </Reveal>

            <RevealGroup stagger={0.07} className="mt-6 border-t border-white/15 md:mt-8">
              {SERVICES.map((s) => (
                <RevealItem key={s.n} y={20} className="border-b border-white/15">
                  <Link
                    href={s.href}
                    className="group flex items-baseline gap-4 py-4 opacity-95 transition-opacity hover:opacity-100 md:gap-5"
                  >
                    <span className="font-satoshi text-xs tracking-widest text-white/50 transition-colors group-hover:text-white/80">
                      {s.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <h3 className="font-satoshi text-lg font-medium leading-tight text-white">
                        {s.title}
                      </h3>
                      <span className="mt-1 block font-satoshi text-sm leading-snug text-white/60">
                        {s.body}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-white/90"
                    />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Bottom 6 Claims Strip — Bento Grid */}
        <Reveal y={24} delay={0.3} className="mt-16 border-t border-white/15 pt-8 md:mt-24 md:pt-10">
          <p className="mb-6 font-satoshi text-xs font-bold uppercase tracking-widest text-white/60">
            The Evectus standard, in six claims
          </p>
          <ul className="grid grid-cols-2 gap-px border border-white/15 bg-white/15 md:grid-cols-3 lg:grid-cols-6">
            {CLAIMS.map((claim, i) => (
              <li
                key={claim}
                className="flex items-baseline gap-2.5 bg-[#14120f] px-4 py-4"
              >
                {/* /45 computed to ~4.4:1 on #14120f — under the 4.5:1 AA floor,
                    and on the smallest type on the site. /60 clears it at ~7:1. */}
                <span className="font-satoshi text-[10px] tracking-widest text-white/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-satoshi text-[11px] font-bold uppercase tracking-widest text-white/90">
                  {claim}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
