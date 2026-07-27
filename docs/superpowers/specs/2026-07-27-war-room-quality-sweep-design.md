# War Room Quality Sweep — Design

**Date:** 2026-07-27
**Goal:** Elevate the Evectus website from "solid" to "exceptional" across four fronts — visual distinctiveness, conversion & proof, performance & accessibility, copy sharpness — without breaking the established design system.

## Approved approach: Tribunal-then-Legion (Approach A)

Two phases, orchestrated as a multi-agent workflow.

### Phase 1 — Quality Tribunal (find + verify)

Six specialist reviewers sweep the **production build** (served at localhost:3000, pre-captured full-page screenshots at 1440/768/390) plus source:

1. **Visual detail** — spacing rhythm, alignment, typographic hierarchy, section transitions
2. **Motion & interaction** — reveal timing, hover states, easing consistency
3. **Conversion & proof** — CTA flow, proof-ready structure from existing claims only, FAQ coverage
4. **Copy** — headline/body sharpness, filler, voice consistency
5. **Accessibility** — keyboard nav, focus order, contrast edges, reduced-motion gaps
6. **Performance** — image weights, LCP path, font loading, bundle

Each reviewer returns its **top findings** (file, severity, concrete fix, effort). Every finding is then attacked by an independent skeptic judge: is it real, does it respect polish-within-system, does it invent facts? Refuted findings die.

### Phase 2 — UI Legion (fix)

Confirmed findings are grouped by **file territory** (no two agents share a file) and fixed in parallel.

## Hard constraints (all agents)

- **Polish within the system:** existing color/type tokens only (`paper #f2f2f2, ink #111111, dark #1e1e1e, muted #666666, accent #c1552a`; Clash Display / Satoshi / Playfair). No layout rearchitecting, no new pages.
- **Invent nothing:** no fabricated clients, quotes, or numbers. Proof structures may only use claims already on the site.
- `globals.css` design tokens owned by at most one agent.
- Tribunal reviews the production build, not dev.
- All changes land uncommitted for user review.

## Verification (after Legion)

Full `npm run build`, production server smoke tests, CDP probes (fonts, touch targets, overflow), and full-page screenshot comparison at 1440/390.

## Success criteria

- Build passes; no regressions on the six previously fixed issues (fonts, metadata, anchors, imagery, touch targets, privacy).
- Every shipped change traces to a tribunal-confirmed finding.
