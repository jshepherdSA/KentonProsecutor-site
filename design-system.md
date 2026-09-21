# Design system — Kenton County Commonwealth's Attorney

## Brand
- **Client:** Office of the Commonwealth's Attorney, 16th Judicial Circuit (Kenton County, KY) — Rob Sanders
- **Voice / feel:** Civic, calm, trustworthy. A neighbor who happens to lead the office.
  Plain-spoken, first-person where Rob speaks, never sensational. Cool and clean,
  institutional without being cold. Emphasis on *member · servant · leader* of the community.
- **Brand cues kept from the original site:** the Kenton County office seal, deep
  navy (#004375) headings, slate-blue nav bar (#284052), a thin maroon rule under
  the header, serif display type.

## Color
Mapped as Tailwind tokens in `app/globals.css` (`@theme`).

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#071B2E` | Footer, darkest bands |
| `navy-900` | `#0B2A45` | Hero overlay, dark sections |
| `navy-700` | `#004375` | **Primary** — headings, primary buttons, links (original brand navy) |
| `slate-700` | `#284052` | Nav bar, secondary dark surface (original nav color) |
| `steel-500` | `#4E6E8E` | **Secondary** — eyebrows on light, icons, secondary buttons |
| `sky-300` | `#9EC3DE` | Accent on dark backgrounds (eyebrows, rules, stat numerals) |
| `ice-100` | `#E7EFF6` | Tinted section background |
| `mist-50` | `#F4F7FA` | Page alt background / cards on tint |
| `white` | `#FFFFFF` | Base background |
| `heritage-700` | `#7A1F2B` | **Accent, sparing** — 3px rule under header, tiny details only |

Neutrals: ink `#13212E` (headings on white), body `#34465A`, muted `#5F7285`,
border `#D6E0E8`.

Contrast: body `#34465A` on white 9.6:1; `#004375` on white 10.4:1; `sky-300` on
`navy-900` 7.5:1; white on `slate-700` 10.9:1. All AA+.

## Typography
- **Heading font:** Source Serif 4 (400, 600; italic 400) — `font-serif`.
  Helton-style italic accent on one key word per display heading, colored `steel-500`
  (on light) or `sky-300` (on dark).
- **Body font:** Public Sans (400, 500, 600, 700) — `font-sans`. The U.S. Web
  Design System typeface; civic and highly legible.
- **Eyebrow:** Public Sans 600, 12–13px, uppercase, `tracking-[0.18em]`.
- Scale (desktop / mobile):
  - Display (hero h1): 64/72 → 40/46, serif 400
  - H2: 44/52 → 32/38, serif 400
  - H3: 24/32 → 21/28, serif 600
  - H4: 18/26 sans 600
  - Body L: 19/32; Body: 17/28; Small: 14/22

## Spacing & layout
- Base unit 4px (Tailwind default scale).
- Container: `max-w-7xl` (1280px) with `px-5 md:px-8`. Reading measure `max-w-2xl`.
- Section rhythm: `py-20 md:py-28`; tight bands `py-12 md:py-16`.
- 12-col grid mental model; common splits 7/5 and 6/6.

## Components
- **Buttons** (shadcn `Button`, restyled): squared rectangles (`rounded-sm`, ~3px),
  h-12 px-6, sans 600 14px, uppercase tracking-wide. Deliberately *not* pills —
  the office should read as civic and institutional, not consumer-brand.
  - primary: `navy-700` bg, white text → hover `navy-900`
  - secondary/outline: 1.5px `navy-700` border, `navy-700` text → hover `ice-100` bg
  - on-dark: white bg, `navy-900` text; outline-on-dark: white/40 border
  - arrow link: text + `→` in a 36px circular outline (Helton pillar arrows)
  - focus: 3px `sky-300` ring, offset 2
- **Cards:** white, 1px `border` color, barely-rounded corners, no heavy shadows;
  hover lifts border to `steel-500`. Optional 3px top rule in `navy-700`.
- **Nav:** (see teardown) utility strip → identity row (seal + name) → slate nav bar
  with dropdowns → 3px heritage rule.
- **Footer:** `navy-950`, seal, contact block, link columns, legal row.
- **Forms:** 48px fields, 1px border, `rounded-lg`, focus ring `sky-300`.

## Imagery
- Real photography of Rob in the community (classroom, testimony, courtroom,
  family history photos). Never mugshots on the homepage.
- Photos get near-square corners and, where used as backgrounds, a navy gradient overlay
  (`from-navy-900/90 via-navy-900/60 to-transparent`).
- Historic family photos stay black-and-white.
- Icons: lucide, 1.5 stroke, `steel-500`.
- **Radius: 3px** (`--radius: 0.1875rem`), applied through the Tailwind radius
  scale, so cards, photos, panels and buttons are all near-square. Circles are
  reserved for things that are genuinely round: the office seal, icon badges and
  the circular arrow links. Shadow: only `shadow-sm` on floating elements.
