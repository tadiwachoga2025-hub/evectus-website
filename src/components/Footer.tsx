"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";

const WORDMARK = "EVECTUS";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

const solutions = [
  { href: "/solutions/digital-transformation", label: "Digital Transformation" },
  { href: "/solutions/strategic-consulting", label: "Strategic Consulting" },
  { href: "/solutions/technology-development", label: "Technology Development" },
  { href: "/solutions/operational-excellence", label: "Operational Excellence" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/african-agenda", label: "African Agenda" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
];

export default function Footer() {
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = wordmarkRef.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Reveal letters immediately when reduced motion is preferred.
      const letters = node.querySelectorAll<HTMLSpanElement>(":scope > span");
      letters.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      });
      return;
    }

    const letters = node.querySelectorAll<HTMLSpanElement>(":scope > span");
    if (letters.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate(letters, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 700,
              delay: stagger(80),
              ease: "out(4)",
            });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="bg-[#171717] text-white px-6 lg:px-10 pt-10 sm:pt-14 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 flex flex-col">
      <div className="mx-auto max-w-[1440px] w-full flex flex-col">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
            <span className="label text-[#A3A3A3]">Solutions</span>
            {solutions.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm sm:text-base hover:text-[#A3A3A3] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
            <span className="label text-[#A3A3A3]">Company</span>
            {company.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm sm:text-base hover:text-[#A3A3A3] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
            <span className="label text-[#A3A3A3]">Contact</span>
            <a
              href="mailto:evectussolution@gmail.com"
              className="text-sm sm:text-base hover:text-[#A3A3A3] transition-colors"
            >
              evectussolution@gmail.com
            </a>
            <span className="text-sm sm:text-base text-white/80">Harare, Zimbabwe</span>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
            <span className="label text-[#A3A3A3]">Engage</span>
            <Link
              href="/contact"
              className="text-sm sm:text-base hover:text-[#A3A3A3] transition-colors"
            >
              Book a Consultation
            </Link>
            <Link
              href="/case-studies"
              className="text-sm sm:text-base hover:text-[#A3A3A3] transition-colors"
            >
              Request Case Deck
            </Link>
          </div>
        </motion.div>

        <div className="overflow-hidden flex items-end">
          <motion.h2
            ref={wordmarkRef}
            initial={{ y: 80 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE_OUT_QUART }}
            style={{ fontSize: "clamp(56px, 16vw, 240px)" }}
            className="font-bold text-white leading-[0.85] tracking-[-0.04em] w-full origin-bottom"
            aria-label={WORDMARK}
          >
            {[...WORDMARK].map((c, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="inline-block opacity-0"
              >
                {c}
              </span>
            ))}
          </motion.h2>
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm tracking-wide text-white/70 uppercase">
            © 2026 Evectus Solutions
          </span>
          <span className="text-xs sm:text-sm tracking-wide text-white/70 uppercase">
            Making Africa a Global Powerhouse
          </span>
        </div>
      </div>
    </footer>
  );
}
