"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Evectus Swiss Brutalist Button — pill-shaped buttons with 1px border.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full font-satoshi font-bold uppercase tracking-wider text-xs",
    "transition-all duration-200 ease-out",
    // Accent ring instead of ink-on-ink: #c1552a clears 3:1 non-text contrast
    // (WCAG 1.4.11) against both the paper surface and dark/ink surfaces,
    // so the focus indicator stays visible everywhere in the site,
    // including the final CTA and mobile menu (both dark backgrounds).
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c1552a]",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border border-[#1e1e1e] bg-[#1e1e1e] text-[#f2f2f2] hover:bg-transparent hover:text-[#111111]",
        secondary:
          "border border-[#1e1e1e] bg-transparent text-[#111111] hover:bg-[#1e1e1e] hover:text-[#f2f2f2]",
        light:
          "border border-[#f2f2f2] bg-[#f2f2f2] text-[#111111] hover:bg-transparent hover:text-[#f2f2f2]",
        ghost:
          "border border-[#f2f2f2]/30 bg-transparent text-[#f2f2f2] hover:border-[#f2f2f2] hover:text-[#f2f2f2]",
      },
      size: {
        sm: "px-5 py-2 text-[11px]",
        default: "px-7 py-3 text-xs",
        lg: "px-9 py-4 text-xs",
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
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        {...(asChild ? {} : { type: type ?? "button" })}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
