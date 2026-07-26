"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/components/ui/Reveal";

interface WipeRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
}

/**
 * Reveals its children with a left-to-right clip-path wipe rather than a
 * fade-up. Used for image cards, where a wipe reads as deliberate and a
 * fade reads as a slow image load.
 *
 * Under `prefers-reduced-motion` it falls back to a plain fade.
 */
export function WipeReveal({ children, className, delay = 0 }: WipeRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 0 100%)", opacity: 0.3 }}
      whileInView={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default WipeReveal;
