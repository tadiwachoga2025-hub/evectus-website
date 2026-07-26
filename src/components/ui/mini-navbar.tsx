"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EvectusLogo } from "@/components/EvectusLogo";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/products", label: "Products" },
  { href: "/african-agenda", label: "Agenda" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Work" },
];

const solutionsItems: NavItem[] = [
  { href: "/solutions/digital-transformation", label: "Digital Transformation" },
  { href: "/solutions/strategic-consulting", label: "Strategic Consulting" },
  { href: "/solutions/technology-development", label: "Technology Development" },
  { href: "/solutions/operational-excellence", label: "Operational Excellence" },
];

const mobileItems: NavItem[] = [
  { href: "/solutions", label: "Solutions" },
  ...navItems,
  { href: "/about", label: "About" },
];

/**
 * Single canonical site navbar.
 *
 * `overlay` renders the transparent-on-dark treatment used over the
 * homepage's full-bleed hero image — white text/logo until the user
 * scrolls past the hero, then it resolves to the same solid paper bar
 * used on every inner page. Without `overlay` it renders that solid
 * bar immediately (the previous inner-page-only behavior, unchanged).
 */
export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!overlay);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Overlay mode: resolve from transparent/white to the solid paper bar
  // once the user scrolls past ~70% of the viewport height (roughly the
  // hero's height), so the bar never fights with hero copy underneath it.
  useEffect(() => {
    if (!overlay) return;

    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [overlay]);

  // Solutions dropdown: opens on click/keyboard, hover is a progressive
  // enhancement for mouse users. Closes on outside click, Escape, or
  // selecting a link.
  useEffect(() => {
    if (!isSolutionsOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        solutionsRef.current &&
        !solutionsRef.current.contains(event.target as Node)
      ) {
        setIsSolutionsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsSolutionsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSolutionsOpen]);

  const isDark = overlay && !scrolled;

  const linkClass = isDark
    ? "font-satoshi text-[14px] font-medium uppercase tracking-wider text-white transition-colors duration-120 hover:text-white/70"
    : "font-satoshi text-[14px] font-medium uppercase tracking-wider text-[#111111] transition-colors duration-120 hover:text-[#666666]";

  return (
    <header
      className={`${overlay ? "fixed" : "sticky"} top-0 z-50 h-20 w-full transition-colors duration-300 ${
        isDark
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[#1e1e1e]/10 bg-[#f2f2f2]/90 backdrop-blur-[12px]"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
        {/* Logo — left */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Evectus Solutions home"
        >
          <EvectusLogo variant={isDark ? "white" : "color"} height={26} />
        </Link>

        {/* Nav — centre */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {/* Solutions dropdown */}
          <div ref={solutionsRef} className="relative group">
            <button
              type="button"
              onClick={() => setIsSolutionsOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isSolutionsOpen}
              className={`flex items-center gap-1 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c1552a] ${
                isDark
                  ? "text-white hover:text-white/70 focus-visible:ring-offset-black"
                  : "text-[#111111] hover:text-[#666666] focus-visible:ring-offset-[#f2f2f2]"
              } font-satoshi text-[14px] font-medium uppercase tracking-wider transition-colors duration-120`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${isSolutionsOpen ? "translate-y-0.5" : "group-hover:translate-y-0.5"}`}
                aria-hidden="true"
              />
            </button>

            <div
              inert={!isSolutionsOpen}
              className={`absolute left-0 top-full mt-2 w-64 rounded-xl border border-[#1e1e1e]/10 bg-[#f4f3f0] p-2 shadow-[0_8px_24px_-8px_rgba(20,18,15,0.24)] transition-opacity duration-200 ${
                isSolutionsOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {solutionsItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSolutionsOpen(false)}
                  className="block rounded-lg px-4 py-2.5 font-satoshi text-xs uppercase tracking-wider text-[#111111] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c1552a]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle — right */}
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className={`hidden md:inline-block ${linkClass}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`hidden rounded-full px-6 py-2.5 font-satoshi text-[14px] font-medium uppercase tracking-wider transition-all duration-200 md:inline-block ${
              isDark
                ? "border border-white bg-white text-[#111111] hover:bg-transparent hover:text-white"
                : "border border-[#1e1e1e] bg-transparent text-[#111111] hover:bg-[#1e1e1e] hover:text-[#f2f2f2]"
            }`}
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`p-2 md:hidden ${isDark ? "text-white" : "text-[#111111]"}`}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — always the solid paper drawer regardless of overlay
          state, since it renders as an opaque panel either way. */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        className={[
          "overflow-hidden border-t border-[#1e1e1e]/10 bg-[#f2f2f2]/95 backdrop-blur-[12px] md:hidden",
          "transition-[max-height,opacity] duration-300 ease-in-out",
          isOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none border-transparent",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center gap-4 py-6">
          {mobileItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-satoshi text-[14px] font-medium uppercase tracking-wider text-[#111111] transition-colors hover:text-[#666666]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={close}
            className="mt-2 rounded-full border border-[#1e1e1e] bg-[#1e1e1e] px-8 py-3 font-satoshi text-[14px] font-medium uppercase tracking-wider text-[#f2f2f2]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
