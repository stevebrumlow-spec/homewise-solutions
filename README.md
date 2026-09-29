# HOMEWISE SOLUTIONS LLC Website

Premium residential contractor website for HOMEWISE SOLUTIONS LLC, Athens GA.  
Phone: **404-922-6424**

## Stack

- React 19 + Vite 8
- Tailwind CSS v3
- React Router v7
- Framer Motion v12
- React Hook Form v7

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

Build output goes to `dist/`. Preview runs at http://localhost:4173.

## Deploying to Hostinger

1. Run `npm run build`
2. Upload **all files inside `dist/`** to your Hostinger `public_html` folder via File Manager
3. The `.htaccess` file in `public/` is automatically included in the build — it handles SPA routing so direct URLs like `/services` or `/gallery` work correctly
4. If you upload to a subfolder (not the root), update `vite.config.js` and add `base: '/subfolder-name/'`

**Hostinger notes:**
- Enable Apache mod_rewrite if routes return 404 after upload
- The `.htaccess` requires Apache — if Hostinger uses Nginx, create a redirect rule in the Hostinger panel instead

## Customization Guide

### Change Phone Number
Search for `404-922-6424` and `4049226424` across the project and replace with the new number.  
Key files: `Navbar.jsx`, `Footer.jsx`, `FloatingCTA.jsx`, `Home.jsx`, `Contact.jsx`, `Estimate.jsx`, `index.html`

### Edit Services
Open `src/data/services.js`. Each service object has:
- `name` — displayed in cards and forms
- `shortDesc` — shown on service card hover
- `fullDesc` — full description for service detail
- `benefits` — bullet points
- `photo` — optimized local image path or externally hosted photo URL
- `featured: true/false` — featured services appear on the homepage preview

### Edit Testimonials
The homepage links to the business's Nextdoor recommendations. The old placeholder review data is not displayed. Publish direct quotes only after checking their source and permission to reuse them.

### Replace Gallery Photos
Store original project photos in `assets/originals/`. With Python and Pillow installed, run `python scripts/optimize-images.py` to regenerate WebP variants and their responsive-image manifest. Originals stay in Git but are excluded from the published build.
Open `src/data/gallery.js` and use `/images/<name>-1280.webp` for `src`. The gallery and service cards select the appropriate responsive variant automatically. External URLs also work.
For before/after pairs, set `beforeSrc` and `afterSrc` on the same item.

### Edit Service Areas
Open `src/data/serviceAreas.js`. Edit the `serviceAreas` array.

### Update Business Highlights
Open `src/components/ui/StatsBand.jsx`. Update the static `label` and `value` entries using verified business information. Ratings and insurance statements should never animate through misleading intermediate values. Add a rating only with a verified source and review count.

### Verify Lead Forms
Run `npm test` for both forms' rejected-response, network-failure, retry, and pending-request checks. Requests are simulated in tests and do not send customer inquiries. A successful UI state means Formspree accepted the request; actual email delivery and account configuration must be checked separately.

### Windows Build/Test Troubleshooting
If Vite's config bundler cannot launch a child process in a restricted Windows environment, use `npm run build -- --configLoader native` and `npm test -- --configLoader native --pool threads --maxWorkers 1` with Node 24 LTS.

### Add Google Maps Embed
The Contact page lists the service area without a map placeholder. If adding a map, use a verified service-area location; do not imply there is a customer-facing office without confirming it.

### Change Colors or Fonts
Edit `tailwind.config.js` for color tokens and `src/index.css` for the Google Fonts import URL.

## Project Structure

```
src/
  components/
    layout/      # Navbar, Footer, FloatingCTA, ScrollToTop
    ui/          # All reusable UI components
  data/          # All site content (services, testimonials, gallery, areas)
  hooks/         # useScrollPosition, useIntersectionObserver
  pages/         # Home, Services, Gallery, About, Contact, Estimate
  App.jsx        # Router setup
  index.css      # Tailwind + Google Fonts
public/
  favicon.svg
  .htaccess      # SPA routing for Apache (Hostinger)
docs/
  superpowers/   # Design spec and implementation plan
```
