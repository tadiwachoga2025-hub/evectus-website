"use client";

import CountUp from "@/components/ui/count-up";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export interface Stat {
  label: string;
  value: string;
}

interface StatStripProps {
  stats: readonly Stat[];
  /** Muted variant for use on `ink` sections. */
  onInk?: boolean;
  className?: string;
}

/**
 * Four-up metric row. Label above value, hairline grid, animated counters.
 *
 * The `sr-only` value plus `aria-hidden` wrapper matters: CountUp tweens up
 * from a literal "0", so without this a screen reader announces whatever frame
 * the tween happens to be on.
 */
export function StatStrip({ stats, onInk = false, className }: StatStripProps) {
  const border = onInk ? "border-white/15" : "border-[#1e1e1e]/10";
  const labelColor = onInk ? "text-white/60" : "text-[#666666]";
  const valueColor = onInk ? "text-white" : "text-[#111111]";

  return (
    <RevealGroup
      className={`grid grid-cols-2 md:grid-cols-4 ${className ?? ""}`}
    >
      {stats.map((s) => (
        <RevealItem
          key={s.label}
          y={20}
          // nth-child rules rather than `last:`: on the mobile 2-column grid a
          // blanket border-r leaves a rule hanging off the right edge, and a
          // blanket border-b leaves one under the final row.
          className={`${border} p-5 text-center odd:border-r [&:nth-child(-n+2)]:border-b md:border-r md:p-8 md:last:border-r-0 md:[&:nth-child(-n+2)]:border-b-0`}
        >
          <span className={`label block ${labelColor}`}>{s.label}</span>
          <span className="sr-only">{s.value}</span>
          <span aria-hidden="true">
            <CountUp value={s.value} className={`h-stat mt-2 block ${valueColor}`} />
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export default StatStrip;
