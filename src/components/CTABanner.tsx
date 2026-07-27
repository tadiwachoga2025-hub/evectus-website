import Link from "next/link";
import { Button } from "@/components/ui/neon-button";
import { Reveal } from "@/components/ui/Reveal";

export default function CTABanner({
  headline,
  body,
  ctaLabel = "Book a Consultation",
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
  finePrint,
}: {
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional secondary ghost-outline action, rendered beside the primary CTA. */
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Optional small reassurance line under the CTA(s), e.g. "No obligation." */
  finePrint?: string;
}) {
  return (
    <section className="bg-[#14120f] text-white px-6 py-28 md:px-12 md:py-36 lg:px-20 lg:py-44">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center md:gap-8">
        <Reveal y={20}>
          <p className="text-xs uppercase tracking-widest text-white/70">
            Ready to Begin?
          </p>
        </Reveal>
        <Reveal y={24} delay={0.1}>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
            {headline}
          </h2>
        </Reveal>
        {body && (
          <Reveal y={24} delay={0.2}>
            <p className="max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              {body}
            </p>
          </Reveal>
        )}
        <Reveal y={24} delay={0.3}>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="light">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
            {secondaryCtaLabel && secondaryCtaHref && (
              <Button asChild variant="ghost">
                <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
              </Button>
            )}
          </div>
        </Reveal>
        {finePrint && (
          <Reveal y={16} delay={0.4}>
            <p className="text-xs uppercase tracking-widest text-white/50">
              {finePrint}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
