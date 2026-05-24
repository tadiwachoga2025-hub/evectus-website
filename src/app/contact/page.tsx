"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/neon-button";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

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
  "w-full h-12 px-4 border border-black/20 bg-white text-base focus:outline-none focus:border-black transition-colors";

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

        <section className="bg-white py-24 md:py-32 px-6 lg:px-10">
          <div className="mx-auto max-w-[1440px] grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            {/* Left: contact info */}
            <div className="flex flex-col gap-10">
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.k}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: EASE_OUT_QUART,
                  }}
                  className="flex flex-col gap-2"
                >
                  <span className="uppercase tracking-widest text-[#A3A3A3] text-xs">
                    {c.k}
                  </span>
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
                </motion.div>
              ))}
            </div>

            {/* Right: form */}
            <div>
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                  className="flex flex-col gap-4 items-start"
                >
                  <h2 className="h-section">
                    Thanks — we&rsquo;ll be in touch within 24 hours.
                  </h2>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm underline underline-offset-4 hover:opacity-60 transition-opacity"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_QUART }}
                    className="h-section"
                  >
                    Tell us about your challenge.
                  </motion.h2>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.06, ease: EASE_OUT_QUART }}
                    className="flex flex-col gap-2"
                  >
                    <label
                      htmlFor="fullName"
                      className="uppercase text-xs tracking-widest text-[#A3A3A3]"
                    >
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
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT_QUART }}
                    className="flex flex-col gap-2"
                  >
                    <label
                      htmlFor="organization"
                      className="uppercase text-xs tracking-widest text-[#A3A3A3]"
                    >
                      Organization
                    </label>
                    <input
                      id="organization"
                      type="text"
                      value={form.organization}
                      onChange={update("organization")}
                      className={inputClass}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.18, ease: EASE_OUT_QUART }}
                    className="flex flex-col gap-2"
                  >
                    <label
                      htmlFor="email"
                      className="uppercase text-xs tracking-widest text-[#A3A3A3]"
                    >
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
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.24, ease: EASE_OUT_QUART }}
                    className="flex flex-col gap-2"
                  >
                    <label
                      htmlFor="phone"
                      className="uppercase text-xs tracking-widest text-[#A3A3A3]"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      className={inputClass}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_QUART }}
                    className="flex flex-col gap-2"
                  >
                    <label
                      htmlFor="service"
                      className="uppercase text-xs tracking-widest text-[#A3A3A3]"
                    >
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
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.36, ease: EASE_OUT_QUART }}
                    className="flex flex-col gap-2"
                  >
                    <label
                      htmlFor="message"
                      className="uppercase text-xs tracking-widest text-[#A3A3A3]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={update("message")}
                      className="w-full h-32 px-4 py-3 border border-black/20 bg-white text-base focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.42, ease: EASE_OUT_QUART }}
                    className="mt-4 flex flex-col gap-3 items-start"
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </Button>
                    {status === "error" && (
                      <p className="text-red-600 text-sm">
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
                  </motion.div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
