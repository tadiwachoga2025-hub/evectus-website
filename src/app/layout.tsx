import type { Metadata } from "next";
import { Inter, Michroma, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const playfair = Playfair_Display({
  // NOT --font-serif: globals.css's @theme defines that name, and next/font
  // emits onto <html> === :root, so sharing the name created a var() cycle.
  variable: "--font-playfair",
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
      className={`${inter.variable} ${michroma.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f2f2f2] text-[#111111]">
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
