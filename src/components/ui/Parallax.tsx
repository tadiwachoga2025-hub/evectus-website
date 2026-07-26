"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Drift in percent of the layer's own height, applied symmetrically
   * (-amount at the bottom of the viewport, +amount at the top).
   */
  amount?: number;
}

/**
 * Scroll-linked parallax layer. Fills its nearest positioned ancestor, which
 * must be `relative overflow-hidden`.
 *
 * The moving layer is 130% of the container's height and offset -15%, so the
 * drift never exposes an edge — callers do not need to compensate with scale.
 *
 * The scroll target is the outer, untransformed wrapper. Measuring the moving
 * layer instead would feed its own transform back into the progress value.
 */
export function Parallax({ children, className, amount = 6 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-amount}%`, `${amount}%`],
  );

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-x-0 top-[-15%] h-[130%]"
        style={reduce ? undefined : { y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Parallax;
