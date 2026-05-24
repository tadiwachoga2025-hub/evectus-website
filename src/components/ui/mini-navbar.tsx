"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EvectusLogo } from "@/components/EvectusLogo";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/solutions", label: "Solutions" },
  { href: "/african-agenda", label: "Agenda" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Work" },
];

const mobileItems: NavItem[] = [
  ...navItems,
  { href: "/about", label: "About" },
];

interface AnimatedNavLinkProps {
  href: string;
  children: ReactNode;
}

function AnimatedNavLink({ href, children }: AnimatedNavLinkProps) {
  return (
    <Link
      href={href}
      className="group relative inline-block overflow-hidden h-5 flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-200"
    >
      <span className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-full inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
      >
        {children}
      </span>
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shapeClass, setShapeClass] = useState<"rounded-full" | "rounded-xl">(
    "rounded-full",
  );
  const morphTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (morphTimeout.current) clearTimeout(morphTimeout.current);

    if (isOpen) {
      setShapeClass("rounded-xl");
    } else {
      morphTimeout.current = setTimeout(() => {
        setShapeClass("rounded-full");
      }, 280);
    }

    return () => {
      if (morphTimeout.current) clearTimeout(morphTimeout.current);
    };
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <header
      className={[
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        "flex flex-col items-center",
        "pl-6 pr-6 py-3 backdrop-blur-md",
        "border border-white/15 bg-[#0a0a0a]/85",
        "shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
        "w-[calc(100%-2rem)] sm:w-auto",
        "transition-[border-radius] duration-300 ease-in-out",
        shapeClass,
      ].join(" ")}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Evectus Solutions home"
        >
          <EvectusLogo variant="white" height={28} />
        </Link>

        <nav className="hidden sm:flex items-center space-x-6 text-sm">
          {navItems.map((item) => (
            <AnimatedNavLink key={item.href} href={item.href}>
              {item.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/about"
            className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white border border-white/20 rounded-full bg-white/5 hover:border-white/50 hover:bg-white/10 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative px-4 py-2 text-sm font-semibold text-black bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.25)] hover:shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:from-white hover:to-gray-200 transition-all duration-200 inline-flex items-center justify-center leading-none whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="mini-navbar-mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="sm:hidden flex items-center justify-center text-gray-300 hover:text-white transition-colors"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mini-navbar-mobile-menu"
        className={[
          "sm:hidden w-full overflow-hidden",
          "transition-[max-height,opacity,margin] duration-300 ease-in-out",
          isOpen
            ? "max-h-96 opacity-100 mt-4"
            : "max-h-0 opacity-0 mt-0 pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center gap-3 pb-2">
          {mobileItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={close}
            className="mt-2 w-full px-4 py-2 text-sm font-semibold text-black bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.25)] hover:from-white hover:to-gray-200 transition-all duration-200 flex items-center justify-center leading-none whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
