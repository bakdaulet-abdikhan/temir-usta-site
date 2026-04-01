# Temir Usta (Iron Master) - Project Documentation

## 🏗️ Project Overview
**Temir Usta** is a premium website for a Kazakhstani gate manufacturer. The site is designed to feel high-end, utilizing a monochrome (black & white) palette with a focus on high-quality visuals and technical precision.

## 🛠️ Tech Stack
- **Framework:** React + Vite
- **Language:** TypeScript
- **Icons:** Lucide React
- **Styling:** Vanilla CSS (see `src/index.css`)
- **Assets:** Custom fonts (`KZImpact-Regular.ttf`) and local images/SVGs in `public/`.

## 🎨 Design System
- **Colors:** Monochrome palette defined in `:root` variables within `index.css`.
- **Typography:** 
  - **Headings & Stats:** `KZImpact` (Custom font).
  - **Body Text:** `Inter` (Google Font).
- **Aesthetic:** Minimalist, bold headings, large imagery, smooth micro-animations (`hover-scale`, `fade-in`, `slide-up`).

## 🚀 Key Features Implemented
### 1. Hero & Navigation
- Fixed header with scroll-aware background changes.
- SVG Logo with dynamic color inversion (`filter: brightness(0) invert(1)`) to ensure visibility on dark sections.
- Hero section with localized Kazakh content and a custom background image (`hero-gate.jpg`).

### 2. Catalog Strategy
- **Single Page Flow:** Redirected separate catalog pages into an integrated section on the Home page.
- **Three Tiers:** Standard, Lux, and Premium.
- **Dynamic Routing:** Category pages handled by `src/pages/Category.tsx`.

### 3. Data Integration
- **Standard Gates:** Populated with 16 real items indexed from a master Google Spreadsheet.
- **Image Handling:** Uses a helper to convert Google Drive share links into direct direct `thumbnail` URLs for performance.

### 4. Advanced Image Viewer (Category Page)
- **Mobile Experience:** Magnifier icon is always visible on touch devices.
- **Interactivity:**
  - Pinch-to-zoom (touch).
  - Pan/Drag support when zoomed.
  - Manual zoom controls (+/-) and percentage indicator.
  - Smooth desktop hover transitions.

### 5. Social Proof
- **Reviews Carousel:** 
  - Desktop: 3 cards/row.
  - Mobile: 1 card/row with swipe support.
  - Auto-rotation every 8 seconds.

## 📝 Instructions for Future AI Models
1. **Headings:** Always use `font-family: var(--font-impact)` for headings and statistics.
2. **Spacing:** Maintain the tightened layout in `Category.tsx`. Avoid large empty sections unless they serve the "premium" breathable feel.
3. **Data Updates:** 
   - Real data for `Lux` and `Premium` tiers needs to be added to the `gateData` object in `Category.tsx` once provided. 
   - Follow the `driveImg()` helper pattern for Google Drive assets.
4. **CSS Overrides:** Use the utility classes in `index.css` (`.container`, `.section-padding`, `.hover-scale`) before writing new inline styles to maintain consistency.
5. **Mobile Logic:** The `Category.tsx` component uses `@media (hover: none)` to toggle magnifier visibility—maintain this interaction pattern.

---
*Created by Antigravity AI.*
