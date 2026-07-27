"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { EvectusLogo } from "@/components/EvectusLogo";

const solutions = [
  { href: "/products", label: "Products" },
  { href: "/solutions/digital-transformation", label: "Digital Transformation" },
  { href: "/solutions/strategic-consulting", label: "Strategic Consulting" },
  { href: "/solutions/technology-development", label: "Technology Development" },
  { href: "/solutions/operational-excellence", label: "Operational Excellence" },
];

const company = [
  { href: "/about", label: "About Us" },
  { href: "/african-agenda", label: "African Agenda" },
  { href: "/process", label: "Process & Method" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/privacy", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#1e1e1e] text-[#f6f6f6]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 lg:px-16">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Col 1: Brand Summary */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Evectus home">
              <EvectusLogo variant="white" height={28} />
            </Link>
            <p className="font-satoshi text-sm leading-relaxed text-[#f6f6f6]/60 max-w-sm">
              Bridging the gap between potential and performance. Partnering with enterprises across Africa to solve complex problems with integrity and ingenuity.
            </p>
            <p className="font-satoshi text-xs uppercase tracking-widest text-[#f6f6f6]/60">
              © 2026 Evectus Solutions
            </p>
          </div>

          {/* Col 2: Solutions Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-satoshi text-xs font-bold uppercase tracking-widest text-[#f6f6f6]/80">
              Solutions
            </h3>
            {/* py-2 on each link grows the tap target from ~16px to ~32px;
                the ul's gap drops to 0 and -my-2 trims the ends so the
                column's visual rhythm stays where it was. */}
            <ul className="-my-2 flex flex-col">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-2 font-satoshi text-sm text-[#f6f6f6]/60 transition-colors duration-200 hover:text-[#f6f6f6]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-satoshi text-xs font-bold uppercase tracking-widest text-[#f6f6f6]/80">
              Company
            </h3>
            <ul className="-my-2 flex flex-col">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-2 font-satoshi text-sm text-[#f6f6f6]/60 transition-colors duration-200 hover:text-[#f6f6f6]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Details with Lucide Line Icons */}
          <div className="flex flex-col gap-4">
            <h3 className="font-satoshi text-xs font-bold uppercase tracking-widest text-[#f6f6f6]/80">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-[#f6f6f6]/60">
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="h-4 w-4 text-[#f6f6f6]/60 shrink-0" />
                {/* py-2 -my-2 enlarges the tap target without shifting the
                    row's flex centering; the neighbour below is plain text,
                    so the extended hit area overlaps nothing interactive. */}
                <a
                  href="mailto:evectussolution@gmail.com"
                  className="-my-2 inline-block py-2 transition-colors hover:text-[#f6f6f6]"
                >
                  evectussolution@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="h-4 w-4 text-[#f6f6f6]/60 shrink-0" />
                <span>Harare · Zimbabwe</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-satoshi text-xs font-bold uppercase tracking-wider text-[#f6f6f6] transition-all duration-200 hover:border-white hover:bg-white hover:text-[#1e1e1e]"
              >
                <span>Book Consultation</span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Large Branding Bar */}
        <div className="mt-16 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full max-w-[480px]" aria-hidden="true">
            <EvectusLogo variant="white" className="w-full h-auto opacity-30" />
          </div>
          <span className="font-satoshi text-xs uppercase tracking-widest text-[#f6f6f6]/60 text-center md:text-right">
            Making Africa a Global Powerhouse
          </span>
        </div>
      </div>
    </footer>
  );
}
