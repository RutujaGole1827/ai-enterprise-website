# Exponentia.ai

An enterprise AI and data solutions marketing site. Next.js App Router,
Tailwind v4, Motion, TypeScript.

The colour system is taken from the live exponentia.ai stylesheet (brand navy
`#002060`, brand orange `#ed5920`, ground `#f4f4f8`) and rebuilt as a semantic
token layer. Layout, components, copy and case studies are original to this
build; no markup, imagery or copy is lifted from the existing site.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home. Hero, logo wall, solutions, industries, journey, case studies, ecosystem, testimonials, insights, CTA, contact |
| `/work/[slug]` | Case study detail. Prerendered from `caseStudies` |
| `/insights/[slug]` | Article detail. Prerendered from `insights` |
| `/api/contact` | Contact form intake. Validates, then delivers |

## Design system

One theme at a time for the whole page, one accent, one radius scale.

**Color.** Semantic CSS custom properties in `app/globals.css`, swapped on a
`.dark` class. This is the single token strategy for the project; components
never hardcode a hex value.

| Token | Light | Dark | Brand source |
| --- | --- | --- | --- |
| `--canvas` | `#f4f4f8` | `#060c19` | `--bg-gray` / `--dark-blue` |
| `--surface` | `#fbfbfd` | `#0b152c` | `--dark-blue-200` |
| `--surface-2` | `#eaeaf1` | `#101d3a` | |
| `--ink` | `#0a1327` | `#f6f8fd` | `--dark-blue-300` |
| `--muted` | `#4e5872` | `#9fb0cf` | |
| `--accent` | `#c9400f` | `#ff7734` | `--primary-color` / `--quote` |
| `--brand-navy` | `#002060` | `#002060` | `--blue` |

The brand navy is the ink, so headings and body already carry the identity
before any accent is applied. The accent is the brand orange in both themes.

On light ground it is one stop deeper than `#ed5920`, because `#ed5920` behind
white label text measures 3.47:1 and fails WCAG AA; `#c9400f` measures 4.97:1.
The pure brand orange is used at full strength on dark ground, where it gives
7.39:1 as text and 7.36:1 behind its own label. Accent as text on `--canvas` is
4.5:1 light and 7.4:1 dark. `--muted` against `--canvas` is 6.5:1 light and
8.9:1 dark. All pass AA.

`--brand-navy` is structural, never interactive. It grounds exactly one
element on the page: the closing CTA block.

**Theme selection.** An inline script in `app/layout.tsx` runs before first
paint. It uses `prefers-color-scheme` unless the visitor has made an explicit
choice, which is stored in `localStorage` under `exponentia-theme`. The toggle
in the header sets that choice and keeps following the system until one is
made.

**Type.** Geist Sans for everything, Geist Mono declared but unused on the
marketing surface. Hierarchy comes from weight, size and colour rather than a
second family. No all-caps labels and no eyebrows anywhere on the page.

**Shape.** Interactive controls `--radius-control` (10px), surfaces
`--radius-surface` (16px). Nothing else.

**Control boundaries.** `--control-border` (`#8b8ba6` light, `#55699a` dark)
is used for every input, select and outlined button. `--line` sits at 1.7:1
against the adjacent surface, which is right for a decorative rule but below
the 3:1 WCAG 1.4.11 wants for the boundary of an interactive component.

**Z-index.** Only the values in `lib/z-index.ts`.

## Motion

Two pieces of motion happen without the user asking for them:

1. The hero entry sequence on page load, which establishes reading order once.
2. The scroll-linked progress line in the journey section, where the content
   genuinely is a sequence.

Everything else responds to an action: the mega menu, the mobile drawer, the
industries rail, hover and focus states. There are deliberately no
fade-and-slide reveals on section after section.

All of it is gated on `prefers-reduced-motion` through Motion's
`useReducedMotion()`, with a CSS backstop in `globals.css`. The project uses no
`window` scroll listeners: scroll position comes from Motion's `useScroll`,
and the one `addEventListener("scroll")` call is on the industries rail
element, for its own horizontal position.

## Components

`components/ui` holds the primitives. `Button` follows the shadcn / 21st.dev
contract (CVA variants plus `asChild` through Radix Slot), restyled onto this
project's tokens rather than shipped in its default state, so a component
pulled from either registry drops in without adaptation.

21st.dev's registry is auth-gated and returned 403 from this environment, so
the components here are written to that contract rather than fetched from it.
To pull a real one later:

```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component>"
```

## Brand assets

`public/brand` holds the first-party assets. The marks authored for a dark
ground (the wordmark, the client logos) are processed by

```bash
node scripts/build-brand-svg.mjs
```

which rewrites their single flat colour to `currentColor` and writes
`lib/brand-svg.ts`, plus a light and dark copy of the wordmark. Re-run it after
replacing anything in `public/brand`. The navy service, sector and partner
tiles need no processing: they carry their own ground and read on both themes.

## Content

Every visible string lives in `lib/content.ts`, and long-form article and case
study copy in `lib/detail-content.ts`. The detail map is keyed by the ids in
`content.ts`, so an article without a body is a type error at build time rather
than a 404 later.

## Before this goes live

**Imagery.** All imagery is first-party, pulled from the live exponentia.ai
site and served from `public/brand`. The hero uses the landing page visual at
1280x720; service and sector tiles, partner marks and article covers are the
real assets. Two things are still worth upgrading:

- The hero asset is a video poster frame at 1280x720. A purpose-shot hero at
  roughly 2000px wide would hold up better on large displays.
- The three case study images are generic platform visuals. Swap for imagery
  specific to each engagement once the case studies are approved.

**Contact details.** The phone number and both office lines in `brand` are
placeholders and are marked as such in the source. Replace before launch.

**Client marks.** `trustedBy` carries six real client logos taken from the
live site. Confirm each one is still cleared for use on a new page before
launch.

**Case study figures.** `caseStudies` and `caseStudyDetails` are marked `mock`
in the source. Replace with approved narratives and verified numbers.

**Contact delivery.** Set `CONTACT_WEBHOOK_URL` to the CRM intake or mail
provider. `app/api/contact/route.ts` throws if it is unset, so a missed
integration fails in staging instead of silently dropping enquiries in
production.
