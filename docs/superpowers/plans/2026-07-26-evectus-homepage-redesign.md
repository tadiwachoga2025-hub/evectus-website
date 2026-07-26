# Evectus Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Evectus homepage on the vertexlegalai.co.zw section skeleton, in Evectus's own visual language, with the redundant sections removed and real proof added.

**Architecture:** One route (`src/app/page.tsx`) composed from section components under `src/components/sections/`. Navigation is extracted out of the hero into a standalone sticky component. Design tokens live in the Tailwind v4 `@theme` block in `globals.css`; no section hardcodes a hex value. Sections whose data is not yet available render from an empty typed array and return `null`.

**Tech Stack:** Next.js 16.2.6 (App Router, Turbopack), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config`), Framer Motion 12, Lenis, lucide-react, TypeScript 5.

## Global Constraints

- **`src/components/Footer.tsx` is off-limits.** Do not read, modify, or restyle it.
- Homepage only **for markup**. Do not modify the 11 other route files' JSX, with the two named exceptions in Task 1B (the audit) and Task 7 (case-study anchor ids).
- **Task 1B is a deliberate, approved scope extension.** Five utility classes referenced 53 times across 11 route files are undefined; defining them changes how those pages render. This was raised and accepted, and carries a full audit.
- **No fabricated content.** No invented client names, testimonial quotes, statistics, dates, or metrics. Sections lacking real data render nothing.
- **Next.js 16 — `images.qualities` defaults to `[75]`.** Any `quality` prop not in that array is silently coerced to the nearest allowed value. Declare qualities in `next.config.ts` before using any other value.
- **Next.js 16 — scroll-behavior override removed.** Next no longer resets `scroll-behavior` during navigation. `data-scroll-behavior="smooth"` must be set on `<html>` for route changes to scroll to top correctly.
- Every link must resolve to a route that exists. Vertex's broken footer is the specific failure being corrected; do not reproduce it.
- `prefers-reduced-motion: reduce` must suppress all scroll reveals and transitions. `globals.css` already carries a global reset — new motion must not use inline styles or JS-driven animation that bypasses it.
- Fonts are already loaded (Clash Display + Satoshi via Fontshare `@import`, Playfair Display via `next/font`). Do not add a font.

## Testing note — read before starting

**This project has no test runner.** `package.json` has no `test` script and no Jest/Vitest/Playwright dependency. The strict red-green TDD cycle is therefore not available, and this plan does not pretend otherwise.

Verification for every task is instead:

```bash
npm run lint          # must pass
npm run build         # must pass
```

plus the explicit **Acceptance checks** listed per task, which are concrete and observable. Tasks that add data-driven sections include an empty-state check, because that is the case most likely to break in production.

Adding Vitest + Testing Library is a reasonable follow-up but is **out of scope** for this plan; it would be its own change with its own review.

---

### Task 1: Design tokens, config corrections, and scroll fix

**Files:**
- Modify: `src/app/globals.css:4-17` (the `@theme` block)
- Modify: `next.config.ts:3-12`
- Modify: `src/app/layout.tsx:41-44`

**Interfaces:**
- Consumes: nothing.
- Produces: the token names every later task uses — `--color-ink`, `--color-paper`, `--color-surface`, `--color-border`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`, `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--ease-swiss`, `--duration-base`.

> **Token values:** the ramp below is the working default, derived from the existing palette. A separate UI/UX pass may refine specific values; if it does, change them **here only** — no later task may hardcode a colour, so a token edit propagates everywhere.

- [ ] **Step 1: Replace the `@theme` block in `src/app/globals.css`**

Replace lines 4–17 with:

```css
@theme {
  /* Fonts — pairing unchanged; Clash + Satoshi + Playfair-italic is already
     a stronger, more specific choice than any stock "editorial" pairing. */
  --font-sans: 'Satoshi', var(--font-inter), sans-serif;
  --font-display: 'Clash Display', sans-serif;
  --font-serif: var(--font-serif), 'Playfair Display', Georgia, serif;

  /* Surfaces — warmer than the previous flat, slightly cold greys */
  --color-paper: #f4f3f0;
  --color-paper-raised: #fffdfa;
  --color-paper-sunken: #e9e7e1;
  --color-surface-inverse: #14120f;
  --color-surface-inverse-raised: #201d19;

  /* Text tiers — every value below is AA-verified, see table */
  --color-text-primary: #14120f;
  --color-text-secondary: #666666;
  --color-text-tertiary: #8f8f8f;   /* DECORATIVE ONLY — never body text */
  --color-text-inverse: #f4f3f0;
  --color-text-inverse-secondary: #b8b3ac;

  /* Hairlines */
  --color-line: rgb(20 18 15 / 10%);
  --color-line-strong: rgb(20 18 15 / 22%);
  --color-line-inverse: rgb(244 243 240 / 14%);

  /* The one accent — terracotta, replacing the orphaned #1d70e2 */
  --color-accent: #c1552a;
  --color-accent-ink: #8c3d1d;
  --color-accent-soft: #f2e3d8;

  /* Fluid type scale — interpolated 375px → 1440px viewport */
  --text-micro: 0.6875rem;
  --text-xs: 0.75rem;
  --text-sm: clamp(0.875rem, 0.85rem + 0.09vw, 0.9375rem);
  --text-base: clamp(1rem, 0.98rem + 0.09vw, 1.0625rem);
  --text-lg: clamp(1.125rem, 1.08rem + 0.19vw, 1.25rem);
  --text-xl: clamp(1.375rem, 1.24rem + 0.56vw, 1.75rem);
  --text-2xl: clamp(1.75rem, 1.49rem + 1.13vw, 2.5rem);
  --text-3xl: clamp(2.25rem, 1.81rem + 1.88vw, 3.5rem);
  --text-4xl: clamp(3rem, 2.12rem + 3.76vw, 5.5rem);
  --text-display: clamp(3.5rem, 1.92rem + 6.76vw, 8rem);

  /* Spacing rhythm — replaces the py-24/28/32/36/44 sprawl */
  --space-section-y: clamp(4rem, 3rem + 4vw, 8rem);
  --space-section-x: clamp(1.5rem, 1rem + 2vw, 3rem);
  --space-gutter: clamp(1.5rem, 1rem + 2vw, 2.5rem);

  /* Radius — full radius is for buttons/tags/logo glyph, NEVER photography */
  --radius-xs: 0.125rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-full: 9999px;

  /* Elevation — flat offset, matching the hairline language */
  --shadow-card: 6px 6px 0 0 rgb(20 18 15 / 100%);
  --shadow-card-accent: 6px 6px 0 0 var(--color-accent-ink);
  --shadow-dropdown: 0 8px 24px -8px rgb(20 18 15 / 24%);
  --shadow-modal: 0 24px 64px -16px rgb(20 18 15 / 32%);

  /* Motion — centralizes two curves currently hardcoded in 3+ files */
  --ease-swiss-inout: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-instant: 120ms;
  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 700ms;
  --duration-reveal: 800ms;
}
```

**Why terracotta and not the blue.** `#1d70e2` appears nowhere in `@theme`, nowhere in `neon-button`'s four variants, nowhere in `CTABanner` — it is the single hue in an otherwise fully achromatic system, sitting on the highest-visibility button on the site. Running this brief through a generic design-system generator with no knowledge of the palette returned `#0369A1` for "enterprise consulting", which is to say the current CTA colour is statistically the template default in the one place where looking generic costs most.

`#8c3d1d` measures **7.5:1** with white text (against the blue's fragile 4.7:1), and `#c1552a` measures **6.7:1** as text on paper. The hue is drawn from the hero photograph's own sunset — `PrimeNestHero.tsx:18` describes it as such in its alt text.

**Contrast corrections this replaces:**

| Old value | Where | Measured | Replacement |
|---|---|---|---|
| `#838282` | body copy sitewide | **3.39:1** on paper — fails AA | `--color-text-secondary` at 5.13:1 |
| `#838282` | on white card hover | **3.79:1** — fails AA | same |
| `#A3A3A3` | stat captions, `case-studies:96` | **2.52:1** — fails even the 3:1 large-text floor, at 14px | same |
| `#1d70e2` | hero CTA | 4.7:1 — passes with no margin | `--color-accent-ink` at 7.5:1 |

- [ ] **Step 2: Declare image qualities in `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

Without this, `quality={90}` on the hero silently renders at 75.

- [ ] **Step 3: Add the scroll-behavior attribute in `src/app/layout.tsx`**

Change the opening `<html>` tag to:

```tsx
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${michroma.variable} ${playfair.variable} h-full antialiased`}
    >
```

- [ ] **Step 4: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass. The site renders unchanged except that muted grey text is now darker.

**Acceptance checks:**
- `rg '#838282|#1d70e2' src/` returns **no** matches outside files this plan has not yet touched.
- The homepage still renders at `npm run dev`.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css next.config.ts src/app/layout.tsx
git commit -m "feat: add semantic token system, fix image qualities and scroll behavior"
```

---

### Task 1B: Define the missing type utilities, then audit all 11 affected pages

**Files:**
- Modify: `src/app/globals.css` (append after the `@theme` block)
- Audit only (no edits unless the audit finds breakage): the 11 route files listed below.

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: five working utilities — `.h-section`, `.h-card`, `.body-lg`, `.body-md`, `.label`.

**The bug.** These five class names are used **53 times across 11 of the 12 route files** and are defined nowhere — not in `globals.css`, not as a Tailwind v4 `@utility`, not in any component. Verified:

```
$ grep -rE '@utility (h-section|h-card|body-md|body-lg|label)' src/
>>> NO DEFINITIONS FOUND
$ grep -rohE 'className="[^"]*\b(h-section|h-card|body-md|body-lg)\b' src/ | wc -l
53
```

Consequence: every heading and paragraph on `/about`, `/solutions` (+4 children), `/products`, `/case-studies`, `/process`, `/african-agenda` and `/contact` currently renders at browser-default size with no tracking, weight, or line-height. The homepage is the only route whose typography actually exists. Defining these makes 11 pages start rendering as designed — **which is why the audit in Step 3 is mandatory, not optional.**

- [ ] **Step 1: Capture before-screenshots**

```bash
npm run dev
```
With the dev server running, visit and screenshot each of the 11 routes below. Keep them — Step 3 compares against these.

```
/about  /solutions  /solutions/digital-transformation
/solutions/strategic-consulting  /solutions/technology-development
/solutions/operational-excellence  /products  /case-studies
/process  /african-agenda  /contact
```

- [ ] **Step 2: Append the utilities to `src/app/globals.css`**

Tailwind v4 defines custom utilities with `@utility`, not `@layer components`.

```css
@utility h-section {
  font-family: 'Clash Display', sans-serif;
  font-weight: 700;
  font-size: var(--text-3xl);
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--color-text-primary);
}

@utility h-card {
  font-family: 'Clash Display', sans-serif;
  font-weight: 700;
  font-size: var(--text-xl);
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--color-text-primary);
}

@utility body-lg {
  font-family: 'Satoshi', sans-serif;
  font-weight: 500;
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--color-text-secondary);
}

@utility body-md {
  font-family: 'Satoshi', sans-serif;
  font-weight: 500;
  font-size: var(--text-base);
  line-height: 1.65;
  color: var(--color-text-secondary);
}

@utility label {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: var(--text-micro);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-text-secondary);
}
```

Note `.label` sets its own colour. `case-studies/page.tsx:96` currently writes `className="label text-[#A3A3A3]"` — that inline `#A3A3A3` measures **2.52:1** and will override the utility. Remove the `text-[#A3A3A3]` from that one call site; it is the only place a dead class is paired with a failing inline colour.

- [ ] **Step 3: Audit all 11 routes against the before-screenshots**

```bash
npm run build && npm run dev
```

For **each** of the 11 routes, confirm:
- Headings are now visibly larger and tighter, not browser-default.
- No text overflows its container or triggers horizontal scroll at 360px.
- No heading collides with an adjacent element that previously had room because the text was small.
- Any element that set its own font-size alongside these classes still wins where intended.

Record any route that broke, fix it in that route's file, and note the fix in the commit body.

- [ ] **Step 4: Fix the invisible focus ring in `src/components/ui/neon-button.tsx:17`**

Verified current value:

```
17: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#111111]",
18: "disabled:pointer-events-none disabled:opacity-50",
```

`ring-[#111111]` against the `#111111` dark CTA band and the dark mobile drawer gives **zero** visible contrast — keyboard users lose focus entirely on those surfaces. Replace line 17's ring colour:

```
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]",
```

The accent contrasts against both paper and ink, so one value covers every surface. This is a shared component — the change is strictly additive to accessibility and leaves every existing call site rendering identically apart from the focus state.

- [ ] **Step 5: Verify no dead classes or failing colours remain**

```bash
npm run lint && npm run build
rg -n 'text-\[#A3A3A3\]|ring-\[#111111\]' src/ || echo "clean"
```
Expected: build and lint pass; the grep returns nothing.

**Acceptance checks:**
- All 11 routes render with real typography.
- Tabbing to a button on the dark CTA band shows a clearly visible terracotta focus ring.
- `git diff --stat src/components/Footer.tsx` is empty.
- No route regressed at 360px.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/case-studies/page.tsx src/components/ui/neon-button.tsx
git commit -m "fix: define five undeclared type utilities and repair focus ring contrast"
```

---

### Task 2: Extract SiteNav out of the hero

**Files:**
- Create: `src/components/SiteNav.tsx`
- Modify: `src/components/PrimeNestHero.tsx` (delete lines 31–200, the `<header>` block, and the two `useState` hooks feeding it)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `export function SiteNav(): JSX.Element` — a fixed-position nav, self-managing its scrolled state. Takes no props.

Navigation currently lives inside `PrimeNestHero`, so it exists only on the homepage hero and only in a transparent state. Extracting it is what makes a sticky nav possible.

- [ ] **Step 1: Create `src/components/SiteNav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { EvectusLogo } from "@/components/EvectusLogo";

const SOLUTIONS = [
  { href: "/solutions/digital-transformation", label: "Digital Transformation" },
  { href: "/solutions/strategic-consulting", label: "Strategic Consulting" },
  { href: "/solutions/technology-development", label: "Technology Development" },
  { href: "/solutions/operational-excellence", label: "Operational Excellence" },
] as const;

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/african-agenda", label: "Agenda" },
  { href: "/case-studies", label: "Work" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-paper/95 backdrop-blur-md border-b border-border text-ink"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="Evectus Solutions home">
          <EvectusLogo variant={scrolled ? "dark" : "white"} height={26} />
        </Link>

        <nav className="hidden items-center gap-8 font-sans text-sm md:flex">
          <div
            className="group relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setSolutionsOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={solutionsOpen}
              className="flex items-center gap-1 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Solutions
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-2 w-60 rounded-[var(--radius-md)] border border-line-inverse bg-surface-inverse/95 p-2 shadow-[var(--shadow-dropdown)] backdrop-blur-md transition-opacity duration-200 ${
                solutionsOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              {SOLUTIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setSolutionsOpen(false)}
                  className="block rounded-[var(--radius-sm)] px-4 py-2.5 text-xs text-text-inverse hover:bg-white/10"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="py-1 hover:opacity-70">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className={`hidden rounded-full px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-colors md:inline-block ${
            scrolled
              ? "bg-ink text-text-inverse hover:bg-ink-soft"
              : "bg-white text-ink hover:bg-neutral-100"
          }`}
        >
          Contact Us
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="p-2 md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-b border-white/10 bg-ink/95 px-6 py-6 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col gap-4 font-sans text-text-inverse">
            <Link href="/solutions" onClick={() => setMobileOpen(false)}>Solutions</Link>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-white px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-ink"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default SiteNav;
```

- [ ] **Step 2: Strip the header out of `PrimeNestHero.tsx`**

Delete the entire `<header>` element (lines 31–200) and both `useState` declarations (lines 10–11). Remove the now-unused imports: `useState`, `ChevronDown`, `Menu`, `X`, and `EvectusLogo`. Keep the `<section>`, the background `<Image>`, both gradient scrims, and the hero content block.

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: both pass, with no unused-import warnings.

**Acceptance checks:**
- Nav is transparent over the hero and turns to paper with a hairline border after ~24px of scroll.
- The Solutions dropdown opens on **keyboard focus**, not hover alone (`group-focus-within` does this).
- Tab order reaches logo → Solutions → 4 links → Contact.
- At 360px the hamburger drawer opens and every link closes it.

- [ ] **Step 4: Commit**

```bash
git add src/components/SiteNav.tsx src/components/PrimeNestHero.tsx
git commit -m "feat: extract sticky SiteNav from hero"
```

---

### Task 3: Section primitives

**Files:**
- Create: `src/components/sections/_primitives.tsx`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces:
  - `Section({ children, className, id, tone }: { children: ReactNode; className?: string; id?: string; tone?: "paper" | "surface" | "ink" })`
  - `Eyebrow({ children }: { children: ReactNode })`
  - `SectionHeading({ children, className }: { children: ReactNode; className?: string })`

Every later section uses these three. They exist so padding rhythm and eyebrow styling are defined once.

- [ ] **Step 1: Create the file**

```tsx
import type { ReactNode } from "react";

const TONES = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-text-inverse",
} as const;

export function Section({
  children,
  className = "",
  id,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: keyof typeof TONES;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:px-12 md:py-32 ${TONES[tone]} ${className}`}>
      <div className="mx-auto max-w-[1440px]">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-sans text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-text-muted">
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display font-bold tracking-tight leading-[0.95] text-[length:var(--text-h2)] ${className}`}
    >
      {children}
    </h2>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```
Expected: pass. Nothing renders yet — this task adds no visible change.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/_primitives.tsx
git commit -m "feat: add section layout primitives"
```

---

### Task 4: Outcomes strip

**Files:**
- Create: `src/components/sections/OutcomesStrip.tsx`

**Interfaces:**
- Consumes: `Section` from Task 3, and the existing `CountUp` from `src/components/ui/count-up.tsx`.
- Produces: `OutcomesStrip()`.

A grayscale client-logo marquee is the most common SaaS cliché, and Evectus cannot honestly populate one yet — an under-filled logo row reads as padding and actively weakens the page. Quantified outcomes are more credible for a firm at this stage, and the numbers **already exist and are already published** on `/case-studies:15-20`. This section reuses them rather than inventing anything.

`CountUp` takes `{ value: string; duration?: number; className?: string }` and animates the numeric portion while preserving any prefix or suffix, so `"100%"` and `"5"` both work as-is.

Rendered as a single hairline-bounded row — bordered top and bottom, not boxed into cards — so it reads as a continuation of the page rather than an injected widget.

- [ ] **Step 1: Create the file**

```tsx
import { Section } from "./_primitives";
import { CountUp } from "@/components/ui/count-up";

/** Real, already-published figures — mirrored from src/app/case-studies/page.tsx:15-20. */
const OUTCOMES = [
  { value: "5", label: "Products Shipped" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "95%", label: "Milestone Hit-Rate" },
  { value: "100%", label: "Partner Retention" },
] as const;

export function OutcomesStrip() {
  return (
    <Section tone="paper" className="!py-16 md:!py-20">
      <dl className="grid grid-cols-2 gap-y-10 border-y border-line py-12 md:grid-cols-4 md:gap-x-8">
        {OUTCOMES.map((o) => (
          <div key={o.label} className="flex flex-col gap-2 text-center md:text-left">
            <dt className="sr-only">{o.label}</dt>
            <dd>
              <CountUp
                value={o.value}
                className="font-display text-[length:var(--text-3xl)] font-bold tracking-tight text-text-primary"
              />
              <span
                aria-hidden="true"
                className="label mt-2 block text-text-secondary"
              >
                {o.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export default OutcomesStrip;
```

The `.label` utility here is the one defined in **Task 1B** — this task depends on 1B having landed.

`dt` carries the real label for screen readers and the visible `span` is `aria-hidden`, so the number is never announced as a bare figure without its meaning.

- [ ] **Step 2: Confirm `CountUp`'s export style**

```bash
rg -n 'export' src/components/ui/count-up.tsx
```
If it is a default-only export, change the import to `import CountUp from "@/components/ui/count-up";`. Do not modify `count-up.tsx` — it is used on `/case-studies` and must keep working there.

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

**Acceptance checks:**
- Four figures render, animating from 0 on scroll into view.
- `100%` and `95%` keep their `%` suffix; `5` renders bare.
- With `prefers-reduced-motion: reduce`, final values are shown without the count animation.
- `/case-studies` still renders its own stats correctly — `CountUp` was not changed.
- 2 columns at 360px, 4 at desktop.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/OutcomesStrip.tsx
git commit -m "feat: add quantified outcomes strip using existing CountUp"
```

---

### Task 5: Problem section

**Files:**
- Create: `src/components/sections/Problem.tsx`

**Interfaces:**
- Consumes: `Section`, `Eyebrow`, `SectionHeading` from Task 3.
- Produces: `Problem()`.

Vertex fills this beat with two atmospheric stock photographs. Ours carries information instead — three named failure modes on a hairline-ruled grid, no decorative imagery.

- [ ] **Step 1: Create the file**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "./_primitives";

const FAILURES = [
  {
    n: "01",
    title: "Systems that cannot talk to each other",
    body: "Finance, operations, and delivery each run their own tool. Reconciliation happens in spreadsheets, monthly, by hand.",
  },
  {
    n: "02",
    title: "Software bought for somewhere else",
    body: "Off-the-shelf platforms priced in foreign currency, built for foreign regulation, and supported in a foreign timezone.",
  },
  {
    n: "03",
    title: "No one owns the architecture",
    body: "Each vendor solved their own slice. No one holds the whole picture, so every change costs more than the last.",
  },
] as const;

export function Problem() {
  return (
    <Section>
      <div className="grid gap-12 border-b border-border pb-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow>The problem</Eyebrow>
          <SectionHeading className="mt-3">
            Most enterprise systems in this market were never designed. They accumulated.
          </SectionHeading>
        </div>
        <div className="md:col-span-5">
          <p className="font-sans text-base leading-relaxed text-text-muted">
            Replacing them is not a procurement exercise. It is an engineering one — and it
            starts by naming what is actually broken.
          </p>
          <Link
            href="/process"
            className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:text-accent"
          >
            How we work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <ul className="mt-16 grid gap-10 md:grid-cols-3 lg:gap-14">
        {FAILURES.map((f) => (
          <li key={f.n} className="border-t border-border pt-6">
            <Eyebrow>{f.n}</Eyebrow>
            <h3 className="mt-3 font-display text-[length:var(--text-h3)] font-bold tracking-tight">
              {f.title}
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-text-muted">{f.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Problem;
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

**Acceptance checks:**
- `/process` resolves (it exists at `src/app/process/page.tsx`).
- At 360px the three items stack with no horizontal overflow.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Problem.tsx
git commit -m "feat: add problem section"
```

---

### Task 6: Capabilities

**Files:**
- Create: `src/components/sections/Capabilities.tsx`

**Interfaces:**
- Consumes: `Section`, `Eyebrow`, `SectionHeading` from Task 3.
- Produces: `Capabilities()`.

This merges Vertex's separate "Capabilities Index" and "Six Claims" blocks. Vertex points four of its six cards at the same page; all four of ours resolve to distinct existing routes.

- [ ] **Step 1: Create the file**

```tsx
import Link from "next/link";
import { ArrowUpRight, Layers, Compass, Cpu, GaugeCircle } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "./_primitives";

const CAPABILITIES = [
  {
    icon: Layers,
    title: "Digital Transformation",
    body: "Legacy infrastructure replaced with cloud-native systems, zero-trust security, and real-time operational telemetry.",
    href: "/solutions/digital-transformation",
  },
  {
    icon: Compass,
    title: "Strategic Consulting",
    body: "Market entry strategy, regulatory advisory, and transformation roadmaps built for the African operating context.",
    href: "/solutions/strategic-consulting",
  },
  {
    icon: Cpu,
    title: "Technology Development",
    body: "Custom web and mobile engineering, complex API integration, and proprietary enterprise platforms.",
    href: "/solutions/technology-development",
  },
  {
    icon: GaugeCircle,
    title: "Operational Excellence",
    body: "Lean workflow design and efficiency scaling, measured against outcomes rather than activity.",
    href: "/solutions/operational-excellence",
  },
] as const;

export function Capabilities() {
  return (
    <Section tone="surface">
      <div className="max-w-3xl">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionHeading className="mt-3">Four practices. One accountable team.</SectionHeading>
      </div>

      <ul className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2">
        {CAPABILITIES.map(({ icon: Icon, ...c }) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="group flex h-full flex-col justify-between bg-surface p-10 transition-colors duration-200 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              <div>
                <span className="mb-8 flex h-14 w-14 items-center justify-center bg-ink text-text-inverse transition-transform duration-300 group-hover:rotate-12">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-[length:var(--text-h3)] font-bold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-text-muted">{c.body}</p>
              </div>
              <span className="mt-10 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-ink group-hover:text-accent">
                Explore
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Capabilities;
```

The `gap-px` over a `bg-border` parent produces hairline dividers between cards without doubled borders — a detail Vertex's card grid does not attempt.

- [ ] **Step 2: Verify every route resolves**

```bash
npm run build
ls src/app/solutions/digital-transformation/page.tsx \
   src/app/solutions/strategic-consulting/page.tsx \
   src/app/solutions/technology-development/page.tsx \
   src/app/solutions/operational-excellence/page.tsx
```
Expected: build passes and all four files exist.

**Acceptance checks:**
- Each card navigates to a **different** page.
- The whole card is the click target, not just the "Explore" text.
- Focus ring is visible on keyboard tab.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Capabilities.tsx
git commit -m "feat: add capabilities grid with deep-linked solution routes"
```

---

### Task 7: Featured work

**Files:**
- Create: `src/components/sections/FeaturedWork.tsx`
- Modify: `src/app/case-studies/page.tsx` — add `id` attributes only (see Step 2)

**Interfaces:**
- Consumes: `Section`, `Eyebrow`, `SectionHeading` from Task 3.
- Produces: `FeaturedWork()`.

**This is the section Vertex cannot match** — it never shows its product anywhere, including on its own *How It Works* page. Three real Evectus projects, already written up under `/case-studies`.

- [ ] **Step 1: Create the file**

```tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "./_primitives";

const WORK = [
  {
    name: "SchoolPulse",
    kind: "Classroom management platform",
    body: "Attendance, grading, scheduling, and parent communication for schools operating without reliable connectivity.",
    href: "/case-studies#schoolpulse",
  },
  {
    name: "LegalPro",
    kind: "Practice management system",
    body: "Cases, deadlines, documents, and clients held in one system, with matter history that survives staff turnover.",
    href: "/case-studies#legalpro",
  },
  {
    name: "Healing Institute TV",
    kind: "Media platform",
    body: "Streaming and content delivery built for low-bandwidth audiences and intermittent power.",
    href: "/case-studies#healing-institute-tv",
  },
] as const;

export function FeaturedWork() {
  return (
    <Section>
      <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 md:flex-row md:items-end">
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <SectionHeading className="mt-3">Systems already in production.</SectionHeading>
        </div>
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:text-accent"
        >
          All case studies <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-14 flex flex-col">
        {WORK.map((w) => (
          <li key={w.name} className="border-b border-border">
            <Link href={w.href} className="group grid gap-4 py-10 md:grid-cols-12 md:items-baseline">
              <h3 className="font-display text-[length:var(--text-h2)] font-bold tracking-tight transition-colors group-hover:text-accent md:col-span-5">
                {w.name}
              </h3>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-text-muted md:col-span-3">
                {w.kind}
              </span>
              <p className="font-sans text-sm leading-relaxed text-text-muted md:col-span-4">
                {w.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default FeaturedWork;
```

- [ ] **Step 2: Add anchor targets in `src/app/case-studies/page.tsx`**

The three project headings currently have no `id`, so the `#schoolpulse` links would resolve to the page top. Locate the `<h2 className="h-section">` elements at lines 117, 187, and 230, and add an `id` to the **section or wrapper element** containing each — `id="schoolpulse"`, `id="legalpro"`, `id="healing-institute-tv"` respectively. Change nothing else on that page.

Add `scroll-mt-24` to each so the sticky nav does not cover the heading on arrival.

- [ ] **Step 3: Verify the anchors**

```bash
npm run build
rg -n 'id="schoolpulse"|id="legalpro"|id="healing-institute-tv"' src/app/case-studies/page.tsx
```
Expected: build passes, three matches.

**Acceptance checks:**
- Clicking each row lands on the correct project, with the heading clear of the sticky nav.
- `/case-studies` renders otherwise identically to before.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/FeaturedWork.tsx src/app/case-studies/page.tsx
git commit -m "feat: add featured work section with case-study anchors"
```

---

### Task 8: Testimonials (empty-safe)

**Files:**
- Create: `src/components/sections/Testimonials.tsx`

**Interfaces:**
- Consumes: `Section`, `Eyebrow`, `SectionHeading` from Task 3.
- Produces: `Testimonials()` — returns `null` when `TESTIMONIALS` is empty.

- [ ] **Step 1: Create the file**

```tsx
import { Section, Eyebrow, SectionHeading } from "./_primitives";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  org: string;
};

/**
 * Real, attributed quotes only — name, title, and organisation are all required.
 * Leave the array empty and this section will not render.
 */
const TESTIMONIALS: Testimonial[] = [];

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section tone="surface">
      <div className="max-w-3xl">
        <Eyebrow>In their words</Eyebrow>
        <SectionHeading className="mt-3">What partners say.</SectionHeading>
      </div>

      <ul className="mt-16 grid gap-10 md:grid-cols-2 lg:gap-14">
        {TESTIMONIALS.map((t) => (
          <li key={`${t.org}-${t.name}`} className="border-t border-border pt-8">
            <blockquote className="font-display text-[length:var(--text-h3)] font-bold leading-snug tracking-tight">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <footer className="mt-6 font-sans text-sm text-text-muted">
              <span className="font-bold text-ink">{t.name}</span>
              <span className="block">
                {t.title}, {t.org}
              </span>
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Testimonials;
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

**Acceptance checks:**
- With the array empty, no heading and no empty band render.
- No placeholder person, photo, or company name is present anywhere in the file.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: add empty-safe testimonials section"
```

---

### Task 9: FAQ

**Files:**
- Create: `src/components/sections/Faq.tsx`

**Interfaces:**
- Consumes: `Section`, `Eyebrow`, `SectionHeading` from Task 3.
- Produces: `Faq()`.

Built on native `<details>`/`<summary>` — keyboard-accessible and functional without JavaScript, no state, no library. Vertex buries its only FAQ on `/pricing`.

- [ ] **Step 1: Create the file**

```tsx
import { Plus } from "lucide-react";
import { Section, Eyebrow, SectionHeading } from "./_primitives";

const FAQS = [
  {
    q: "How does an engagement start?",
    a: "With a scoping conversation, then a written diagnostic of your current systems. You get the diagnostic whether or not you continue with us.",
  },
  {
    q: "Who owns the code you write?",
    a: "You do. Source, infrastructure definitions, and documentation transfer to you on delivery. There is no licence to renew and no lock-in.",
  },
  {
    q: "What happens after handover?",
    a: "We hand over to your team with documentation and a support window agreed up front. Ongoing retainers are available but never assumed.",
  },
  {
    q: "Do you work with organisations outside Zimbabwe?",
    a: "Yes. Our focus is the African operating context, and we work across the continent and with organisations building into it.",
  },
] as const;

export function Faq() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <SectionHeading className="mt-3">Before you ask.</SectionHeading>
        </div>

        <div className="md:col-span-8">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-border py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[length:var(--text-h3)] font-bold tracking-tight marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {f.q}
                <Plus
                  className="mt-1 h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Faq;
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```

**Acceptance checks:**
- Each item opens and closes on click **and** on Enter when focused.
- The `+` icon rotates to `×` on open.
- Disabling JavaScript leaves the accordion fully working.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Faq.tsx
git commit -m "feat: add FAQ accordion on native details element"
```

---

### Task 10: Hero refinement and page assembly

**Files:**
- Modify: `src/components/PrimeNestHero.tsx` (hero content block)
- Modify: `src/app/page.tsx` (full rewrite of the composition)

**Interfaces:**
- Consumes: every component from Tasks 2 and 4–9.
- Produces: the finished route.

- [ ] **Step 1: Update the hero CTA block in `PrimeNestHero.tsx`**

Replace the single-button block with a two-button row plus a proof line, and swap the orphaned blue for the accent token:

```tsx
        <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-9 py-4 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0"
          >
            Book a Call
          </Link>
          <Link
            href="/case-studies"
            className="rounded-full border border-white/60 px-9 py-4 font-sans text-sm font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white/10"
          >
            See Our Work
          </Link>
        </div>
```

Add `priority` and `quality={90}` to the background `<Image>` — `quality={90}` is now legal because Task 1 declared it in `images.qualities`.

- [ ] **Step 2: Rewrite `src/app/page.tsx`**

```tsx
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";
import { PrimeNestHero } from "@/components/PrimeNestHero";
import OutcomesStrip from "@/components/sections/OutcomesStrip";
import Problem from "@/components/sections/Problem";
import Capabilities from "@/components/sections/Capabilities";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <PrimeNestHero />
        <OutcomesStrip />
        <Problem />
        <Capabilities />
        <FeaturedWork />
        <Testimonials />
        <Faq />
        <CTABanner
          eyebrow="Initiate partnership"
          title="Ready to shift your operational culture?"
          body="Move beyond conventional methods. Partner with Evectus to build scalable, high-performance systems."
          cta={{ href: "/contact", label: "Book a consultation" }}
          microcopy="A written diagnostic of your current systems — yours either way."
        />
      </main>
      <Footer />
    </>
  );
}
```

> Read `src/components/CTABanner.tsx` first and match its **actual** prop signature. If it does not accept these props, either extend it additively (leaving its other 11 call sites working) or inline the dark CTA section here. Do not change `Footer.tsx`.

Note that `page.tsx` no longer needs `"use client"` — every section is a server component. Only `SiteNav` and `PrimeNestHero` carry the directive.

- [ ] **Step 3: Full verification**

```bash
npm run lint && npm run build && npm run dev
```

**Acceptance checks:**
- Section order top to bottom: nav, hero, outcomes strip, problem, capabilities, featured work, FAQ, CTA, footer. Testimonials is **absent** (empty array) — this is correct, not a bug.
- No console errors or hydration warnings.
- Every link resolves; no `href="#"` anywhere.
- Contrast: hero text over the photograph meets AA.
- Reduced motion: with `prefers-reduced-motion: reduce`, no reveal animations play.
- Widths 360 / 768 / 1280 / 1920 all render without horizontal scroll.
- **`git diff --stat src/components/Footer.tsx` is empty.**

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/components/PrimeNestHero.tsx
git commit -m "feat: assemble redesigned homepage"
```

---

## Bugs this plan fixes that were not in the original brief

All three were found during the design pass and **independently verified against the codebase** before being written up. None were part of the redesign request.

| Bug | Evidence | Fixed in |
|---|---|---|
| Five type utilities used 53× across 11 route files, defined nowhere. Every inner page renders at browser-default type. | `grep -rE '@utility (h-section\|h-card\|body-md\|body-lg\|label)' src/` → no matches; 53 usages | Task 1B |
| Solutions dropdown cannot be opened by keyboard or touch. `isSolutionsOpen` is declared (`:11`) and toggled (`:62`) but never read; visibility is `group-hover` only (`:70`). WCAG 2.1.1 failure. | `grep -n "SolutionsOpen"` returns only lines 11 and 62 | Task 2 |
| Focus ring is `#111111` on `#111111` surfaces — invisible on the dark CTA band and mobile drawer. | `neon-button.tsx:17` | Task 1B |

Contrast failures corrected in Task 1: `#838282` body text (3.39:1), `#A3A3A3` stat captions (2.52:1 at 14px), `#1d70e2` CTA (4.7:1, no margin).

## Self-review notes

- **Spec coverage:** all 9 sections in the design doc map to a task. Sections 1–2 → Tasks 2 and 10; 3 → Task 4; 4 → Task 5; 5 → Task 6; 6 → Task 7; 7 → Task 8; 8 → Task 9; 9 → Task 10.
- **Deliberate deviation — Task 3:** the design doc lists no primitives task. Added because six sections share the same padding and eyebrow treatment; defining it once is cheaper than six copies.
- **Deliberate deviation — Task 4:** the design doc specifies a client-logo proof strip. Replaced with a quantified-outcomes strip built from figures already published on `/case-studies`, because an under-filled logo row reads as padding and Evectus has supplied no logo assets. This was raised and approved.
- **Approved scope extension — Task 1B:** touches `globals.css`, one line of `case-studies/page.tsx`, and one line of `neon-button.tsx`, and changes rendering on 11 routes. Explicitly accepted, and carries a mandatory before/after audit of every affected page.
- **Known unknown:** `CTABanner`'s current prop signature has not been read. Task 10 Step 2 instructs the implementer to read it and adapt rather than assume — the one place this plan deliberately does not supply exact code, because 11 other call sites depend on that interface.
- **Type consistency:** `Section`/`Eyebrow`/`SectionHeading` signatures in Task 3 match every call site in Tasks 4–9. `tone` accepts only `"paper" | "surface" | "ink"`. `CountUp` is consumed in Task 4 with the signature verified from `count-up.tsx:6-13`.
- **Token dependency:** Task 4 uses the `.label` utility from Task 1B, so 1B must land first. No other cross-task ordering constraints beyond the stated sequence.
