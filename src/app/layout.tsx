import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Evectus Solutions — Shifting the Culture",
    template: "%s · Evectus Solutions",
  },
  description:
    "Innovative and superior business solutions. We specialize in Digital Transformation, Strategic Consulting, and Technology Development to solve everyday problems with integrity and ingenuity. Making Africa a Global Powerhouse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
