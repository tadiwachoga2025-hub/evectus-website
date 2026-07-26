"use client";

import CountUp from "@/components/ui/count-up";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** Real, already-published figures from Evectus case studies */
const OUTCOMES = [
  { value: "5", label: "Products Shipped" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "95%", label: "Milestone Hit-Rate" },
  { value: "100%", label: "Partner Retention" },
] as const;

export function OutcomesStrip() {
  return (
    <section className="bg-[#f2f2f2] px-6 py-12 md:px-12 md:py-16 lg:px-16 border-y border-[#1e1e1e]/10">
      <div className="mx-auto max-w-[1440px]">
        {/* Plain divs, matching Vertex's StatsStrip. A <dl> cannot be used here:
            RevealGroup and RevealItem each render a wrapper element, and the
            spec allows only one level of <div> between <dl> and its <dt>/<dd>. */}
        <RevealGroup className="grid grid-cols-2 md:grid-cols-4">
          {OUTCOMES.map((o) => (
            <RevealItem
              key={o.label}
              className="border-[#1e1e1e]/10 p-5 text-center odd:border-r [&:nth-child(-n+2)]:border-b md:border-r md:p-8 md:last:border-r-0 md:[&:nth-child(-n+2)]:border-b-0"
            >
              <span className="block font-satoshi text-xs font-bold uppercase tracking-widest text-[#666666]">
                {o.label}
              </span>
              {/* The counter tweens up from 0, so expose the settled figure
                  to assistive tech rather than whatever frame it is on. */}
              <span className="sr-only">{o.value}</span>
              <span aria-hidden="true">
                <CountUp
                  value={o.value}
                  className="mt-2 block font-clash text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111]"
                />
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default OutcomesStrip;
