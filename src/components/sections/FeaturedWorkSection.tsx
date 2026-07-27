"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const PROJECTS = [
  {
    title: "SchoolPulse",
    category: "Education & Classroom Management",
    description: "Real-time analytics and management system for institutional education scaling across southern Africa.",
    outcome: "Automated 80% of manual admin work for teachers",
    image: "/heroes/work-schoolpulse.jpg",
    href: "/case-studies#schoolpulse",
  },
  {
    title: "LegalPro Platform",
    category: "Legal & Regulatory Compliance",
    description: "Comprehensive case management, deadline tracking, and document intelligence platform.",
    outcome: "Unified case tracking, billing, and document management",
    image: "/heroes/work-legalpro.jpg",
    href: "/case-studies#legalpro",
  },
  {
    title: "Healing Institute TV",
    category: "Digital Media & Streaming",
    description: "High-concurrency streaming infrastructure and content distribution ecosystem.",
    outcome: "Global reach with sub-2s stream latency",
    image: "/heroes/work-streaming.jpg",
    href: "/case-studies#healing-institute",
  },
] as const;

export function FeaturedWorkSection() {
  return (
    <section className="bg-[#f2f2f2] px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1e1e1e]/10 pb-8">
          <Reveal y={20}>
            <span className="font-satoshi text-xs font-bold uppercase tracking-widest text-[#666666]">
              Featured Engagements
            </span>
            <h2 className="font-clash text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] mt-2">
              Selected Case Studies
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <p className="font-satoshi text-sm text-[#666666] max-w-md">
              Real enterprise platforms engineered to global standards and running live across production environments.
            </p>
          </Reveal>
        </div>

        {/* 3-Column Showcase Grid */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <RevealItem key={project.title} y={24} className="h-full">
              <Link
                href={project.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-white border border-[#1e1e1e]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-7">
                  <div>
                    <span className="font-satoshi text-[11px] font-bold uppercase tracking-widest text-[#666666]">
                      {project.category}
                    </span>
                    <h3 className="font-clash text-2xl font-bold tracking-tight text-[#111111] mt-2">
                      {project.title}
                    </h3>
                    <p className="font-satoshi text-sm leading-relaxed text-[#666666] mt-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <span className="font-satoshi text-[11px] font-bold uppercase tracking-widest text-[#c1552a]">
                      {project.outcome}
                    </span>
                    <div className="mt-3 flex items-center gap-2 font-satoshi text-xs font-bold uppercase tracking-wider text-[#111111] group-hover:text-[#c1552a] transition-colors">
                      Read Case Study &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default FeaturedWorkSection;
