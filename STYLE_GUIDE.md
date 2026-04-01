# Temir Usta - Style Guide

## Brand Identity
Premium iron gate manufacturer. The visual language conveys **strength, craftsmanship, and luxury** through an Iron & Gold palette.

---

## Color Palette

### Core Colors
| Token | Hex | Usage |
|---|---|---|
| `--color-bg-dark` | `#0c1117` | Dark backgrounds (hero, header, footer) |
| `--color-bg-light` | `#faf9f6` | Light page backgrounds |
| `--color-surface` | `#151c25` | Cards on dark backgrounds |
| `--color-surface-light` | `#f0ede8` | Cards on light backgrounds |

### Gold Accent
| Token | Hex | Usage |
|---|---|---|
| `--color-accent` | `#c9a84c` | Primary gold accent (buttons, icons, headings, active states) |
| `--color-accent-light` | `#e8d48b` | Lighter gold (hero subtitle, hover states) |
| `--color-accent-dark` | `#a07e2e` | Darker gold (pressed states) |

### Text
| Token | Hex | Usage |
|---|---|---|
| `--color-text-light` | `#ffffff` | Text on dark backgrounds |
| `--color-text-dark` | `#1a1a1a` | Text on light backgrounds |
| `--color-text-muted` | `#6b7280` | Secondary/muted text |

### Borders
| Token | Hex | Usage |
|---|---|---|
| `--color-border-light` | `#e2ded6` | Borders on light backgrounds |
| `--color-border-dark` | `rgba(201, 168, 76, 0.15)` | Subtle gold borders on dark backgrounds |

---

## Typography

### Fonts
- **Headings**: `KZImpact` (custom font, loaded from `/KZImpact-Regular.ttf`)
- **Body**: `Inter` (Google Fonts, weights: 300, 400, 500, 600)
- **Serif accent**: `Playfair Display` (available but rarely used)

### Font Variables
```css
--font-sans: 'Inter', sans-serif;
--font-serif: 'Playfair Display', serif;
--font-impact: 'KZImpact', sans-serif;
```

### Heading Sizes (using clamp for responsiveness)
- H1 Hero: `clamp(3rem, 7vw, 5.5rem)`
- H2 Section: `clamp(2.5rem, 4vw, 3.5rem)`
- H3 Card: `1.6rem - 2.2rem`

---

## Components

### Buttons
- **Primary** (`.btn-primary`): Gold background, dark text. Hover lightens to `--color-accent-light`.
- **Outline** (`.btn-outline`): Dark border, fills dark on hover.
- **White Outline** (`.btn-white-outline`): Gold border/text on dark backgrounds. Fills gold on hover.

### Tier Cards (`.tier-card`)
- White background, subtle border
- On hover: lifts up 8px, gold shadow, gold border accent
- Arrow icon animates right on hover

### Gate Image Cards
- White background with `--color-border-light` border
- Magnifier icon on hover (desktop) / always visible (mobile)

---

## Spacing
- Section padding: `8rem 0` (`.section-padding`)
- Container max-width: `1280px` with `1.5rem` side padding
- Card padding: `2.5rem - 3rem`

## Animations
- Cubic bezier easing: `cubic-bezier(0.16, 1, 0.3, 1)` for smooth, premium feel
- Hover transitions: `0.3s - 0.4s`
- Fade in: `1s` duration
- Slide up: `1s` with 30px offset

---

## Logo
- File: `/temirusta_new_logo.svg`
- Color: Gold (`#c9a84c`)
- Header height: `44px`
- Footer height: `40px`
- Brand text "TEMIR USTA" displayed next to logo in gold

---

## Key Design Principles
1. **Gold as accent, not dominant** - Use gold for icons, active states, CTAs, and key highlights
2. **Dark sections for impact** - Hero, stats, reviews use dark backgrounds
3. **Light sections for browsing** - Catalog and about sections use warm light backgrounds
4. **Minimal borders** - Prefer subtle, warm-toned borders over harsh grays
5. **Premium hover effects** - Cards lift, shadows glow gold, smooth cubic-bezier easing
