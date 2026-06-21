# All Phase Renovations Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete 6-page premium contractor website for All Phase Renovations (Athens, GA) using React + Vite + Tailwind + React Router v6 + Framer Motion.

**Architecture:** SPA with client-side routing. All content in `/src/data` files. Shared layout components wrap every page. Framer Motion handles all scroll animations and page transitions.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, React Router v6, Framer Motion, React Hook Form, Google Fonts (Bebas Neue + Inter)

---

## File Map

```
src/
  App.jsx
  main.jsx
  index.css
  data/
    services.js
    testimonials.js
    gallery.js
    serviceAreas.js
  hooks/
    useScrollPosition.js
    useIntersectionObserver.js
  components/
    layout/
      Navbar.jsx
      Footer.jsx
      FloatingCTA.jsx
      ScrollToTop.jsx
    ui/
      SEOMeta.jsx
      CTAButton.jsx
      ServiceCard.jsx
      SectionLabel.jsx
      AnimatedCounter.jsx
      BeforeAfterSlider.jsx
      TestimonialsCarousel.jsx
      FAQAccordion.jsx
      LightboxModal.jsx
      PageHero.jsx
      StatsBand.jsx
      CTABand.jsx
  pages/
    Home.jsx
    Services.jsx
    Gallery.jsx
    About.jsx
    Contact.jsx
    Estimate.jsx
public/
  favicon.svg
  .htaccess
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite project**

```bash
cd C:/Users/alhow/Projects/build-calculator
npm create vite@latest . -- --template react
```

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom framer-motion react-hook-form
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind**

Replace `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-hover': '#E0C068',
        'bg-primary': '#111111',
        'bg-secondary': '#1a1a1a',
        'bg-elevated': '#222222',
        'border-subtle': '#2a2a2a',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Configure index.css**

Replace `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply bg-bg-primary text-white font-body;
    -webkit-font-smoothing: antialiased;
  }
}

@layer utilities {
  .gold-divider {
    @apply h-[2px] w-12 bg-gold;
  }
  .section-pad {
    @apply py-20 lg:py-32;
  }
}
```

- [ ] **Step 5: Configure index.html**

Replace `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>All Phase Renovations | Athens GA</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "All Phase Renovations",
      "telephone": "706-424-8498",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Athens",
        "addressRegion": "GA",
        "addressCountry": "US"
      },
      "url": "https://allphaserenovations.com",
      "description": "Athens Georgia's trusted contractor for kitchen remodels, bathroom renovations, flooring, painting, decks, and more.",
      "areaServed": "Athens, GA and surrounding areas"
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create favicon**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#111111"/>
  <text x="50" y="68" font-family="Arial Black" font-size="52" font-weight="900" fill="#C9A84C" text-anchor="middle">APR</text>
</svg>
```

- [ ] **Step 7: Create .htaccess for SPA routing**

Create `public/.htaccess`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite dev server at `http://localhost:5173` with default React page.

- [ ] **Step 9: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React + Tailwind project"
```

---

## Task 2: Data Files

**Files:**
- Create: `src/data/services.js`, `src/data/testimonials.js`, `src/data/gallery.js`, `src/data/serviceAreas.js`

- [ ] **Step 1: Create services.js**

Create `src/data/services.js`:
```js
export const services = [
  {
    id: 'painting',
    name: 'Interior & Exterior Painting',
    shortDesc: 'Premium finishes, expert prep work, and colors that last.',
    fullDesc: 'From single-room refreshes to full exterior repaints, we deliver flawless results. We prep every surface properly — patching, sanding, priming — so your finish looks great and lasts for years.',
    benefits: ['Color consultation included', 'Low-VOC paint options', 'Interior & exterior', 'Residential & commercial'],
    photo: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80',
    category: 'interior',
    featured: true,
  },
  {
    id: 'drywall',
    name: 'Drywall & Sheetrock Repair',
    shortDesc: 'Seamless repairs and full installations you can\'t tell from new.',
    fullDesc: 'Holes, cracks, water damage, or full room drywall installation — we handle it all with precision taping and finishing that blends invisibly with existing walls.',
    benefits: ['Patch repairs', 'Full room installation', 'Texture matching', 'Water damage repair'],
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    category: 'interior',
    featured: false,
  },
  {
    id: 'flooring',
    name: 'Flooring Installation',
    shortDesc: 'LVP, hardwood, and tile installed with precision and care.',
    fullDesc: 'We install luxury vinyl plank, solid and engineered hardwood, ceramic and porcelain tile. Proper subfloor prep is included on every job — no shortcuts.',
    benefits: ['LVP / Luxury Vinyl Plank', 'Hardwood (solid & engineered)', 'Ceramic & porcelain tile', 'Subfloor prep included'],
    photo: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    category: 'interior',
    featured: true,
  },
  {
    id: 'kitchen',
    name: 'Kitchen Remodeling',
    shortDesc: 'Full kitchen transformations from layout to final fixtures.',
    fullDesc: 'Complete kitchen remodels including cabinet installation, countertop replacement, backsplash tile, plumbing coordination, and all finish work. We manage the full project.',
    benefits: ['Cabinet installation', 'Countertop replacement', 'Backsplash & tile', 'Full project management'],
    photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    category: 'remodel',
    featured: true,
  },
  {
    id: 'bathroom',
    name: 'Bathroom Remodeling',
    shortDesc: 'Spa-quality bathroom renovations tailored to your vision.',
    fullDesc: 'From cosmetic refreshes to full gut-and-rebuild renovations, we transform bathrooms into spaces you\'ll love. Tile work, vanity installation, shower enclosures, and more.',
    benefits: ['Tile & stone installation', 'Vanity & fixture install', 'Walk-in shower conversions', 'Tub-to-shower conversions'],
    photo: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    category: 'remodel',
    featured: true,
  },
  {
    id: 'decks',
    name: 'Decks & Porches',
    shortDesc: 'Custom outdoor living spaces built to last Georgia weather.',
    fullDesc: 'We design and build custom decks, porches, and outdoor living areas using pressure-treated lumber, composite decking, and quality hardware rated for the Southeast climate.',
    benefits: ['Pressure-treated & composite', 'Covered porches', 'Railing systems', 'Steps & landings'],
    photo: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80',
    category: 'exterior',
    featured: true,
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Trim Work',
    shortDesc: 'Crown molding, baseboards, and custom millwork done right.',
    fullDesc: 'Precise finish carpentry including crown molding, baseboards, door casings, wainscoting, built-ins, and custom trim details that elevate any room.',
    benefits: ['Crown molding', 'Baseboards & casings', 'Wainscoting', 'Custom built-ins'],
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'interior',
    featured: false,
  },
  {
    id: 'pressure-washing',
    name: 'Pressure Washing',
    shortDesc: 'Restore your home\'s exterior to like-new condition.',
    fullDesc: 'Professional pressure washing for driveways, sidewalks, decks, fences, siding, and roofs. Soft-wash techniques for delicate surfaces. Athens GA homes benefit from annual cleaning.',
    benefits: ['House & siding washing', 'Driveway & concrete', 'Deck & fence cleaning', 'Roof soft-wash'],
    photo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
    category: 'exterior',
    featured: false,
  },
  {
    id: 'concrete',
    name: 'Concrete Work',
    shortDesc: 'Driveways, patios, walkways, and slabs poured with precision.',
    fullDesc: 'New concrete installations and repairs for driveways, sidewalks, patios, steps, and foundation slabs. We also do decorative concrete and stamped finishes.',
    benefits: ['Driveways & patios', 'Sidewalks & steps', 'Stamped & decorative', 'Repairs & resurfacing'],
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    category: 'exterior',
    featured: false,
  },
  {
    id: 'epoxy',
    name: 'Epoxy Floors',
    shortDesc: 'Garage and commercial epoxy floor coatings that impress.',
    fullDesc: 'High-performance epoxy floor coatings for garages, basements, and commercial spaces. Chip, metallic, and solid color systems available with anti-slip additives.',
    benefits: ['Garage floors', 'Basement floors', 'Metallic & chip systems', 'Anti-slip coatings'],
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'interior',
    featured: false,
  },
  {
    id: 'gutters',
    name: 'Gutters',
    shortDesc: 'Seamless gutter installation and repair to protect your home.',
    fullDesc: 'Seamless aluminum and steel gutter installation, repairs, and cleaning. Proper drainage protects your foundation and landscaping. Gutter guard installation available.',
    benefits: ['Seamless aluminum gutters', 'Gutter repairs', 'Gutter guard installation', 'Downspout extensions'],
    photo: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    category: 'exterior',
    featured: false,
  },
  {
    id: 'renovations',
    name: 'General Home Renovations',
    shortDesc: 'Whole-home updates and multi-room renovation projects.',
    fullDesc: 'Comprehensive home renovation projects spanning multiple trades. We coordinate everything from demo to final walkthrough so you have one point of contact throughout.',
    benefits: ['Multi-room projects', 'Single point of contact', 'Full project management', 'Licensed & insured'],
    photo: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    category: 'remodel',
    featured: false,
  },
  {
    id: 'repairs',
    name: 'Home Repairs',
    shortDesc: 'Fast, reliable repairs for all the little things that add up.',
    fullDesc: 'Door repairs, window fixes, rot repair, siding patches, caulking, and all the deferred maintenance that makes a home look neglected. We handle it efficiently.',
    benefits: ['Door & window repairs', 'Rot & moisture damage', 'Siding repairs', 'Caulking & weatherproofing'],
    photo: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80',
    category: 'interior',
    featured: false,
  },
  {
    id: 'custom',
    name: 'Custom Renovation Projects',
    shortDesc: 'Have a unique vision? We\'ll bring it to life.',
    fullDesc: 'Not every project fits a standard category. We work with homeowners on one-of-a-kind spaces — home offices, mudrooms, laundry room transformations, accessory structures, and more.',
    benefits: ['One-of-a-kind spaces', 'Design consultation', 'Flexible scoping', 'Turnkey delivery'],
    photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    category: 'remodel',
    featured: false,
  },
]

export const featuredServices = services.filter(s => s.featured)
```

- [ ] **Step 2: Create testimonials.js**

Create `src/data/testimonials.js`:
```js
export const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    city: 'Athens, GA',
    rating: 5,
    text: 'All Phase transformed our outdated kitchen into something straight out of a magazine. They were professional, on time, and the quality of work exceeded our expectations. Will absolutely use them again.',
    service: 'Kitchen Remodel',
  },
  {
    id: 2,
    name: 'James T.',
    city: 'Watkinsville, GA',
    rating: 5,
    text: 'Had them repaint the entire exterior of our house and install new LVP flooring throughout. Incredible results. The crew was respectful of our home and cleaned up every day. Highly recommend.',
    service: 'Painting & Flooring',
  },
  {
    id: 3,
    name: 'Linda R.',
    city: 'Bogart, GA',
    rating: 5,
    text: 'Our bathroom remodel came out absolutely beautiful. They matched the tile perfectly and the new walk-in shower is a dream. Very fair pricing and they stuck to the timeline they promised.',
    service: 'Bathroom Remodel',
  },
  {
    id: 4,
    name: 'Mike D.',
    city: 'Commerce, GA',
    rating: 5,
    text: 'Built us a gorgeous covered deck that we use every weekend. Solid construction, great materials, and they handled all the permits. The whole process was smooth from start to finish.',
    service: 'Deck Construction',
  },
  {
    id: 5,
    name: 'Patricia H.',
    city: 'Monroe, GA',
    rating: 5,
    text: 'Called them for emergency water damage repair after a pipe burst. They were there the next morning and had everything fixed and looking brand new within the week. Real professionals.',
    service: 'Home Repairs',
  },
  {
    id: 6,
    name: 'David K.',
    city: 'Jefferson, GA',
    rating: 5,
    text: 'The epoxy garage floor they installed is stunning. My neighbors keep asking who did it. Fast installation, zero mess, and the finish has held up perfectly after six months.',
    service: 'Epoxy Floors',
  },
]
```

- [ ] **Step 3: Create gallery.js**

Create `src/data/gallery.js`:
```js
export const galleryItems = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    alt: 'Kitchen remodel Athens GA — modern white cabinets with island',
    category: 'kitchen',
    beforeSrc: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    alt: 'Bathroom remodel Athens GA — walk-in shower with tile',
    category: 'bathroom',
    beforeSrc: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    alt: 'LVP flooring installation Athens Georgia',
    category: 'flooring',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80',
    alt: 'Custom deck build Athens GA — pressure treated lumber',
    category: 'decks',
    beforeSrc: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
    afterSrc: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80',
    alt: 'Interior painting Athens GA — living room refresh',
    category: 'painting',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    alt: 'Home renovation Athens Georgia — open floor plan',
    category: 'kitchen',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    alt: 'Exterior painting and gutters Athens GA',
    category: 'exterior',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    alt: 'Epoxy garage floor Athens Georgia',
    category: 'flooring',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    alt: 'Full home renovation Athens GA',
    category: 'exterior',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80',
    alt: 'Bathroom tile work Athens Georgia',
    category: 'bathroom',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    alt: 'Concrete driveway Athens GA',
    category: 'exterior',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
    alt: 'Kitchen before renovation Athens Georgia',
    category: 'kitchen',
  },
]

export const beforeAfterPairs = galleryItems.filter(i => i.beforeSrc && i.afterSrc)
```

- [ ] **Step 4: Create serviceAreas.js**

Create `src/data/serviceAreas.js`:
```js
export const serviceAreas = [
  'Athens', 'Watkinsville', 'Bogart', 'Commerce', 'Jefferson',
  'Monroe', 'Madison', 'Winder', 'Gainesville', 'Arcade',
  'Danielsville', 'Hull', 'Statham', 'Bishop', 'Winterville',
]

export const primaryArea = 'Clarke County and surrounding Northeast Georgia'
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add all content data files"
```

---

## Task 3: Hooks

**Files:**
- Create: `src/hooks/useScrollPosition.js`, `src/hooks/useIntersectionObserver.js`

- [ ] **Step 1: Create useScrollPosition.js**

Create `src/hooks/useScrollPosition.js`:
```js
import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return scrollY
}
```

- [ ] **Step 2: Create useIntersectionObserver.js**

Create `src/hooks/useIntersectionObserver.js`:
```js
import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/
git commit -m "feat: add scroll position and intersection observer hooks"
```

---

## Task 4: Layout Components

**Files:**
- Create: `src/components/layout/ScrollToTop.jsx`, `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`, `src/components/layout/FloatingCTA.jsx`

- [ ] **Step 1: Create ScrollToTop.jsx**

Create `src/components/layout/ScrollToTop.jsx`:
```jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
```

- [ ] **Step 2: Create Navbar.jsx**

Create `src/components/layout/Navbar.jsx`:
```jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrollY = useScrollPosition()
  const scrolled = scrollY > 80

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#111111]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none">
              <span className="font-display text-2xl text-gold tracking-widest">ALL PHASE</span>
              <span className="font-body text-[10px] text-gray-400 tracking-[0.25em] uppercase">Renovations</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `font-body text-sm tracking-wider uppercase transition-colors duration-200 relative group ${
                      isActive ? 'text-gold' : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="tel:7064248498"
                className="bg-gold hover:bg-gold-hover text-[#111111] font-body font-bold text-sm tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
              >
                Call Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="Toggle menu"
            >
              <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#111111] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-4xl tracking-widest ${isActive ? 'text-gold' : 'text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="tel:7064248498"
              className="mt-4 bg-gold text-[#111111] font-body font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm"
            >
              Call 706-424-8498
            </a>
            <Link
              to="/estimate"
              onClick={() => setOpen(false)}
              className="border border-gold text-gold font-body font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm"
            >
              Free Estimate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 3: Create Footer.jsx**

Create `src/components/layout/Footer.jsx`:
```jsx
import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { serviceAreas } from '../../data/serviceAreas'

export default function Footer() {
  const year = new Date().getFullYear()
  const footerServices = services.slice(0, 7)

  return (
    <footer className="bg-[#0a0a0a] border-t-2 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <div className="font-display text-3xl text-gold tracking-widest mb-1">ALL PHASE</div>
            <div className="font-body text-[10px] text-gray-500 tracking-[0.3em] uppercase mb-4">Renovations</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Athens Georgia's trusted residential contractor. Premium craftsmanship, honest pricing, and results that last.
            </p>
            <a href="tel:7064248498" className="text-gold font-body font-bold text-lg hover:text-gold-hover transition-colors">
              706-424-8498
            </a>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-display text-xl text-white tracking-widest mb-6">SERVICES</h4>
            <ul className="space-y-2">
              {footerServices.map(s => (
                <li key={s.id}>
                  <Link to="/services" className="text-gray-400 text-sm hover:text-gold transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-gold text-sm hover:text-gold-hover transition-colors">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <h4 className="font-display text-xl text-white tracking-widest mb-6">SERVICE AREAS</h4>
            <ul className="space-y-2">
              {serviceAreas.slice(0, 8).map(area => (
                <li key={area} className="text-gray-400 text-sm">{area}, GA</li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-display text-xl text-white tracking-widest mb-6">CONTACT</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Phone</div>
                <a href="tel:7064248498" className="text-white hover:text-gold transition-colors">706-424-8498</a>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Location</div>
                <div>Athens, Georgia</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Hours</div>
                <div>Mon–Fri: 7am–6pm</div>
                <div>Sat: 8am–4pm</div>
              </div>
              <div className="pt-4">
                <Link
                  to="/estimate"
                  className="inline-block bg-gold hover:bg-gold-hover text-[#111111] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors"
                >
                  Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#222] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© {year} All Phase Renovations · Athens, GA · Licensed & Insured</span>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
            <Link to="/estimate" className="hover:text-gray-400 transition-colors">Free Estimate</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Create FloatingCTA.jsx**

Create `src/components/layout/FloatingCTA.jsx`:
```jsx
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FloatingCTA() {
  const [hidden, setHidden] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const sentinel = document.querySelector('footer')
    if (!sentinel) return
    const observer = new IntersectionObserver(([e]) => setHidden(e.isIntersecting))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  if (hidden) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex h-14 shadow-2xl">
      <a
        href="tel:7064248498"
        className="flex-1 flex items-center justify-center gap-2 bg-gold text-[#111111] font-bold text-sm tracking-wide"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Call Now
      </a>
      <Link
        to="/estimate"
        className="flex-1 flex items-center justify-center bg-[#1a1a1a] text-white font-bold text-sm tracking-wide border-l border-[#333]"
      >
        Free Estimate
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Navbar, Footer, FloatingCTA, ScrollToTop layout components"
```

---

## Task 5: UI Primitives

**Files:**
- Create: `src/components/ui/SEOMeta.jsx`, `src/components/ui/CTAButton.jsx`, `src/components/ui/SectionLabel.jsx`, `src/components/ui/PageHero.jsx`, `src/components/ui/StatsBand.jsx`, `src/components/ui/CTABand.jsx`

- [ ] **Step 1: Create SEOMeta.jsx**

Create `src/components/ui/SEOMeta.jsx`:
```jsx
import { useEffect } from 'react'

export default function SEOMeta({ title, description, keywords }) {
  useEffect(() => {
    document.title = title
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
      el.content = content
    }
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el) }
      el.content = content
    }
    if (description) { setMeta('description', description); setOG('og:description', description) }
    if (keywords) setMeta('keywords', keywords)
    setOG('og:title', title)
  }, [title, description, keywords])

  return null
}
```

- [ ] **Step 2: Create CTAButton.jsx**

Create `src/components/ui/CTAButton.jsx`:
```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTAButton({ to, href, children, variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center justify-center font-body font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200'
  const variants = {
    primary: 'bg-gold hover:bg-gold-hover text-[#111111]',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-[#111111]',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) return <a href={href} className={cls}>{children}</a>
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link to={to} className={cls}>{children}</Link>
    </motion.div>
  )
}
```

- [ ] **Step 3: Create SectionLabel.jsx**

Create `src/components/ui/SectionLabel.jsx`:
```jsx
import { motion } from 'framer-motion'

export default function SectionLabel({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center' : ''}
    >
      {eyebrow && (
        <p className="text-gold font-body font-semibold text-xs tracking-[0.3em] uppercase mb-3">{eyebrow}</p>
      )}
      <h2 className={`font-display text-4xl lg:text-5xl tracking-wider mb-4 ${light ? 'text-[#111]' : 'text-white'}`}>
        {title}
      </h2>
      <div className={`gold-divider mb-6 ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`font-body text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-gray-600' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 4: Create PageHero.jsx**

Create `src/components/ui/PageHero.jsx`:
```jsx
import { motion } from 'framer-motion'

export default function PageHero({ title, subtitle, photo }) {
  const bg = photo || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80'
  return (
    <section
      className="relative flex items-center justify-center h-[50vh] min-h-[320px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center px-4"
      >
        <p className="text-gold font-body font-semibold text-xs tracking-[0.4em] uppercase mb-4">
          ALL PHASE RENOVATIONS
        </p>
        <h1 className="font-display text-5xl lg:text-7xl text-white tracking-wider">{title}</h1>
        {subtitle && <p className="mt-4 text-gray-300 font-body text-lg max-w-xl mx-auto">{subtitle}</p>}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 5: Create StatsBand.jsx**

Create `src/components/ui/StatsBand.jsx`:
```jsx
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useEffect, useState } from 'react'

function Counter({ target, suffix = '', duration = 2000 }) {
  const [ref, isVisible] = useIntersectionObserver()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const start = Date.now()
    const end = Date.now() + duration
    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (now >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return (
    <span ref={ref} className="font-display text-4xl lg:text-5xl text-gold tracking-wider">
      {count}{suffix}
    </span>
  )
}

const stats = [
  { label: 'Projects Completed', target: 500, suffix: '+' },
  { label: 'Years of Experience', target: 15, suffix: '+' },
  { label: 'Licensed & Insured', target: 100, suffix: '%' },
  { label: 'Customer Rating', target: 4, suffix: '.9★' },
]

export default function StatsBand() {
  return (
    <section className="bg-[#1a1a1a] py-12 border-y border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ label, target, suffix }) => (
            <div key={label}>
              <Counter target={target} suffix={suffix} />
              <p className="mt-2 font-body text-sm text-gray-400 tracking-wider uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create CTABand.jsx**

Create `src/components/ui/CTABand.jsx`:
```jsx
import { motion } from 'framer-motion'
import CTAButton from './CTAButton'

export default function CTABand({ title = "Ready to Start Your Project?", subtitle = "Contact us today for a free estimate. No obligation, no pressure." }) {
  return (
    <section className="bg-[#1a1a1a] border-y border-[#2a2a2a] py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        <h2 className="font-display text-4xl lg:text-5xl text-white tracking-wider mb-4">{title}</h2>
        <p className="text-gray-400 font-body text-lg mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton to="/estimate">Get a Free Estimate</CTAButton>
          <CTAButton href="tel:7064248498" variant="outline">Call 706-424-8498</CTAButton>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI primitive components (SEOMeta, CTAButton, SectionLabel, PageHero, StatsBand, CTABand)"
```

---

## Task 6: ServiceCard + AnimatedCounter

**Files:**
- Create: `src/components/ui/ServiceCard.jsx`

- [ ] **Step 1: Create ServiceCard.jsx**

Create `src/components/ui/ServiceCard.jsx`:
```jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.03 }}
      className="relative rounded-lg overflow-hidden group cursor-pointer"
      style={{ aspectRatio: '4/3' }}
    >
      <img
        src={service.photo}
        alt={`${service.name} Athens GA`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-2xl text-white tracking-wider leading-tight mb-1">
          {service.name}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {service.shortDesc}
        </p>
        <Link
          to="/estimate"
          className="inline-flex items-center gap-2 text-gold text-xs font-body font-bold tracking-widest uppercase border-b border-gold pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Get a Quote <span>→</span>
        </Link>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ServiceCard.jsx
git commit -m "feat: add ServiceCard component with hover reveal"
```

---

## Task 7: BeforeAfterSlider + TestimonialsCarousel

**Files:**
- Create: `src/components/ui/BeforeAfterSlider.jsx`, `src/components/ui/TestimonialsCarousel.jsx`

- [ ] **Step 1: Create BeforeAfterSlider.jsx**

Create `src/components/ui/BeforeAfterSlider.jsx`:
```jsx
import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt = 'Before', afterAlt = 'After' }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onMouseDown = () => { dragging.current = true }
  const onMouseMove = (e) => { if (dragging.current) updatePos(e.clientX) }
  const onMouseUp = () => { dragging.current = false }
  const onTouchMove = (e) => { updatePos(e.touches[0].clientX) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      ref={containerRef}
      className="relative rounded-lg overflow-hidden select-none cursor-col-resize"
      style={{ aspectRatio: '16/9' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After (full width background) */}
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold tracking-widest uppercase px-2 py-1 rounded">After</div>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={beforeSrc} alt={beforeAlt} className="absolute inset-0 w-full h-full object-cover" style={{ width: containerRef.current?.offsetWidth || '100%' }} draggable={false} />
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold tracking-widest uppercase px-2 py-1 rounded">Before</div>
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gold cursor-col-resize"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-[#111]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5l-5 5 5 5M12 5l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Create TestimonialsCarousel.jsx**

Create `src/components/ui/TestimonialsCarousel.jsx`:
```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../../data/testimonials'

function Stars({ count }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold fill-gold" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ]

  return (
    <div>
      {/* Desktop: show 3 */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {visible.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
          >
            <Stars count={t.rating} />
            <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white font-body font-semibold">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.city}</p>
              </div>
              <span className="text-gold text-xs font-body tracking-widest uppercase">{t.service}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile: show 1 */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6"
          >
            <Stars count={testimonials[current].rating} />
            <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{testimonials[current].text}"</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white font-body font-semibold">{testimonials[current].name}</p>
                <p className="text-gray-500 text-xs">{testimonials[current].city}</p>
              </div>
              <span className="text-gold text-xs tracking-widest uppercase">{testimonials[current].service}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current % testimonials.length ? 'bg-gold w-6' : 'bg-[#333]'}`}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/BeforeAfterSlider.jsx src/components/ui/TestimonialsCarousel.jsx
git commit -m "feat: add BeforeAfterSlider and TestimonialsCarousel components"
```

---

## Task 8: FAQAccordion + LightboxModal

**Files:**
- Create: `src/components/ui/FAQAccordion.jsx`, `src/components/ui/LightboxModal.jsx`

- [ ] **Step 1: Create FAQAccordion.jsx**

Create `src/components/ui/FAQAccordion.jsx`:
```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Do you provide free estimates?',
    a: 'Yes — all estimates are completely free and come with no obligation. We\'ll assess your project, discuss your goals, and provide a detailed written quote.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Absolutely. All Phase Renovations is fully licensed and insured in the state of Georgia. We carry general liability insurance and workers\' compensation on all jobs.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Athens and the surrounding Northeast Georgia area including Watkinsville, Bogart, Commerce, Jefferson, Monroe, Madison, Winder, Gainesville, and all of Clarke County.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope. A single-room paint job takes 1–2 days. A bathroom remodel typically takes 1–2 weeks. A kitchen remodel runs 2–4 weeks. We\'ll give you a firm timeline before we start.',
  },
  {
    q: 'Do you handle permits?',
    a: 'Yes. For projects that require building permits in Athens-Clarke County or surrounding municipalities, we handle the permitting process as part of the project.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, check, and all major credit cards. Larger projects are typically structured with a deposit, progress payment, and final payment on completion.',
  },
  {
    q: 'Can I see examples of your previous work?',
    a: 'Yes — visit our Gallery page for photos of recent projects, or call us and we can connect you with past clients for references.',
  },
  {
    q: 'Do you offer any warranty on your work?',
    a: 'We stand behind our workmanship. All Phase Renovations provides a one-year warranty on labor for all completed projects. Material warranties vary by manufacturer.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-2 max-w-3xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-[#2a2a2a] rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left bg-[#1a1a1a] hover:bg-[#222] transition-colors"
          >
            <span className="font-body font-semibold text-white pr-4">{faq.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gold text-2xl flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-6 py-5 text-gray-400 font-body text-sm leading-relaxed bg-[#151515]">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create LightboxModal.jsx**

Create `src/components/ui/LightboxModal.jsx`:
```jsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LightboxModal({ items, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  const item = items[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/60 hover:text-white text-3xl font-light z-10"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute -top-10 left-0 text-gray-400 text-sm font-body">
            {currentIndex + 1} / {items.length}
          </div>

          {/* Image */}
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={item.src}
            alt={item.alt}
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />

          {/* Prev */}
          <button
            onClick={onPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors"
          >
            ←
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors"
          >
            →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/FAQAccordion.jsx src/components/ui/LightboxModal.jsx
git commit -m "feat: add FAQAccordion and LightboxModal components"
```

---

## Task 9: App.jsx + main.jsx Wiring

**Files:**
- Modify: `src/App.jsx`, `src/main.jsx`

- [ ] **Step 1: Update main.jsx**

Replace `src/main.jsx`:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 2: Update App.jsx**

Replace `src/App.jsx`:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingCTA from './components/layout/FloatingCTA'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Estimate from './pages/Estimate'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-bg-primary">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/estimate" element={<Estimate />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </BrowserRouter>
  )
}
```

- [ ] **Step 3: Create stub pages so the app compiles**

Create `src/pages/Home.jsx`:
```jsx
export default function Home() { return <div className="pt-20 p-8 text-white">Home — coming soon</div> }
```

Repeat for `Services.jsx`, `Gallery.jsx`, `About.jsx`, `Contact.jsx`, `Estimate.jsx` with matching labels.

- [ ] **Step 4: Verify app runs with routing**

```bash
npm run dev
```
Expected: App loads at `http://localhost:5173`, Navbar visible, Footer visible, nav links change URL.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/main.jsx src/pages/
git commit -m "feat: wire up React Router, layout shell, and stub pages"
```

---

## Task 10: Home Page

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Build Home.jsx**

Replace `src/pages/Home.jsx`:
```jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEOMeta from '../components/ui/SEOMeta'
import SectionLabel from '../components/ui/SectionLabel'
import ServiceCard from '../components/ui/ServiceCard'
import StatsBand from '../components/ui/StatsBand'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import TestimonialsCarousel from '../components/ui/TestimonialsCarousel'
import CTAButton from '../components/ui/CTAButton'
import { featuredServices } from '../data/services'
import { serviceAreas } from '../data/serviceAreas'
import { beforeAfterPairs } from '../data/gallery'

const HERO_PHOTO = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85'

export default function Home() {
  return (
    <>
      <SEOMeta
        title="Athens GA Renovation & Remodeling Experts | All Phase Renovations"
        description="All Phase Renovations — Athens Georgia's trusted contractor for kitchen remodels, bathroom renovations, flooring, painting, decks, and more. Call 706-424-8498 for a free estimate."
        keywords="remodeling Athens GA, contractor Athens Georgia, home renovation Athens GA, kitchen remodeling Athens GA, bathroom remodeling Athens GA"
      />

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_PHOTO})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative text-center px-4 max-w-5xl mx-auto"
        >
          <p className="text-gold font-body font-semibold text-xs tracking-[0.4em] uppercase mb-6">
            ATHENS, GEORGIA · LICENSED & INSURED
          </p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl text-white tracking-wider leading-none mb-6">
            Athens Georgia's Trusted Renovation & Remodeling Experts
          </h1>
          <p className="text-gray-300 font-body text-lg lg:text-xl max-w-2xl mx-auto mb-10">
            Premium craftsmanship. Honest pricing. Results that last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/estimate">Get a Free Estimate</CTAButton>
            <CTAButton href="tel:7064248498" variant="outline">Call 706-424-8498</CTAButton>
          </div>
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Stats */}
      <StatsBand />

      {/* Services Preview */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel
            eyebrow="What We Do"
            title="Our Services"
            subtitle="From a fresh coat of paint to a full kitchen transformation — we handle it all with the same level of care and craftsmanship."
            center
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="text-gold font-body font-bold text-sm tracking-widest uppercase border-b border-gold pb-1 hover:text-gold-hover hover:border-gold-hover transition-colors">
              View All 14 Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Why All Phase" title="Built on Trust & Craftsmanship" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏆', title: 'Premium Craftsmanship', desc: 'Every project is executed with the precision and attention to detail you\'d expect from a luxury builder.' },
              { icon: '🛡️', title: 'Licensed & Insured', desc: 'Fully licensed in Georgia and carrying comprehensive liability insurance on every job.' },
              { icon: '💬', title: 'Free Estimates', desc: 'No pressure, no obligation. We\'ll assess your project and give you a detailed written quote — free.' },
              { icon: '📍', title: 'Athens Local', desc: 'We live and work here. We know the homes, the neighborhoods, and what it means to be your neighbor.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-lg border border-[#2a2a2a] hover:border-gold/40 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl text-white tracking-wider mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Our Work" title="Our Work Speaks For Itself" center />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {beforeAfterPairs.map(item => (
              <BeforeAfterSlider key={item.id} beforeSrc={item.beforeSrc} afterSrc={item.afterSrc} />
            ))}
          </div>
          <p className="text-center mt-6 text-gray-500 text-sm">Drag the handle to reveal before & after</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Reviews" title="What Our Customers Say" center />
          <div className="mt-12">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Coverage" title="Proudly Serving Northeast Georgia" center />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-3 gap-x-6">
            {serviceAreas.map(area => (
              <div key={area} className="flex items-center gap-2">
                <span className="text-gold text-xs">▸</span>
                <span className="text-gray-300 text-sm font-body">{area}, GA</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-gold py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-xs font-bold tracking-[0.3em] uppercase text-[#111] mb-1">Emergency Repairs</p>
            <p className="font-display text-3xl text-[#111] tracking-wider">Need Emergency Home Repairs?</p>
          </div>
          <a
            href="tel:7064248498"
            className="flex-shrink-0 bg-[#111] text-gold font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-[#222] transition-colors"
          >
            Call Now: 706-424-8498
          </a>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify Home page renders**

```bash
npm run dev
```
Expected: Navigate to `http://localhost:5173` — hero displays with gold headline and CTAs, stats band visible below.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: build Home page with all sections"
```

---

## Task 11: Services Page

**Files:**
- Modify: `src/pages/Services.jsx`

- [ ] **Step 1: Build Services.jsx**

Replace `src/pages/Services.jsx`:
```jsx
import { motion } from 'framer-motion'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import ServiceCard from '../components/ui/ServiceCard'
import FAQAccordion from '../components/ui/FAQAccordion'
import CTABand from '../components/ui/CTABand'
import { services } from '../data/services'

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Remodeling Services Athens GA | All Phase Renovations"
        description="Kitchen remodeling, bathroom renovation, flooring, painting, decks, drywall, epoxy floors, and more in Athens GA. Licensed and insured contractor. Free estimates."
        keywords="painter Athens GA, flooring Athens Georgia, kitchen remodeling Athens GA, bathroom remodeling Athens GA, deck builder Athens GA"
      />

      <PageHero
        title="Our Services"
        subtitle="14 services. One trusted contractor. Athens Georgia's go-to renovation team."
      />

      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="All Services" title="Everything We Do" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="FAQ" title="Common Questions" center />
          <div className="mt-12">
            <FAQAccordion />
          </div>
        </div>
      </section>

      <CTABand />
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Services.jsx
git commit -m "feat: build Services page"
```

---

## Task 12: Gallery Page

**Files:**
- Modify: `src/pages/Gallery.jsx`

- [ ] **Step 1: Build Gallery.jsx**

Replace `src/pages/Gallery.jsx`:
```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import LightboxModal from '../components/ui/LightboxModal'
import CTABand from '../components/ui/CTABand'
import { galleryItems, beforeAfterPairs } from '../data/gallery'

const FILTERS = ['all', 'kitchen', 'bathroom', 'flooring', 'painting', 'decks', 'exterior']

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Project Gallery | All Phase Renovations Athens GA"
        description="Browse our portfolio of completed renovation and remodeling projects in Athens, GA. Kitchen remodels, bathroom renovations, flooring, painting, decks, and more."
        keywords="renovation gallery Athens GA, remodeling photos Athens Georgia, contractor portfolio Athens GA"
      />

      <PageHero title="Our Work" subtitle="Real projects. Real results. Athens Georgia homes transformed." />

      {/* Filters */}
      <section className="py-8 bg-[#1a1a1a] border-b border-[#2a2a2a] sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 flex-wrap justify-center">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-body text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-200 ${
                filter === f ? 'bg-gold text-[#111]' : 'bg-[#222] text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="break-inside-avoid cursor-pointer group relative rounded-lg overflow-hidden"
                  onClick={() => setLightboxIndex(filtered.indexOf(item))}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-body font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View ↗
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Transformations" title="Before & After" center />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {beforeAfterPairs.map(item => (
              <BeforeAfterSlider key={item.id} beforeSrc={item.beforeSrc} afterSrc={item.afterSrc} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />

      {lightboxIndex !== null && (
        <LightboxModal
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightboxIndex(i => (i + 1) % filtered.length)}
        />
      )}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Gallery.jsx
git commit -m "feat: build Gallery page with masonry grid, filters, and lightbox"
```

---

## Task 13: About Page

**Files:**
- Modify: `src/pages/About.jsx`

- [ ] **Step 1: Build About.jsx**

Replace `src/pages/About.jsx`:
```jsx
import { motion } from 'framer-motion'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import StatsBand from '../components/ui/StatsBand'
import CTABand from '../components/ui/CTABand'
import CTAButton from '../components/ui/CTAButton'

const values = [
  { icon: '🏆', title: 'Quality', desc: 'We don\'t cut corners. Every surface, every joint, every finish is executed to last.' },
  { icon: '🤝', title: 'Integrity', desc: 'We give you honest assessments, fair prices, and straight answers — always.' },
  { icon: '📍', title: 'Community', desc: 'We\'re Athens locals. These are our neighborhoods. We care about the community we build in.' },
  { icon: '🔨', title: 'Craftsmanship', desc: 'We take pride in our trade. The work we do reflects who we are as professionals.' },
]

const team = [
  { name: 'Owner', role: 'Founder & Lead Contractor', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Project Manager', role: 'Operations & Scheduling', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Lead Carpenter', role: 'Finish Work & Millwork', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
]

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="About All Phase Renovations | Athens GA Contractor"
        description="Learn about All Phase Renovations — Athens Georgia's locally owned and operated residential contractor. Licensed, insured, and committed to quality craftsmanship."
        keywords="about All Phase Renovations, Athens GA contractor, local remodeling company Athens Georgia"
      />

      <PageHero title="About Us" subtitle="Athens-born. Craft-driven. Community-focused." />

      {/* Story */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel eyebrow="Our Story" title="Athens Born, Craft Driven" />
            <div className="space-y-4 text-gray-400 font-body leading-relaxed">
              <p>All Phase Renovations was built on a simple belief: homeowners in Athens, Georgia deserve the same quality of work you'd expect from the most expensive contractors in Atlanta — without the big-city price tag or the runaround.</p>
              <p>We started with one truck, one crew, and a commitment to showing up on time, doing the work right, and treating every home as if it were our own. That reputation spread through Clarke County one satisfied homeowner at a time.</p>
              <p>Today we handle everything from a single bathroom remodel to whole-home renovations — always with the same hands-on attention that built our name. We're licensed, insured, and proud to be your neighbors.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img
              src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80"
              alt="All Phase Renovations team at work in Athens GA"
              loading="lazy"
              className="rounded-lg w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <StatsBand />

      {/* Values */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="What We Stand For" title="Our Values" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-lg border border-[#2a2a2a] text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display text-xl text-white tracking-wider mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="The Team" title="The People Behind the Work" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.photo}
                  alt={`${member.name} — All Phase Renovations Athens GA`}
                  loading="lazy"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-gold"
                />
                <h3 className="font-display text-lg text-white tracking-wider">{member.name}</h3>
                <p className="text-gray-500 text-xs font-body mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-bg-primary border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {['Licensed in Georgia', 'Fully Insured', 'Locally Owned', 'Satisfaction Guaranteed'].map(badge => (
              <div key={badge} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center text-gold text-xl">✓</div>
                <span className="text-white font-body font-semibold text-sm tracking-wide">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Let's Work Together" subtitle="Ready to transform your Athens home? We'd love to hear about your project." />
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: build About page with story, values, team, and trust badges"
```

---

## Task 14: Contact Page

**Files:**
- Modify: `src/pages/Contact.jsx`

- [ ] **Step 1: Build Contact.jsx**

Replace `src/pages/Contact.jsx`:
```jsx
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import { services } from '../data/services'
import { serviceAreas } from '../data/serviceAreas'

const inputCls = 'w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600'
const errorCls = 'text-red-400 text-xs mt-1 font-body'

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm()

  const onSubmit = (data) => {
    console.log('Contact form submission:', data)
    reset()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Contact All Phase Renovations | Athens GA · 706-424-8498"
        description="Contact All Phase Renovations in Athens, GA. Call 706-424-8498 or send us a message. Free estimates, fast response. Serving Athens and Northeast Georgia."
        keywords="contact All Phase Renovations, Athens GA contractor phone number, remodeling company Athens Georgia contact"
      />

      <PageHero title="Contact Us" subtitle="We respond within 24 hours. Free estimates, no obligation." />

      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <div>
            <SectionLabel eyebrow="Get In Touch" title="Send Us a Message" />
            {isSubmitSuccessful ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-8 bg-[#1a1a1a] border border-gold/30 rounded-lg text-center">
                <div className="text-gold text-4xl mb-4">✓</div>
                <h3 className="font-display text-2xl text-white tracking-wider mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <div>
                  <input {...register('name', { required: 'Name is required' })} placeholder="Full Name *" className={inputCls} />
                  {errors.name && <p className={errorCls}>{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('phone', { required: 'Phone number is required' })} type="tel" placeholder="Phone Number *" className={inputCls} />
                  {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
                </div>
                <div>
                  <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} type="email" placeholder="Email Address *" className={inputCls} />
                  {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                </div>
                <div>
                  <select {...register('service')} className={inputCls}>
                    <option value="">Service Needed (optional)</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <textarea {...register('message', { required: 'Message is required' })} rows={5} placeholder="Tell us about your project *" className={inputCls + ' resize-none'} />
                  {errors.message && <p className={errorCls}>{errors.message.message}</p>}
                </div>
                <button type="submit" className="w-full bg-gold hover:bg-gold-hover text-[#111] font-body font-bold text-sm tracking-widest uppercase py-4 rounded-sm transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <SectionLabel eyebrow="Reach Us Directly" title="Contact Info" />
            <div className="mt-8 space-y-8">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-2">Phone</p>
                <a href="tel:7064248498" className="font-display text-3xl text-gold tracking-wider hover:text-gold-hover transition-colors">
                  706-424-8498
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-2">Business Hours</p>
                <div className="text-gray-300 text-sm font-body space-y-1">
                  <div className="flex justify-between max-w-xs"><span>Monday – Friday</span><span>7:00am – 6:00pm</span></div>
                  <div className="flex justify-between max-w-xs"><span>Saturday</span><span>8:00am – 4:00pm</span></div>
                  <div className="flex justify-between max-w-xs"><span>Sunday</span><span className="text-gray-500">Closed</span></div>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-2">Location</p>
                <p className="text-gray-300 text-sm font-body">Athens, Georgia</p>
                <p className="text-gray-500 text-xs font-body mt-1">Serving all of Clarke County and surrounding areas</p>
              </div>
              {/* Map placeholder */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-xs font-body uppercase tracking-widest mb-2">Athens, GA</p>
                  <p className="text-gray-600 text-xs font-body">Replace with Google Maps embed</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-3">Service Areas</p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map(area => (
                    <span key={area} className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 px-3 py-1 rounded-sm font-body">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast response band */}
      <section className="py-10 bg-[#1a1a1a] border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {['We respond within 24 hours', 'Free estimates — always', 'No obligation, no pressure'].map(text => (
            <div key={text} className="flex items-center justify-center gap-2">
              <span className="text-gold">✓</span>
              <span className="text-gray-300 font-body text-sm">{text}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "feat: build Contact page with form and info panel"
```

---

## Task 15: Estimate Page

**Files:**
- Modify: `src/pages/Estimate.jsx`

- [ ] **Step 1: Build Estimate.jsx**

Replace `src/pages/Estimate.jsx`:
```jsx
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import { services } from '../data/services'

const inputCls = 'w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600'
const errorCls = 'text-red-400 text-xs mt-1 font-body'
const labelCls = 'block text-gray-400 font-body text-xs uppercase tracking-widest mb-2'

export default function Estimate() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm()

  const onSubmit = (data) => {
    console.log('Estimate request:', data)
    reset()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Free Estimate Request | All Phase Renovations Athens GA"
        description="Request a free renovation estimate from All Phase Renovations in Athens, GA. No obligation. We respond within 24 hours. Serving Athens and Northeast Georgia."
        keywords="free estimate Athens GA, remodeling quote Athens Georgia, renovation estimate Athens GA contractor"
      />

      <PageHero title="Free Estimate" subtitle="Tell us about your project and we'll get back to you within 24 hours." />

      {/* Trust strip */}
      <section className="py-6 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: '💬', text: 'Free Estimate' },
            { icon: '⚡', text: 'Respond in 24 Hours' },
            { icon: '✋', text: 'No Obligation' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-2">
              <span>{icon}</span>
              <span className="text-gray-300 font-body text-sm font-semibold">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLabel eyebrow="Request a Quote" title="Tell Us About Your Project" center />

          {isSubmitSuccessful ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-10 bg-[#1a1a1a] border border-gold/30 rounded-lg text-center">
              <div className="text-gold text-5xl mb-4">✓</div>
              <h2 className="font-display text-3xl text-white tracking-wider mb-4">Estimate Request Received!</h2>
              <p className="text-gray-400 font-body leading-relaxed mb-6">
                Thank you for reaching out. We'll review your project details and get back to you within 24 hours with your free estimate.
              </p>
              <a href="tel:7064248498" className="text-gold font-body font-bold text-lg hover:text-gold-hover transition-colors">
                Or call us now: 706-424-8498
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Full Name *</label>
                  <input {...register('name', { required: 'Name is required' })} placeholder="John Smith" className={inputCls} />
                  {errors.name && <p className={errorCls}>{errors.name.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Phone Number *</label>
                  <input {...register('phone', { required: 'Phone is required' })} type="tel" placeholder="(706) 555-0000" className={inputCls} />
                  {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className={labelCls}>Email Address *</label>
                <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} type="email" placeholder="you@email.com" className={inputCls} />
                {errors.email && <p className={errorCls}>{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelCls}>Service Type *</label>
                <select {...register('service', { required: 'Please select a service' })} className={inputCls}>
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {errors.service && <p className={errorCls}>{errors.service.message}</p>}
              </div>

              <div>
                <label className={labelCls}>Project Description *</label>
                <textarea {...register('description', { required: 'Please describe your project' })} rows={5} placeholder="Describe your project in as much detail as possible — the more you share, the more accurate your estimate will be." className={inputCls + ' resize-none'} />
                {errors.description && <p className={errorCls}>{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Estimated Budget</label>
                  <select {...register('budget')} className={inputCls}>
                    <option value="">Select a range...</option>
                    <option value="under1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 – $5,000</option>
                    <option value="5k-15k">$5,000 – $15,000</option>
                    <option value="15k-50k">$15,000 – $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Desired Timeline</label>
                  <select {...register('timeline')} className={inputCls}>
                    <option value="">Select timeline...</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1month">Within 1 month</option>
                    <option value="1-3months">1–3 months</option>
                    <option value="3-6months">3–6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Upload Photos (optional)</label>
                <div className="w-full bg-[#1a1a1a] border border-dashed border-[#333] rounded-sm px-4 py-8 text-center cursor-pointer hover:border-gold/40 transition-colors">
                  <input type="file" multiple accept="image/*" className="hidden" id="photos" />
                  <label htmlFor="photos" className="cursor-pointer">
                    <p className="text-gray-500 text-sm font-body">Click to upload project photos</p>
                    <p className="text-gray-600 text-xs font-body mt-1">JPG, PNG up to 10MB each</p>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-gold hover:bg-gold-hover text-[#111] font-body font-bold text-sm tracking-widest uppercase py-5 rounded-sm transition-colors">
                Submit Estimate Request
              </button>

              <p className="text-center text-gray-600 text-xs font-body">
                Or call us directly: <a href="tel:7064248498" className="text-gold hover:text-gold-hover">706-424-8498</a>
              </p>
            </form>
          )}
        </div>
      </section>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Estimate.jsx
git commit -m "feat: build Estimate page with full quote form"
```

---

## Task 16: Final Polish & Build Verification

**Files:**
- Verify all files, run build, check for errors

- [ ] **Step 1: Run dev server and check all pages**

```bash
npm run dev
```
Manually navigate to: `/`, `/services`, `/gallery`, `/about`, `/contact`, `/estimate`
Expected: All pages load, Navbar transitions on scroll, FloatingCTA appears on mobile viewport.

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: `dist/` folder created with no errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```
Expected: Site works at `http://localhost:4173` with all routes functional.

- [ ] **Step 4: Create README.md**

Create `README.md`:
```markdown
# All Phase Renovations Website

Premium contractor website for All Phase Renovations, Athens GA.

## Stack
- React 18 + Vite 5
- Tailwind CSS v3
- React Router v6
- Framer Motion
- React Hook Form

## Local Development

```bash
npm install
npm run dev
```
Open http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to Hostinger

1. Run `npm run build`
2. Upload all files inside `dist/` to your Hostinger `public_html` folder
3. The `.htaccess` file in `public/` is automatically included in the build — it handles SPA routing
4. If routes don't work after upload, verify `Options -MultiViews` is supported by your Hostinger plan

## Customization Guide

### Phone Number
Search for `706-424-8498` across the project and replace with the new number. Key files: `Navbar.jsx`, `Footer.jsx`, `FloatingCTA.jsx`, `Home.jsx`, `Contact.jsx`, `Estimate.jsx`, `index.html`.

### Services
Edit `src/data/services.js` — each service has `name`, `shortDesc`, `fullDesc`, `benefits`, and `photo` (Unsplash URL).

### Testimonials
Edit `src/data/testimonials.js` — replace placeholder reviews with real customer quotes.

### Gallery Photos
Edit `src/data/gallery.js` — replace Unsplash URLs with real project photos. Host images on Cloudinary, S3, or upload to Hostinger.

### Service Areas
Edit `src/data/serviceAreas.js`.

### Stats Bar Numbers
Edit `src/components/ui/StatsBand.jsx` — update the `target` values in the `stats` array.

### Google Maps
In `src/pages/Contact.jsx`, replace the map placeholder `<div>` with an actual Google Maps `<iframe>` embed code from maps.google.com.
```

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete All Phase Renovations website — all pages, components, and assets"
```

---

## Self-Review Checklist

- [x] **Hero** — full-screen photo, Bebas Neue headline, two CTAs, scroll chevron
- [x] **Stats bar** — 4 animated counters
- [x] **Services preview** — 6 featured photo cards on Home, all 14 on Services page
- [x] **Why Choose Us** — 4 icon blocks
- [x] **Before/After** — drag-handle slider, 3 pairs
- [x] **Testimonials** — auto-advance carousel, 3 visible desktop / 1 mobile
- [x] **Service areas** — listed on Home, Contact, and Footer
- [x] **Emergency banner** — gold band on Home
- [x] **Gallery** — masonry grid, filter tabs, lightbox modal
- [x] **FAQ** — 8 questions accordion on Services page
- [x] **About** — story, stats, values, team, trust badges
- [x] **Contact** — form + info panel + map placeholder + hours
- [x] **Estimate** — full form with all fields, success state
- [x] **SEOMeta** — unique title/description/keywords on every page
- [x] **Local business schema** — in index.html
- [x] **Navbar** — transparent → dark on scroll, mobile hamburger
- [x] **FloatingCTA** — mobile only, hides when footer visible
- [x] **Hostinger .htaccess** — in public/
- [x] **README** — customization guide included
