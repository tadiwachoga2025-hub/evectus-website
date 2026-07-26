"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline progress bar pinned to the top of the viewport.
 *
 * `mix-blend-difference` inverts against whatever is behind it, so a single
 * white bar stays legible over both the paper sections and the dark ones
 * without needing a brand colour of its own.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-white mix-blend-difference"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;
