"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import WipeReveal from "@/components/ui/WipeReveal";

export function ProblemSection() {
  return (
    <section className="bg-white px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-[1248px]">
        <div className="grid items-stretch gap-10 md:grid-cols-12 lg:gap-12">
          {/* Left Column — Editorial Problem Statement */}
          <div className="order-2 flex flex-col md:order-1 md:col-span-7">
            <Reveal y={20}>
              <span className="font-satoshi text-xs font-bold uppercase tracking-widest text-[#666666]">
                The Problem
              </span>
            </Reveal>

            <Reveal y={24} delay={0.1}>
              <h2 className="mt-6 max-w-xl font-clash text-4xl font-bold leading-[1.06] tracking-tight text-[#111111] md:mt-8 md:text-[3.4rem]">
                The reality of enterprise technology today.
              </h2>
            </Reveal>

            <Reveal y={24} delay={0.2}>
              <p className="mt-6 max-w-[58ch] font-satoshi text-lg leading-relaxed text-[#666666] md:mt-8 md:text-xl">
                Legacy systems patched together for over a decade. Off-the-shelf software that ignores local operational context. Consultants who hand over a static slide deck and disappear before implementation. Enterprises are told to accept &ldquo;good enough&rdquo; — and it costs them the growth they are capable of.
              </p>
            </Reveal>

            <Reveal y={24} delay={0.3} className="mt-8 md:mt-auto md:pt-10">
              <Link
                href="/process"
                className="inline-flex items-center justify-center rounded-full bg-[#111111] px-8 py-4 font-satoshi text-xs font-bold uppercase tracking-[0.15em] text-white border border-[#111111] transition-colors duration-200 ease-out hover:bg-transparent hover:text-[#111111]"
              >
                See how we work
              </Link>
            </Reveal>
          </div>

          {/* Right Column — Visual Image Reveal Card */}
          <WipeReveal
            className="relative order-1 min-h-[320px] overflow-hidden rounded-2xl md:order-2 md:col-span-5 md:min-h-[420px] lg:min-h-[460px]"
            delay={0.2}
          >
            {/* Photo by Christina @ wocintechchat.com on Unsplash — https://unsplash.com/photos/rg1y72eKw6o */}
            <Image
              src="/problem-team.jpg"
              alt="Professionals collaborating around a boardroom table with laptops"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </WipeReveal>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
