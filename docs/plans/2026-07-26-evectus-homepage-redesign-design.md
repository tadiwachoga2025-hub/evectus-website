# Evectus Homepage Redesign — Design Document

**Date:** 2026-07-26
**Scope:** `src/app/page.tsx` and the components it renders. Homepage only.
**Reference:** vertexlegalai.co.zw (structure), Evectus (brand).

---

## Decisions

| Question | Answer |
|---|---|
| How much of Vertex to adopt | Structural skeleton only. Evectus keeps its own palette, typography, imagery and voice. |
| Which pages | Homepage only. The other 11 routes are untouched this pass. |
| Footer | **Off-limits.** `src/components/Footer.tsx` is not to be modified. |
| Proof content | Real case studies exist. Client logos and testimonials do not — both ship as empty typed arrays for the owner to fill. No fabricated names, quotes, or metrics. |

---

## Constraints

- No invented client names, testimonial quotes, or statistics. Sections that need
  data we do not have render from an empty array and are skipped at build time.
- The footer is not touched.
- Existing inner routes keep working. Every capability card links to a route that
  already exists.
- `prefers-reduced-motion` is honoured. `globals.css` already has the global
  reset; new motion must not bypass it.

---

## What Vertex does, and what we do instead

The research pass found Vertex's homepage states the same four claims — grounded,
cited, 15,000+ documents, Zimbabwe-specific — across six separate sections. Its
Interlude and Mid-page Summary carry no information the hero has not already
delivered. Copying the skeleton faithfully would inherit that redundancy.

Three further findings shape the design:

1. Vertex never shows its product. There is no screenshot anywhere on the site,
   including the page titled *How It Works*.
2. Vertex has no social proof of any kind — no logos, testimonials, case studies,
   user counts, or press.
3. Vertex's footer links "Our Story", "Careers" and "Terms" to `#`, and "Contact"
   to an anchor that does not exist. The site offers no email, phone, or form.

The redesign spends the scroll depth recovered from the deleted sections on
exactly what Vertex lacks: real work, real proof, and a live contact path.

---

## Section architecture

| # | Section | Origin | Rationale |
|---|---|---|---|
| 1 | Sticky nav | Vertex | Transparent over hero, solid on scroll. |
| 2 | Hero | Vertex | Retains the Clash-bold + serif-italic two-line device. Gains a secondary CTA. |
| 3 | Proof strip | New | Client wordmarks. Vertex has no equivalent. |
| 4 | Problem | Vertex | Same narrative beat, informational rather than decorative visuals. |
| 5 | Capabilities | Vertex §5 + §7 merged | Four solutions, each deep-linked to its real child route. |
| 6 | Featured work | New | SchoolPulse, LegalPro, Healing Institute TV. |
| 7 | Testimonials | New | Empty array until real quotes are supplied. |
| 8 | FAQ | New | Objection handling. Vertex's only FAQ is buried on `/pricing`. |
| 9 | Final CTA | Vertex | Refinement of the existing dark CTA band. |

Vertex's *Interlude* and *Mid-page Summary* are deleted. Its numbered "01–06
claims" block is merged into Capabilities; the numeric stat treatment is dropped
because Evectus has no verified figures to put in it.

---

### 1. Sticky nav

Navigation currently lives inside `PrimeNestHero`, so it exists only on the hero
and only in its transparent state. Extract it to `src/components/SiteNav.tsx`.

- Transparent with white text while the hero is in view.
- On scroll past the hero, transitions to paper background with ink text and a
  hairline bottom border.
- Keeps the existing Solutions dropdown and mobile drawer behaviour.
- Focus-visible rings on every interactive element; the dropdown opens on focus,
  not hover alone.

### 2. Hero

Keeps `evectus-tech-hq.png`, the existing scrim gradients, and the two-line
headline. Changes:

- Adds a secondary ghost CTA beside the primary — Vertex runs two, Evectus runs
  one.
- The lone `#1d70e2` primary button is replaced with the accent token from the
  design system pass; that blue currently matches nothing else on the site.
- Adds a single-line proof statement beneath the CTA row.

### 3. Proof strip

Renders from `CLIENTS: { name: string; logo?: string }[]`, declared at the top of
the file and **initially empty**. When empty the section does not render. Text
wordmarks are the default treatment; a `logo` path overrides with an image.

### 4. Problem

Eyebrow, heading, body, and a link onward. Vertex fills this with two atmospheric
stock photographs; ours carries information instead — the specific failure modes
of legacy enterprise systems rather than a library photo.

### 5. Capabilities

Four cards, one per existing solution:

| Card | Route |
|---|---|
| Digital Transformation | `/solutions/digital-transformation` |
| Strategic Consulting | `/solutions/strategic-consulting` |
| Technology Development | `/solutions/technology-development` |
| Operational Excellence | `/solutions/operational-excellence` |

All four routes already exist. Vertex points four of its six capability cards at
the same destination; ours resolve to distinct pages, which is a genuine
information-architecture advantage rather than a styling one.

### 6. Featured work

The section Vertex cannot match. Three real projects, already written up under
`/case-studies`:

- **SchoolPulse** — classroom management platform
- **LegalPro** — case, deadline, document and client management
- **Healing Institute TV** — media platform

Each links to its anchor on `/case-studies`. Where a real screenshot exists it is
shown; the point of the section is to display actual product surface, which is
Vertex's single largest omission.

### 7. Testimonials

Renders from `TESTIMONIALS: { quote: string; name: string; title: string; org: string }[]`,
declared at the top of the file and **initially empty**. Section is skipped while
empty. No placeholder humans are shipped.

### 8. FAQ

Accordion, built on native `<details>`/`<summary>` so it works without JavaScript
and is keyboard-accessible by default. Answers the questions a prospective client
actually asks: engagement model, timelines, ownership of the code, what happens
after handover.

### 9. Final CTA

The existing dark band is structurally correct. It gains the microcopy line
beneath the button that Vertex uses effectively, and its button inherits the new
accent token.

---

## Design tokens

Supplied by the UI/UX pass (`ui-ux-pro-max` + `frontend-design`) and applied to
the `@theme` block in `src/app/globals.css`. Covers the semantic colour ramp,
fluid type scale, spacing rhythm, radius and elevation scales, and motion
tokens. Recorded here once the pass lands so the values live in one place.

---

## Testing

- `npm run build` passes.
- `npm run lint` passes.
- Each of the four capability routes and the case-studies anchor resolve — no
  dead links. This is a direct correction of Vertex's broken-footer failure.
- Empty `CLIENTS` and `TESTIMONIALS` arrays render no section and throw no error.
- Text contrast over the hero image meets WCAG AA.
- Keyboard traversal reaches every control, including the nav dropdown and the
  FAQ accordion.
- `prefers-reduced-motion: reduce` suppresses scroll reveals.
- Layout holds at 360px, 768px, 1280px and 1920px.
