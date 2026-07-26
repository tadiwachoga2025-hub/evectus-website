"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Lenis smooth-scroll root, wrapping every route from `layout.tsx`.
 *
 * `syncTouch: false` leaves touch scrolling native — smoothing a touch scroll
 * fights the platform's own momentum and reads as lag on mobile.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        lerp: 0.1,
        smoothWheel: !reduce,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
