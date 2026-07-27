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
  const solutionsButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

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
      if (event.key === "Escape") {
        // Closing sets the panel inert, which would silently drop focus to
        // <body> if it was inside — restore it to the disclosure button.
        // Guarded so a document-wide Escape elsewhere doesn't steal focus.
        const hadFocus = solutionsRef.current?.contains(document.activeElement);
        setIsSolutionsOpen(false);
        if (hadFocus) solutionsButtonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSolutionsOpen]);

  // Mobile drawer: Escape closes it and returns focus to the toggle button,
  // matching the disclosure pattern the Solutions dropdown already follows.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const isDark = overlay && !scrolled;

  // py-2 grows each link's hit area from ~21px to ~37px. The bar is a fixed
  // h-20 with items-center, so the padding enlarges the target without
  // moving anything visually.
  const linkClass = isDark
    ? "py-2 font-satoshi text-[14px] font-medium uppercase tracking-wider text-white transition-colors duration-120 hover:text-white/70"
    : "py-2 font-satoshi text-[14px] font-medium uppercase tracking-wider text-[#111111] transition-colors duration-120 hover:text-[#666666]";

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
        <nav className="hidden items-center gap-8 lg:flex lg:gap-10">
          {/* Solutions dropdown */}
          <div ref={solutionsRef} className="relative group">
            <button
              ref={solutionsButtonRef}
              type="button"
              onClick={() => setIsSolutionsOpen((prev) => !prev)}
              aria-expanded={isSolutionsOpen}
              aria-controls="solutions-panel"
              className={`flex items-center gap-1 py-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c1552a] ${
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
              id="solutions-panel"
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
            className={`hidden lg:inline-block ${linkClass}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`hidden rounded-full px-6 py-2.5 font-satoshi text-[14px] font-medium uppercase tracking-wider transition-all duration-200 lg:inline-block ${
              isDark
                ? "border border-white bg-white text-[#111111] hover:bg-transparent hover:text-white"
                : "border border-[#1e1e1e] bg-transparent text-[#111111] hover:bg-[#1e1e1e] hover:text-[#f2f2f2]"
            }`}
          >
            Contact
          </Link>
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`p-2 lg:hidden ${isDark ? "text-white" : "text-[#111111]"}`}
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
          "overflow-hidden border-t border-[#1e1e1e]/10 bg-[#f2f2f2]/95 backdrop-blur-[12px] lg:hidden",
          "transition-[max-height,opacity] duration-300 ease-in-out",
          isOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none border-transparent",
        ].join(" ")}
      >
        {/* py-2.5 on each link lifts the tap target to ~41px. The old
            16px gap-4 is absorbed into the links' combined 20px padding,
            and py-6 → py-3.5 keeps the drawer's overall height close to
            what it was. */}
        <nav className="flex flex-col items-center py-3.5">
          {mobileItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="py-2.5 font-satoshi text-[14px] font-medium uppercase tracking-wider text-[#111111] transition-colors hover:text-[#666666]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={close}
            className="mt-3.5 rounded-full border border-[#1e1e1e] bg-[#1e1e1e] px-8 py-3 font-satoshi text-[14px] font-medium uppercase tracking-wider text-[#f2f2f2]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
