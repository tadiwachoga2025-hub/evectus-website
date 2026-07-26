"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/neon-button";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const contactInfo = [
  { k: "OFFICE", v: "Harare, Zimbabwe" },
  { k: "EMAIL", v: "evectussolution@gmail.com", href: "mailto:evectussolution@gmail.com" },
  { k: "PHONE", v: "+263 78 991 6421", href: "tel:+263789916421" },
  { k: "HOURS", v: "Mon–Fri · 08:00 – 17:00 CAT" },
];

const services = [
  "Digital Transformation",
  "Strategic Consulting",
  "Technology Development",
  "Operational Excellence",
  "General Inquiry",
];

const inputClass =
  "w-full h-12 px-4 border border-black/20 bg-white text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c1552a]";

type FormStatus = "idle" | "sending" | "sent" | "error";

const initialForm = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  service: "Digital Transformation",
  message: "",
};

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/evectussolution@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.fullName,
            organization: form.organization,
            email: form.email,
            phone: form.phone,
            service: form.service,
            message: form.message,
            _subject: `New Evectus inquiry from ${form.fullName}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );
      const data: { success?: boolean | string; message?: string } =
        await response.json();
      const ok =
        data.success === true ||
        data.success === "true" ||
        response.ok;
      if (!ok) {
        throw new Error(data.message ?? "Failed to send");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setStatus("idle");
    setErrorMessage(null);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          label="Engage With Evectus"
          headline="Let's shift the culture together."
          body="Ready to replace the ordinary with the extraordinary? We'd love to hear about your work."
          imageSrc="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=2000&q=80"
          imageAlt="Conversation between two people at a desk"
        />

        <Section
          tone="white"
          innerClassName="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20"
        >
          {/* Left: contact info */}
          <RevealGroup className="flex flex-col gap-10">
            {contactInfo.map((c) => (
              <RevealItem key={c.k} className="flex flex-col gap-2">
                <span className="label text-[#666666]">{c.k}</span>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-xl font-medium hover:opacity-60 transition-opacity"
                  >
                    {c.v}
                  </a>
                ) : (
                  <span className="text-xl font-medium">{c.v}</span>
                )}
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Right: form */}
          <div>
            {status === "sent" ? (
              <div role="status" aria-live="polite">
                <Reveal y={20} className="flex flex-col gap-4 items-start">
                  <h2
                    className="h-section"
                    tabIndex={-1}
                    ref={successHeadingRef}
                  >
                    Thanks — we&rsquo;ll be in touch within 24 hours.
                  </h2>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm underline underline-offset-4 hover:opacity-60 transition-opacity"
                  >
                    Send another message
                  </button>
                </Reveal>
              </div>
            ) : (
              <form onSubmit={onSubmit} aria-busy={status === "sending"}>
                <RevealGroup className="flex flex-col gap-6">
                  <RevealItem>
                    <h2 className="h-section">Tell us about your challenge.</h2>
                  </RevealItem>

                  <RevealItem className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="label text-[#666666]">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={update("fullName")}
                      className={inputClass}
                    />
                  </RevealItem>

                  <RevealItem className="flex flex-col gap-2">
                    <label htmlFor="organization" className="label text-[#666666]">
                      Organization
                    </label>
                    <input
                      id="organization"
                      type="text"
                      value={form.organization}
                      onChange={update("organization")}
                      className={inputClass}
                    />
                  </RevealItem>

                  <RevealItem className="flex flex-col gap-2">
                    <label htmlFor="email" className="label text-[#666666]">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      className={inputClass}
                    />
                  </RevealItem>

                  <RevealItem className="flex flex-col gap-2">
                    <label htmlFor="phone" className="label text-[#666666]">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      className={inputClass}
                    />
                  </RevealItem>

                  <RevealItem className="flex flex-col gap-2">
                    <label htmlFor="service" className="label text-[#666666]">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={update("service")}
                      className={inputClass}
                    >
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </RevealItem>

                  <RevealItem className="flex flex-col gap-2">
                    <label htmlFor="message" className="label text-[#666666]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={update("message")}
                      className={`${inputClass} h-32 py-3 resize-none`}
                    />
                  </RevealItem>

                  <RevealItem className="mt-4 flex flex-col gap-3 items-start">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </Button>
                    {status === "error" && (
                      <p className="text-red-600 text-sm" role="alert">
                        {errorMessage ?? "Something went wrong."} Please try
                        again or email us directly at{" "}
                        <a
                          href="mailto:evectussolution@gmail.com"
                          className="underline"
                        >
                          evectussolution@gmail.com
                        </a>
                        .
                      </p>
                    )}
                  </RevealItem>
                </RevealGroup>
              </form>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
