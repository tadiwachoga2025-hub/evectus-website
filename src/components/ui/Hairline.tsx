"use client";

import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Tone = "light" | "ink";

/**
 * The `gap-px` trick: a 1px-gap grid over a tinted parent renders as hairline
 * rules with no doubled borders at the joins. Three different mechanisms were
 * in use for this across the site (`gap-px` grid, `gap-px` flex, per-row
 * `border-t`); this is the one that survives.
 */
const GRID_TONE: Record<Tone, string> = {
  light: "bg-[#1e1e1e]/10",
  ink: "bg-white/15",
};

const CELL_TONE: Record<Tone, string> = {
  light: "bg-white",
  ink: "bg-[#14120f]",
};

const COLUMNS: Record<2 | 3 | 4, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

interface HairlineGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  tone?: Tone;
  className?: string;
}

export function HairlineGrid({
  children,
  columns = 3,
  tone = "light",
  className,
}: HairlineGridProps) {
  return (
    <RevealGroup
      className={`grid gap-px ${COLUMNS[columns]} ${GRID_TONE[tone]}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </RevealGroup>
  );
}

interface HairlineCellProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

/** One cell of a `HairlineGrid`. Must be a direct child of one. */
export function HairlineCell({
  children,
  tone = "light",
  className,
}: HairlineCellProps) {
  return (
    <RevealItem
      y={20}
      className={`flex h-full flex-col gap-4 p-8 md:p-10 lg:p-12 ${CELL_TONE[tone]}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </RevealItem>
  );
}

interface HairlineListProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

/**
 * Stacked rows separated by rules. Unlike the previous per-row `border-t`
 * approach, the closing rule is on the container, so the last row is ruled too.
 */
export function HairlineList({
  children,
  tone = "light",
  className,
}: HairlineListProps) {
  const border = tone === "ink" ? "border-white/15" : "border-[#1e1e1e]/10";
  return (
    <RevealGroup
      className={`flex flex-col border-b ${border}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </RevealGroup>
  );
}

interface HairlineRowProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

/** One row of a `HairlineList`. Must be a direct child of one. */
export function HairlineRow({
  children,
  tone = "light",
  className,
}: HairlineRowProps) {
  const border = tone === "ink" ? "border-white/15" : "border-[#1e1e1e]/10";
  return (
    <RevealItem
      y={20}
      className={`border-t ${border} py-8 md:py-10${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </RevealItem>
  );
}
