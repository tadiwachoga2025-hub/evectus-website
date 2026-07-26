import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Surface tone. Four different "darks" were in use across the site
 * (#000, #171717, #14120f, #1e1e1e); `ink` is the single one that stays.
 * Footer keeps its own #1e1e1e — it is deliberately outside this system.
 */
type Tone = "paper" | "white" | "ink";

/**
 * Content shell width. `wide` matches Footer.tsx exactly, so page content
 * lines up with the footer columns.
 */
type Width = "wide" | "narrow" | "prose";

const TONE: Record<Tone, string> = {
  paper: "bg-[#f2f2f2] text-[#111111]",
  white: "bg-white text-[#111111]",
  ink: "bg-[#14120f] text-white",
};

const WIDTH: Record<Width, string> = {
  wide: "max-w-[1440px]",
  narrow: "max-w-[1248px]",
  prose: "max-w-[960px]",
};

/** The one vertical rhythm and gutter for every section on the site. */
const FRAME =
  "px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24";

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  width?: Width;
  /** Anchor target. Pairs with scroll-mt-24 to clear the fixed navbar. */
  id?: string;
  /** Extra classes on the <section> itself — borders, overflow, min-height. */
  className?: string;
  /** Extra classes on the inner container. */
  innerClassName?: string;
}

/**
 * Owns background, vertical rhythm, gutters and container width so that no
 * page has to restate them. Before this existed the site ran three different
 * vertical rhythms and five different desktop gutters.
 */
export function Section({
  children,
  tone = "paper",
  width = "wide",
  id,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${TONE[tone]} ${FRAME}${id ? " scroll-mt-24" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <div
        className={`mx-auto ${WIDTH[width]}${
          innerClassName ? ` ${innerClassName}` : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  body?: string;
  /** Muted variant for use on `ink` sections. */
  onInk?: boolean;
  className?: string;
}

/**
 * Eyebrow + heading + optional lede. Replaces eleven hand-copied
 * `flex flex-col gap-4 mb-16 max-w-3xl` blocks.
 */
export function SectionHeader({
  eyebrow,
  heading,
  body,
  onInk = false,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      y={20}
      className={`mb-14 flex max-w-3xl flex-col gap-4 md:mb-16${
        className ? ` ${className}` : ""
      }`}
    >
      <span className={`label ${onInk ? "text-white/70" : "text-[#666666]"}`}>
        {eyebrow}
      </span>
      <h2 className="h-section">{heading}</h2>
      {body ? (
        <p className={`body-lg ${onInk ? "text-white/80" : "text-[#666666]"}`}>
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

export default Section;
