import Link from "next/link";
import { Button } from "@/components/ui/neon-button";

export default function CTABanner({
  headline,
  body,
  ctaLabel = "Book a Consultation",
  ctaHref = "/contact",
}: {
  headline: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-black text-white px-6 lg:px-10 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center flex flex-col items-center gap-6">
        <h2 className="h-section">{headline}</h2>
        {body && <p className="body-lg text-white/80 max-w-2xl">{body}</p>}
        <Button asChild variant="light" className="mt-4">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
