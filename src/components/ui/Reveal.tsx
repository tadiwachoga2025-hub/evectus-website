"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The single shared easing curve for the whole site — an expo-out.
 * Ported from the Vertex Legal AI motion system, replacing the
 * cubic-bezier(0.22,1,0.36,1) that was previously duplicated per-file.
 */
export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
  /** translateY offset in px (default 28) */
  y?: number;
  /** translateX offset in px (default 0) */
  x?: number;
}

/**
 * Viewport-triggered reveal. Fades in and slides into place once, the first
 * time the element enters the viewport.
 *
 * Under `prefers-reduced-motion` it fades without translating.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's reveal (default 0.08) */
  stagger?: number;
}

/**
 * Orchestrates a cascade across its `RevealItem` children, so lists and grids
 * no longer have to hand-compute `delay={i * 0.08}` at every call site.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: RevealGroupProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  /** translateY offset in px (default 28) */
  y?: number;
}

/** A single step in a `RevealGroup` cascade. Must be a descendant of one. */
export function RevealItem({ children, className, y = 28 }: RevealItemProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

export default Reveal;
