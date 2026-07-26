# Vertex layout + motion port → Evectus homepage

**Date:** 2026-07-26
**Branch:** `design/homepage-vertex-structure`
**Source of design:** vertexlegalai.co.zw (`/Users/tadiwachoga/prolegal-ai-web`)
**Target:** `/Users/tadiwachoga/Evectus /evectus-website`

## Goal

The Evectus homepage already borrowed Vertex's section *skeleton* in the previous
redesign. This closes the remaining gap: Vertex's **motion system** and its
**spacing and structural detail**.

Evectus keeps its own brand — Clash Display headlines, Satoshi body, warm paper
palette, terracotta accent. Nothing in `globals.css` changes.

## Non-goals

- No colour, font, or copy changes.
- No inner-route redesign. Homepage only.
- **`mini-navbar.tsx` and `Footer.tsx` are not edited.** Explicit user constraint,
  stated twice.
- No new npm dependencies.

## Decisions

| Question | Decision | Why |
|---|---|---|
| Parallax engine | framer-motion `useScroll` + `useTransform` | Vertex uses GSAP + ScrollTrigger, which then forces a Lenis↔ScrollTrigger bridge. framer-motion v12 is already installed and produces the identical effect with no new dependency and no bridge. |
| Shared `Reveal` | Rewrite in place, site-wide | Unifies motion across the site rather than leaving the homepage an island. Accepted side effect: the 11 pages using `CTABanner` inherit the new easing. |
| FAQ | Adopt Vertex's flat bordered rows | Layout is in scope. Both are zero-JS. Rows scan better at 4 items. |
| Final CTA | Keep Evectus's dark `bg-neutral-900` | Vertex's is light, but that is a colour decision and colour is out of scope. |
| Section max-widths | Unchanged | Vertex unifies on `max-w-[1248px]`, but `OutcomesStrip` and `FeaturedWork` use `max-w-[1440px]` — the same width as the untouched navbar and footer. Narrowing them would break alignment with components we may not change. |

## Architecture

Four motion primitives under `src/components/ui/`, each with one job, no shared
state, and a props-only interface. Sections consume them and stay presentational.

### `Reveal.tsx` — rewritten, plus two new exports

Currently a hand-rolled `IntersectionObserver` that mutates `el.style` directly.
Replaced with framer-motion `whileInView`, matching Vertex exactly.

```ts
Reveal      { children, className?, delay = 0, y = 28, x = 0 }
RevealGroup { children, className?, stagger = 0.08 }
RevealItem  { children, className?, y = 28 }
```

- `EASE = [0.16, 1, 0.3, 1]` (expo-out), exported as the single shared curve.
  Replaces Evectus's `[0.22, 1, 0.36, 1]`, which is duplicated in three files.
- `Reveal`: `initial {opacity: 0, y, x}` → `whileInView {opacity: 1, y: 0, x: 0}`,
  `viewport {once: true, margin: "0px 0px -12% 0px"}`, `duration 0.7`.
- `RevealGroup`/`RevealItem`: variant-driven stagger, `RevealItem` at `duration 0.6`.
  This is what Evectus lacks today — every staggered list hand-computes
  `delay={i * 0.08}`.
- Reduced motion: `useReducedMotion()` collapses to opacity-only (no translate).
  The existing global `prefers-reduced-motion` rule in `globals.css` stays.
- The default `y` moves 24 → 28 to match Vertex.

**Breaking-change note:** `Reveal` currently renders a plain `<div>` with inline
`opacity: 0`. The replacement renders `motion.div`. Call sites are unchanged —
the prop surface is a superset of the current one.

### `WipeReveal.tsx` — new

`{ children, className?, delay = 0 }`. Animates
`clipPath: "inset(0 0 0 100%)"` + `opacity 0.3` → `inset(0 0 0 0%)` + `opacity 1`
over `0.9s` with `EASE`. Reduced motion falls back to a plain fade.

This effect already exists, inlined in `ProblemSection.tsx` as a raw `motion.div`.
Extracting it removes the duplication and makes it reusable.

### `Parallax.tsx` — new

`{ children, className?, amount = 6 }`. Renders `absolute inset-0`. Uses
`useScroll({ target: ref, offset: ["start end", "end start"] })` +
`useTransform` to drive `yPercent` from `-amount` to `+amount` across the
element's scroll pass.

Contract for callers: the parent must be `relative overflow-hidden`, and the
child image must carry `scale-110` so the drift never exposes an edge.
Reduced motion renders children with no transform.

### `ScrollProgress.tsx` — new

No props. `useScroll().scrollYProgress` → `useSpring({stiffness: 120, damping: 30,
restDelta: 0.001})` → `scaleX`. Rendered as
`fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-white mix-blend-difference`.

`mix-blend-difference` makes it legible on both the paper and dark sections
without needing a brand colour. Returns `null` under reduced motion.

Mounted once in `layout.tsx`, so it is global.

### `SmoothScroll.tsx` — rewritten

Currently `return <>{children}</>` — an empty passthrough, while `lenis@1.3.23`
sits installed and imported nowhere. Becomes a real Lenis root:

```tsx
<ReactLenis root options={{ duration: 1.1, lerp: 0.1, smoothWheel: !reduce, syncTouch: false }}>
```

No ScrollTrigger bridge is needed, because parallax is framer-motion driven.
Already wrapped around `{children}` in `layout.tsx`, so this is global too.

## Section changes

| Section | Change |
|---|---|
| `PrimeNestHero` | `h-screen min-h-[640px]` → `min-h-[640px] md:min-h-[760px] lg:min-h-[820px]`. Image wrapped in `<Parallax amount={8}>`, `scale-105` → `scale-110`. Both existing scrims kept — the bottom paper-fade serves the palette we are keeping and Vertex has no equivalent. Stagger cadence (0 / 0.1 / 0.2 / 0.3 / 0.5) already matches. |
| `OutcomesStrip` | Adopt Vertex's `StatsStrip` cell structure: `border-t` + `grid grid-cols-2 md:grid-cols-4`, cells `border-b border-r p-5 md:p-8 text-center last:border-r-0 md:border-b-0`, **label above value** (currently value above label, `border-l` dividers). Keep the animejs `CountUp` — Vertex's strip is static and the count-up is a genuine Evectus asset. Wrap in `RevealGroup`. Keep the `<dl>`/`<dt class="sr-only">` a11y structure. |
| `ProblemSection` | Replace the inline `motion.div` clip-path block with `<WipeReveal delay={0.2}>`. Delete the local `EASE_OUT_QUART` const. |
| `InterludeSection` | Image wrapped in `<Parallax amount={10}>`. Already `scale-110`. |
| `CapabilitiesSection` | Service rows: manual `delay={i * 0.08}` → `<RevealGroup stagger={0.07}>` + `<RevealItem>`. Right column gains Vertex's `<Reveal x={-24} y={0}>` slide-in. Claims strip keeps its `gap-px` hairline-grid trick. |
| `FeaturedWorkSection` | 3 cards: manual `delay={index * 0.1}` → `<RevealGroup>`. |
| `FaqSection` | `<details>` accordion → Vertex's flat rows: `flex flex-col gap-3 border-b border-[#1e1e1e]/10 py-8 md:flex-row md:gap-10`, question in a fixed `md:w-80` column, answer flowing. Drops the `ChevronDown` import. Wrap the list in `RevealGroup`. |
| `CTABanner` | Not edited. |

## Spacing

Section vertical padding moves to Vertex's tighter rhythm:

```
py-20 md:py-28 lg:py-32   →   py-16 md:py-20 lg:py-24
```

Horizontal `px-6 md:px-12 lg:px-20` is already identical in both codebases and
does not change. Max-widths do not change (see Decisions).

## Files

**New:** `ui/WipeReveal.tsx`, `ui/Parallax.tsx`, `ui/ScrollProgress.tsx`
**Rewritten:** `ui/Reveal.tsx`, `SmoothScroll.tsx`
**Edited:** `PrimeNestHero.tsx`, all 6 files in `sections/`, `layout.tsx`
**Untouched:** `mini-navbar.tsx`, `Footer.tsx`, `CTABanner.tsx`, `PageHero.tsx`,
`globals.css`, `package.json`, all inner routes

## Blast radius beyond the homepage

Two changes are structurally global and cannot be scoped to one route:

1. **Lenis** in `SmoothScroll.tsx` — wraps every page from `layout.tsx`.
2. **`ScrollProgress`** — mounted in `layout.tsx`.
3. **`Reveal` easing** — `CTABanner` ships on 11 pages and `PrimeNestHero`
   on 1, so those pages inherit the new curve and the `y` 24 → 28 default.

All three are intended. None changes layout, colour, or copy on any inner page —
only the feel of existing animations.

## Verification

There is no test runner in this repo. Per task:

- `npm run lint` — clean.
- `npm run build` — succeeds.
- Manual: homepage scrolls smoothly (Lenis active), progress bar tracks scroll and
  stays legible over both paper and dark sections, hero and interlude images drift
  on scroll without exposing an edge, staggered lists cascade rather than
  appearing at once, FAQ renders as open rows.
- Reduced motion: with `prefers-reduced-motion: reduce`, Lenis smoothing is off,
  the progress bar is absent, parallax is static, and reveals fade without
  translating.
- Regression: navbar and footer render identically to `main`; one inner page
  (e.g. `/about`) still renders correctly with the new `Reveal`.

## Risks

- **`Reveal` renders `motion.div`, not `<div>`.** `CapabilitiesSection` puts
  `Reveal` inside a list context; confirm the wrapper element still sits where
  the grid expects it.
- **Lenis + `h-full` on `<html>`/`<body>`.** `layout.tsx` sets `h-full` and
  `min-h-full flex flex-col`. Lenis expects to own scroll on `<html>`; verify no
  double scrollbar or dead scroll appears after wiring it.
- **`ScrollProgress` at `z-50`** — the navbar is also `z-50`. The bar is 2px at
  the very top; confirm it is not hidden behind the nav's `backdrop-blur`.
- **`syncTouch: false`** means touch scrolling stays native. Verify mobile feels
  unchanged rather than laggy.
