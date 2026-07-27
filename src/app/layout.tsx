import type { Metadata } from "next";
import { preload } from "react-dom";
import { Michroma, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  // Renders only the nav/footer logo wordmark — not worth a render-blocking
  // preload competing with the LCP hero image.
  preload: false,
});

const playfair = Playfair_Display({
  // NOT --font-serif: globals.css's @theme defines that name, and next/font
  // emits onto <html> === :root, so sharing the name created a var() cycle.
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  // Without this, og:image resolves against localhost in dev and against the
  // .vercel.app deployment URL in prod — neither is the canonical domain, and
  // social crawlers need an absolute URL that actually serves the image.
  metadataBase: new URL("https://evectussolutions.co.zw"),
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
  // Early-fetch the two fonts used above the fold (Clash Display 700 heads
  // every heading; Satoshi 500 is the body face). ReactDOM.preload is the
  // App Router way to emit <link rel="preload"> — the Metadata API doesn't
  // support resource hints. `crossOrigin` is required for font preloads even
  // same-origin, or browsers double-fetch.
  preload("/fonts/clash-display-700.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  preload("/fonts/satoshi-500.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f2f2f2] text-[#111111]">
        {/* Skip link — first focusable element on every page (WCAG 2.4.1).
            Visually hidden until keyboard focus lands on it. `font-satoshi`
            is a hand-written class in globals.css, so it can't take a
            `focus:` variant — applying it unconditionally is harmless since
            the link is sr-only until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] font-satoshi text-sm text-[#111111] focus:rounded-sm focus:bg-[#f2f2f2] focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-[#c1552a]"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <ScrollProgress />
          {/* The skip link targets each page's own <main id="main-content"
              tabIndex={-1}> so focus lands past the navbar, not before it.
              This wrapper only preserves the body's column-flex layout. */}
          <div className="flex flex-1 flex-col">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
