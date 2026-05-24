"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/neon-button";
import { CountUp } from "@/components/ui/count-up";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const promoRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0vh", "150vh"]);

  const { scrollYProgress: promoProgress } = useScroll({
    target: promoRef,
    offset: ["start end", "end start"],
  });
  const promoY = useTransform(promoProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative h-screen overflow-hidden"
        >
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 pointer-events-none"
          >
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=2000&q=80"
              alt="Team collaborating in a modern office"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1440px] h-full px-6 lg:px-10 flex items-center">
            <div className="max-w-5xl text-white flex flex-col gap-6">
              <span className="label text-white/80">
                Driven by integrity · Built on trust · Powered by ingenuity
              </span>
              <h1 className="font-bold tracking-tight leading-[1.05] text-balance text-[clamp(32px,5.2vw,64px)]">
                Shifting the culture. Replacing ordinary with extraordinary.
              </h1>
              <p className="body-lg max-w-xl text-white/85">
                Evectus Solutions bridges the gap between potential and
                performance. We partner with businesses, governments, and
                visionaries to solve complex challenges with ingenuity and
                integrity.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button asChild variant="light">
                  <Link href="/contact">Start Your Transformation</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/solutions">Explore Solutions</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Vision split */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-6 order-2 md:order-1"
            >
              <span className="label">The Vision · 2026</span>
              <h2 className="h-section">
                The African century requires extraordinary solutions.
              </h2>
              <p className="body-lg max-w-xl">
                For too long the narrative has been about potential. The time
                for potential has passed; the time for performance is now. We
                replace ordinary fixes with superior solutions that work.
              </p>
              <Button asChild variant="primary" className="w-fit mt-2">
                <Link href="/african-agenda">Discover Our Mission</Link>
              </Button>
            </motion.div>
            <div className="group relative aspect-[4/5] order-1 md:order-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
                alt="Modern workspace with laptops"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Four pillars */}
        <section className="bg-[#f5f5f5] px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">What We Do</span>
              <h2 className="h-section">
                Four pillars. One standard of excellence.
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-px bg-black/10">
              {[
                {
                  n: "01",
                  title: "Digital Transformation",
                  body: "Legacy systems hold African enterprises back. We modernize infrastructure, migrate data to secure cloud, and embed a digital-first culture.",
                  href: "/solutions/digital-transformation",
                },
                {
                  n: "02",
                  title: "Strategic Consulting",
                  body: "Navigate market shifts, regulatory changes, and expansion with data-driven strategies built for the African context.",
                  href: "/solutions/strategic-consulting",
                },
                {
                  n: "03",
                  title: "Technology Development",
                  body: "Sometimes the solution doesn't exist — so we build it. Custom apps, enterprise software, and integration platforms.",
                  href: "/solutions/technology-development",
                },
                {
                  n: "04",
                  title: "Operational Excellence",
                  body: "Efficiency is the engine of growth. We analyze workflows, identify bottlenecks, and implement lean methods that save time and money.",
                  href: "/solutions/operational-excellence",
                },
              ].map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                >
                  <Link
                    href={p.href}
                    className="group bg-white p-10 lg:p-12 flex flex-col gap-4 hover:bg-black hover:text-white transition-colors duration-300 h-full"
                  >
                    <span className="label text-[#A3A3A3] group-hover:text-white/60">
                      {p.n}
                    </span>
                    <h3 className="h-card">{p.title}</h3>
                    <p className="body-md text-black/80 group-hover:text-white/85">
                      {p.body}
                    </p>
                    <span className="label mt-4 group-hover:text-white">
                      Learn More →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promo parallax statement */}
        <section
          ref={promoRef}
          className="relative flex items-center justify-center h-screen overflow-hidden"
        >
          <motion.div
            style={{ y: promoY }}
            className="absolute inset-0 -top-[10%] h-[120%] pointer-events-none"
          >
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=2000&q=80"
              alt="Collaborative workspace"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-[1440px] h-full w-full px-6 lg:px-10 flex flex-col justify-between py-16">
            <span className="label text-white">Our Core Values</span>
            <h2 className="h-hero text-white max-w-5xl self-end text-right">
              Integrity. Trust. Ingenuity.
              <br />
              The three pillars of every solution we deliver.
            </h2>
          </div>
        </section>

        {/* Impact metrics */}
        <section className="bg-white px-6 lg:px-10 py-24 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUART }}
              className="flex flex-col gap-4 mb-16 max-w-3xl"
            >
              <span className="label">Impact That Speaks</span>
              <h2 className="h-section">Numbers behind the narrative.</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-black/10 pt-12">
              {[
                { v: "+40%", l: "Operational Efficiency" },
                { v: "100%", l: "Digital Adoption" },
                { v: "95%", l: "Milestone Hit-Rate" },
                { v: "100%", l: "Partner Retention" },
              ].map((m, i) => (
                <motion.div
                  key={m.l}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-2"
                >
                  <CountUp
                    value={m.v}
                    className="text-5xl md:text-6xl font-bold tracking-tight"
                  />
                  <span className="label text-[#A3A3A3]">{m.l}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
            >
              <blockquote className="mt-20 text-2xl md:text-3xl max-w-3xl font-medium leading-snug">
                &ldquo;Evectus didn&rsquo;t just fix our problem; they changed
                how we think about our business.&rdquo;
              </blockquote>
              <Button asChild variant="primary" className="mt-10 w-fit">
                <Link href="/case-studies">See Our Case Studies</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-black text-white px-6 lg:px-10 py-32">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
            className="mx-auto max-w-[1100px] text-center flex flex-col items-center gap-6"
          >
            <span className="label text-white/70">Ready?</span>
            <motion.h2
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE_OUT_QUART }}
              className="h-section"
            >
              Ready to shift the culture?
            </motion.h2>
            <p className="body-lg text-white/80 max-w-2xl">
              The ordinary path leads to ordinary results. Take the
              extraordinary path. Partner with Evectus Solutions to unlock your
              organization&rsquo;s full potential.
            </p>
            <Button asChild variant="light" className="mt-4">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
