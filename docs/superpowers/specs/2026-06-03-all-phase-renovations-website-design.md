# All Phase Renovations — Website Design Spec
**Date:** 2026-06-03
**Status:** Approved

---

## Overview

A premium, mobile-first marketing website for **All Phase Renovations**, a residential construction and remodeling company based in Athens, Georgia. Phone: **706-424-8498**.

The site must feel like a $10,000+ custom contractor website: high-end, trustworthy, and conversion-focused. Built as a React + Vite SPA with React Router for client-side routing.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Forms | React Hook Form |
| Fonts | Bebas Neue (headings) + Inter (body) via Google Fonts |
| Images | Unsplash placeholder URLs + lazy loading |
| SEO | Per-page `<SEOMeta>` component (title, description, keywords) |

---

## Design System

### Color Palette

```
Background primary:   #111111  (near-black sections)
Background secondary: #1a1a1a  (cards, alternate sections)
Background elevated:  #222222  (hover states)
Gold accent:          #C9A84C  (CTAs, highlights, decorative borders)
Gold hover:           #E0C068  (hover state on gold elements)
Text primary:         #FFFFFF
Text secondary:       #AAAAAA
Text muted:           #666666
Border subtle:        #2a2a2a
```

### Typography

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Display / Hero | Bebas Neue | 72–96px | 400 | letter-spacing: 2px |
| H1 | Bebas Neue | 48–64px | 400 | |
| H2 | Bebas Neue | 36–48px | 400 | |
| H3 | Bebas Neue | 24px | 400 | |
| Body large | Inter | 18px | 400 | |
| Body | Inter | 16px | 400 | |
| Label/eyebrow | Inter | 11–12px | 600 | uppercase, letter-spacing: 3–4px |

### Shape & Spacing

- Section vertical padding: `py-20` to `py-32` (80–128px)
- Cards: `rounded-lg` (8px radius), `border border-[#2a2a2a]`
- Buttons: `rounded-sm` (sharp rectangular), uppercase, `tracking-widest` — no pill shapes
- Gold dividers: `h-[2px] w-12 bg-[#C9A84C]` placed under section eyebrow labels

### Animation Defaults (Framer Motion)

| Effect | Parameters |
|---|---|
| Fade-up on scroll | `y: 40 → 0`, `opacity: 0 → 1`, `duration: 0.6s` |
| Stagger children | `0.1s` delay between items |
| Page transition | `opacity: 0 → 1`, `duration: 0.4s` |
| Counter animation | `0 → target` over `2s` on viewport enter |
| Card hover scale | `scale: 1 → 1.03`, `duration: 0.2s` |
| Nav background | CSS transition on scroll position change |

---

## Project Structure

```
src/
  components/
    layout/
      Navbar.jsx          # Transparent→sticky dark, mobile hamburger
      Footer.jsx          # 4-column dark footer
      FloatingCTA.jsx     # Mobile-only sticky bottom bar
      ScrollToTop.jsx     # Resets scroll on route change
    ui/
      SEOMeta.jsx         # Per-page title/description/keywords
      CTAButton.jsx       # Reusable gold CTA button
      ServiceCard.jsx     # Photo card with overlay (used on Home + Services)
      SectionLabel.jsx    # Eyebrow label + gold divider
      AnimatedCounter.jsx # Framer Motion counter
      BeforeAfterSlider.jsx # Drag-handle before/after image comparison
      TestimonialsCarousel.jsx
      FAQAccordion.jsx
      LightboxModal.jsx   # Gallery lightbox
  pages/
    Home.jsx
    Services.jsx
    Gallery.jsx
    About.jsx
    Contact.jsx
    Estimate.jsx
  data/
    services.js           # All 14 services: id, name, description, photo URL, benefits
    testimonials.js       # 6 testimonials: name, location, rating, text
    gallery.js            # Photo objects: src, alt, category, before/after pair
    serviceAreas.js       # List of cities/counties served
  hooks/
    useScrollPosition.js  # Returns scroll Y for navbar transition
    useIntersectionObserver.js # Triggers animations on enter
  assets/
    favicon.ico
  App.jsx                 # Router + layout wrapper
  main.jsx                # Entry point
  index.css               # Tailwind directives + Google Fonts import
public/
  favicon.ico
  og-image.jpg
```

---

## Shared Components

### Navbar
- **Desktop:** Logo (left) + nav links (center) + gold "Call Now" button (right)
- **Mobile:** Logo (left) + hamburger (right) → full-screen slide-down menu with links + "Call Now" + "Free Estimate"
- **Scroll behavior:** Fully transparent at page top → dark frosted glass (`bg-[#111111]/95 backdrop-blur`) on scroll past 80px, with CSS transition
- **Active link:** Gold underline indicator

### Footer
- 4 columns: Logo + tagline | Services list | Service areas | Contact info (phone, hours)
- Gold horizontal divider at top
- Copyright line at bottom: "© 2024 All Phase Renovations · Athens, GA · Licensed & Insured"

### FloatingCTA
- Mobile only (`md:hidden`)
- Fixed to bottom, full width
- Two halves: 📞 "Call Now — 706-424-8498" (left, gold) | "Free Estimate" (right, dark)
- Hidden when footer enters viewport (Intersection Observer)

---

## Pages

### Home (`/`)

**Sections in order:**

1. **Hero** — Full-screen Unsplash construction photo, `bg-black/55` overlay. Centered content:
   - Eyebrow: `ATHENS, GEORGIA · LICENSED & INSURED`
   - Headline (Bebas Neue 72–96px): "Athens Georgia's Trusted Renovation & Remodeling Experts"
   - Subheadline (Inter): "Premium craftsmanship. Honest pricing. Results that last."
   - Two buttons: gold "Get a Free Estimate" (links to `/estimate`) + outlined "Call 706-424-8498"
   - Scroll-down chevron (animated bounce)
   - Full viewport height (`min-h-screen`)

2. **Stats Bar** — Dark band `bg-[#1a1a1a]`, 4 animated counters:
   - `500+` Projects Completed
   - `15+` Years of Experience
   - `100%` Licensed & Insured
   - `4.9★` Customer Rating

3. **Services Preview** — "What We Do" section heading + gold divider. Photo card grid: 3 columns desktop, 2 tablet, 1 mobile. Shows 6 featured services with "View All Services →" link.

4. **Why Choose Us** — Dark section. 4 icon + title + description blocks in 2×2 grid:
   - Premium Craftsmanship
   - Licensed & Insured
   - Free Estimates
   - Athens Local

5. **Before/After Showcase** — "Our Work Speaks For Itself" heading. 3 before/after pairs with drag-handle slider. Framer Motion fade-in on scroll.

6. **Testimonials** — "What Our Customers Say." Carousel: 3 cards visible desktop, 1 mobile. Each card: star rating, quote text, name, city. Auto-advances every 5s + manual dots.

7. **Service Areas** — "Proudly Serving" + gold divider. Two columns of city names. Background: `#1a1a1a`.

8. **Emergency Banner** — Gold `bg-[#C9A84C]` full-width band: "Need Emergency Home Repairs? · Call Us Now: 706-424-8498" with dark button.

9. **Footer**

**SEO title:** "Athens GA Renovation & Remodeling Experts | All Phase Renovations"
**Meta description:** "All Phase Renovations — Athens Georgia's trusted contractor for kitchen remodels, bathroom renovations, flooring, painting, decks, and more. Call 706-424-8498 for a free estimate."

---

### Services (`/services`)

1. **Page Hero Band** — shorter hero (50vh), "Our Services" headline, subtitle
2. **Services Grid** — all 14 services as photo cards. 3 columns desktop, 2 tablet, 1 mobile. Each card:
   - Background photo (Unsplash, service-relevant)
   - Dark gradient overlay (bottom 60%)
   - Service name (Bebas Neue)
   - 2-line description
   - "Get a Quote →" link → `/estimate`
3. **FAQ Accordion** — 8 common questions (pricing, timeline, licensing, areas served, etc.)
4. **CTA Band** — "Ready to Start Your Project?" + two buttons

Services list (14 total):
1. Interior & Exterior Painting
2. Drywall & Sheetrock Repair
3. Flooring Installation (LVP, Hardwood, Tile)
4. Kitchen Remodeling
5. Bathroom Remodeling
6. Decks & Porches
7. Carpentry & Trim Work
8. Pressure Washing
9. Concrete Work
10. Epoxy Floors
11. Gutters
12. General Home Renovations
13. Home Repairs
14. Custom Renovation Projects

**SEO title:** "Remodeling Services Athens GA | All Phase Renovations"

---

### Gallery (`/gallery`)

1. **Page Hero Band** — "Our Work" headline
2. **Filter Tabs** — All / Painting / Flooring / Kitchen / Bathroom / Decks / Exterior. Gold underline on active tab. Framer Motion layout animation on filter change.
3. **Masonry Grid** — CSS columns: 3 desktop, 2 tablet, 1 mobile. Click → Lightbox modal.
4. **Lightbox Modal** — full-screen dark overlay, prev/next arrows, close button, image counter
5. **Before/After Section** — reuses `BeforeAfterSlider` component (3 pairs)

**SEO title:** "Project Gallery | All Phase Renovations Athens GA"

---

### About (`/about`)

1. **Page Hero Band** — "About Us"
2. **Company Story** — two columns: body text (left) + photo (right). Text: founding story, Athens roots, commitment to quality
3. **Stats Bar** — reused component
4. **Our Values** — 4 cards: Quality / Integrity / Community / Craftsmanship. Icon + title + description each.
5. **Team Section** — 3 placeholder cards (name, role, photo)
6. **Trust Badges** — row of 4: Licensed · Insured · Locally Owned · Satisfaction Guaranteed
7. **CTA Band** — "Let's Work Together" + estimate button

**SEO title:** "About All Phase Renovations | Athens GA Contractor"

---

### Contact (`/contact`)

1. **Page Hero Band** — "Contact Us"
2. **Two-Column Layout:**
   - **Left — Form** (React Hook Form): Full Name, Phone, Email, Service Needed (dropdown), Message, Submit button
   - **Right — Info:** Click-to-call "706-424-8498", business hours, Google Maps iframe placeholder (gray box with address), service areas list
3. **Fast Response Band** — "We respond within 24 hours · Free estimates · No obligation"

**SEO title:** "Contact All Phase Renovations | Athens GA · 706-424-8498"

---

### Estimate (`/estimate`)

1. **Page Hero Band** — "Request a Free Estimate"
2. **Trust signals strip** — 3 inline badges: Free Estimate / Respond in 24hrs / No Obligation
3. **Quote Form** (React Hook Form, full-width):
   - Full Name (text)
   - Phone Number (tel)
   - Email (email)
   - Service Type (select — all 14 services)
   - Project Description (textarea)
   - Estimated Budget (select: Under $1k / $1k–$5k / $5k–$15k / $15k–$50k / $50k+)
   - Desired Timeline (select: ASAP / Within 1 month / 1–3 months / 3–6 months / Flexible)
   - Upload Photos (file input, placeholder — no actual upload processing)
   - Submit button
4. Form validation on all required fields. Success state: thank-you message.

**SEO title:** "Free Estimate Request | All Phase Renovations Athens GA"

---

## SEO Strategy

- All pages: unique `<title>`, `<meta description>`, Open Graph tags
- Semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>`, proper heading hierarchy
- Keywords used naturally in headings and body copy:
  - "Remodeling Athens GA", "Painter Athens GA", "Flooring Athens Georgia"
  - "Bathroom Remodeling Athens GA", "Kitchen Remodeling Athens GA"
  - "Home Renovation Athens GA", "Deck Builder Athens GA"
  - "Contractor Athens Georgia"
- Local business schema markup in `index.html`
- Images: descriptive `alt` text on every image
- Lazy loading: `loading="lazy"` on all below-fold images

---

## Content Data Files

### `src/data/services.js`
Each service object:
```js
{
  id: 'painting',
  name: 'Interior & Exterior Painting',
  shortDesc: 'Premium finishes, expert prep, lasting results.',
  fullDesc: '...',
  benefits: ['...', '...', '...'],
  photo: 'https://images.unsplash.com/...',
  category: 'interior',
  featured: true
}
```

### `src/data/testimonials.js`
```js
{
  id: 1,
  name: 'Sarah M.',
  city: 'Athens, GA',
  rating: 5,
  text: '...',
  service: 'Kitchen Remodel'
}
```

### `src/data/gallery.js`
```js
{
  id: 1,
  src: 'https://images.unsplash.com/...',
  alt: 'Kitchen remodel Athens GA',
  category: 'kitchen',
  beforeSrc: '...',  // optional, for before/after pairs
  afterSrc: '...'
}
```

---

## Deployment (Hostinger)

1. Run `npm run build` → outputs to `dist/`
2. Upload contents of `dist/` to Hostinger File Manager (public_html)
3. Add `.htaccess` file to `public/` with rewrite rule for SPA routing:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
4. Point domain to Hostinger nameservers

---

## What's Not In Scope

- Backend / form submission (forms show success state only — no server)
- Real image uploads
- CMS / content management
- Blog
- Dark mode toggle (deliberately excluded — dark brand is the identity)
- Video assets (hero falls back to photo)
- Payment / financing integration
