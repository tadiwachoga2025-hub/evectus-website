import type { Metadata } from "next";
import type { ReactNode } from "react";

// The contact page is a client component ("use client") and cannot export
// metadata itself, so this server layout carries it instead.
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Evectus Solutions in Harare, Zimbabwe — call +263 78 991 6421 or email evectussolution@gmail.com to start a conversation about your project.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
