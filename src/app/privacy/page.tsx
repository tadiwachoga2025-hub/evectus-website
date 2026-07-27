import type { Metadata } from "next";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Evectus Solutions handles the information you share with us — what we collect, how it is processed, and how to have it removed.",
};

const sections = [
  {
    label: "Who We Are",
    heading: "Evectus Solutions, Harare, Zimbabwe.",
    body: [
      "This website is operated by Evectus Solutions, based in Harare, Zimbabwe. If you have any question about this policy or about how we handle your information, email us at evectussolution@gmail.com and a person will answer.",
    ],
  },
  {
    label: "What We Collect",
    heading: "Only what you choose to send us.",
    body: [
      "The only personal information this site collects is what you submit through our contact form: your name, organization, email address, phone number, the service you are interested in, and your message.",
      "We do not collect anything else. There is no account system, no newsletter list, and no data purchased from third parties.",
    ],
  },
  {
    label: "How It Is Processed",
    heading: "Your message goes to our inbox — nowhere else.",
    body: [
      "When you submit the contact form, it is delivered to our email inbox via FormSubmit (formsubmit.co), a third-party form-forwarding service. FormSubmit's handling of your submission in transit is governed by its own privacy policy, available on its website.",
      "Once your message reaches us, it lives in our email and is read by the people who will respond to you.",
    ],
    link: {
      href: "https://formsubmit.co",
      label: "formsubmit.co",
    },
  },
  {
    label: "Cookies & Analytics",
    heading: "No trackers. No analytics. No ad pixels.",
    body: [
      "This site does not currently use analytics tools, tracking cookies, or advertising pixels of any kind. We don't watch what you read or follow you around the internet afterwards.",
      "If that ever changes, we will update this policy first.",
    ],
  },
  {
    label: "Retention & Your Rights",
    heading: "We keep your inquiry only as long as we need it.",
    body: [
      "We hold on to your inquiry only for as long as it takes to respond and, if we end up working together, to serve the engagement. We do not sell, rent, or share your information with anyone.",
      "If you would like the information you sent us deleted, email evectussolution@gmail.com and we will remove it.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Plain paper header — deliberately no PageHero image; this page
            is text-first. */}
        <Section tone="paper" width="prose" className="border-b border-[#1e1e1e]/10">
          <Reveal className="flex flex-col gap-4">
            <span className="label text-[#666666]">Privacy Policy</span>
            <h1 className="h-section">
              Plain language about the little data we hold.
            </h1>
            <p className="body-lg max-w-2xl text-[#666666]">
              No legal walls of text. This page says exactly what we collect,
              where it goes, and how to have it removed.
            </p>
            <p className="label text-[#666666]">Last updated · July 27, 2026</p>
          </Reveal>
        </Section>

        <Section tone="white" width="prose">
          <RevealGroup className="flex flex-col gap-14 md:gap-16">
            {sections.map((s) => (
              <RevealItem key={s.label} className="flex flex-col gap-3">
                <span className="label text-[#666666]">{s.label}</span>
                <h2 className="h-card">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="body-md text-black/80">
                    {p}
                  </p>
                ))}
                {"link" in s && s.link ? (
                  <p className="body-md text-black/80">
                    Read their policy at{" "}
                    <a
                      href={s.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 decoration-[#c1552a] transition-colors hover:text-[#c1552a]"
                    >
                      {s.link.label}
                    </a>
                    .
                  </p>
                ) : null}
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        <Section tone="paper" width="prose">
          <Reveal className="flex flex-col gap-3">
            <span className="label text-[#666666]">Questions</span>
            <h2 className="h-card">Ask us anything about your data.</h2>
            <p className="body-md text-black/80">
              Write to{" "}
              <a
                href="mailto:evectussolution@gmail.com"
                className="underline underline-offset-4 decoration-[#c1552a] transition-colors hover:text-[#c1552a]"
              >
                evectussolution@gmail.com
              </a>{" "}
              — Harare, Zimbabwe.
            </p>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
