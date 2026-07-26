"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

type CountUpProps = {
  /** Display value like "+40%", "100%", "-60%". The numeric portion is animated; prefix/suffix preserved. */
  value: string;
  /** Animation duration in ms. Defaults to 1800. */
  duration?: number;
  /** Optional className applied to the wrapping span. */
  className?: string;
};

type Parsed = {
  prefix: string;
  numeric: number;
  suffix: string;
};

function parseValue(raw: string): Parsed {
  const match = raw.match(/^(\D*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", numeric: 0, suffix: raw };
  }
  const [, rawPrefix, num, suffix] = match;
  let prefix = rawPrefix ?? "";
  let numeric = Number(num);
  // Promote a leading "-" from the numeric portion into the prefix so the
  // tween always runs from 0 → |numeric| and the sign is displayed verbatim.
  if (numeric < 0) {
    prefix = `${prefix}-`;
    numeric = Math.abs(numeric);
  }
  return { prefix, numeric, suffix: suffix ?? "" };
}

/**
 * Animated metric counter that tweens 0 → numeric portion of `value` when scrolled into view.
 * Preserves prefixes ("+", "-") and suffixes ("%") around the animated number.
 * Honors prefers-reduced-motion.
 */
export function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const { prefix, numeric, suffix } = parseValue(value);
  const numRef = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const node = numRef.current;
    if (!node) return;

    const write = (n: number) => {
      node.textContent = String(n);
    };

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      write(numeric);
      playedRef.current = true;
      return;
    }

    const trigger = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      const state = { n: 0 };
      animate(state, {
        n: numeric,
        duration,
        ease: "out(3)",
        onUpdate: () => write(Math.round(state.n)),
        onComplete: () => write(numeric),
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            trigger();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [numeric, duration]);

  return (
    <span className={className}>
      {prefix}
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
}

export default CountUp;
