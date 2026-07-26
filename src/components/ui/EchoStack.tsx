"use client";

import React from "react";

interface EchoStackProps {
  /** The text string or node to display in the Echo stack */
  text: string;
  /** Extra CSS classes for the headline container */
  className?: string;
  /**
   * Foreground numeral color. Defaults to "currentColor" so the stack
   * inherits whatever text color its parent has — e.g. it flips
   * automatically when used inside a row that inverts to a dark
   * background on hover (`text-[#111111] group-hover:text-white`).
   */
  color?: string;
}

/**
 * Typographic Echo Stack
 *
 * Layers 5 instances of the headline text.
 * Top layer: inherits color from context (see `color` prop).
 * Layers 2-5: Shifted absolutely by increments of -0.04em, -0.08em, -0.12em, -0.16em.
 * Colors fade across light gray tones (#bfbfbf, #c9c9c9, #d1d1d1, #d9d9d9).
 */
export function EchoStack({ text, className = "", color = "currentColor" }: EchoStackProps) {
  const echoLayers = [
    { offset: "-0.16em", color: "#d9d9d9" },
    { offset: "-0.12em", color: "#d1d1d1" },
    { offset: "-0.08em", color: "#c9c9c9" },
    { offset: "-0.04em", color: "#bfbfbf" },
  ];

  return (
    <div
      className={`relative inline-block select-none font-clash font-bold tracking-[-0.05em] leading-[0.9] text-center ${className}`}
    >
      {/* Background Echo Layers (Layer 5 through 2) */}
      {echoLayers.map((layer, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="absolute left-0 top-0 w-full pointer-events-none transition-transform duration-500"
          style={{
            transform: `translate(${layer.offset}, ${layer.offset})`,
            color: layer.color,
            zIndex: index + 1,
          }}
        >
          {text}
        </span>
      ))}

      {/* Main Foreground Layer (Layer 1) */}
      <span className="relative z-10" style={{ color }}>
        {text}
      </span>
    </div>
  );
}

export default EchoStack;
