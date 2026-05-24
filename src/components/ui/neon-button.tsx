"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Evectus monochrome Button.
 *
 * Adapted from a "neon" pill button. Notable design choices:
 * - Rounded-none (editorial / monochrome aesthetic) rather than pill.
 * - All blue accents replaced with white/black/neutral tokens.
 * - Variants are drop-in equivalents for the legacy .btn-primary / .btn-secondary /
 *   .btn-light classes in globals.css (same padding, 13px, 600 weight, 0.15em tracking, uppercase).
 * - `neon` decoration is implemented as Tailwind `before:` / `after:` pseudo-elements
 *   so it works identically whether we render a native <button> or, via `asChild`,
 *   slot the className onto a consumer element such as <Link>. This avoids the
 *   "Slot requires a single child" pitfall and lets us keep <Button asChild><Link/></Button>
 *   working without React.cloneElement gymnastics.
 */
const buttonVariants = cva(
  // Base: shared sizing rhythm + neon-line pseudo-elements (visible only when [data-neon=true])
  [
    "relative inline-flex items-center justify-center overflow-hidden rounded-full",
    "font-semibold uppercase tracking-[0.15em]",
    "border-2 cursor-pointer select-none",
    "transition-[background-color,color,border-color,transform] duration-250 ease-out",
    "hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/60",
    "disabled:pointer-events-none disabled:opacity-50",
    // Top neon line (revealed on hover)
    "data-[neon=true]:before:content-[''] data-[neon=true]:before:absolute",
    "data-[neon=true]:before:top-0 data-[neon=true]:before:left-1/2 data-[neon=true]:before:-translate-x-1/2",
    "data-[neon=true]:before:h-px data-[neon=true]:before:w-3/4",
    "data-[neon=true]:before:bg-gradient-to-r data-[neon=true]:before:from-transparent data-[neon=true]:before:via-white/80 data-[neon=true]:before:to-transparent",
    "data-[neon=true]:before:opacity-0 hover:data-[neon=true]:before:opacity-100",
    "data-[neon=true]:before:transition-opacity data-[neon=true]:before:duration-500",
    // Bottom soft glow line (always at ~30% opacity, brightens on hover)
    "data-[neon=true]:after:content-[''] data-[neon=true]:after:absolute",
    "data-[neon=true]:after:bottom-0 data-[neon=true]:after:left-1/2 data-[neon=true]:after:-translate-x-1/2",
    "data-[neon=true]:after:h-px data-[neon=true]:after:w-3/4",
    "data-[neon=true]:after:bg-gradient-to-r data-[neon=true]:after:from-transparent data-[neon=true]:after:via-white/80 data-[neon=true]:after:to-transparent",
    "data-[neon=true]:after:opacity-30 hover:data-[neon=true]:after:opacity-80",
    "data-[neon=true]:after:transition-opacity data-[neon=true]:after:duration-500",
  ].join(" "),
  {
    variants: {
      variant: {
        // Drop-in for legacy .btn-primary
        primary:
          "bg-black text-white border-black hover:bg-white hover:text-black",
        // Drop-in for legacy .btn-secondary (use on dark backgrounds)
        secondary:
          "bg-transparent text-white border-white hover:bg-white hover:text-black",
        // Drop-in for legacy .btn-light (use on dark backgrounds)
        light:
          "bg-white text-black border-white hover:bg-transparent hover:text-white",
        // Subtle ghost — preserves the original "ghost" intent; pairs with neon lines on dark bgs
        ghost:
          "bg-transparent text-current border-transparent hover:bg-white/10",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        default: "h-11 px-[22px] py-3 text-[13px]",
        lg: "h-12 px-7 text-[14px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the Button merges its props onto its single child element
   * (e.g. a <Link> from next/link) via Radix Slot. Neon decoration is
   * preserved because it lives in CSS pseudo-elements, not DOM children.
   */
  asChild?: boolean;
  /**
   * Toggles the hover-revealed top line + always-on bottom glow.
   * Defaults to true to match the original neon-button source component.
   */
  neon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      neon = true,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-neon={neon ? "true" : "false"}
        // Only set a default type when actually rendering a <button>;
        // forwarding type="button" onto an <a> via Slot would be invalid.
        {...(asChild ? {} : { type: type ?? "button" })}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
