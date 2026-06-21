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
- `photo` — Unsplash URL (replace with a hosted image URL when you have real photos)
- `featured: true/false` — featured services appear on the homepage preview

### Edit Testimonials
Open `src/data/testimonials.js`. Replace the placeholder reviews with real customer names and quotes.

### Replace Gallery Photos
Open `src/data/gallery.js`. Replace the `src` Unsplash URLs with real project photo URLs.  
Host your photos on Cloudinary, S3, or upload directly to Hostinger and use the URL.  
For before/after pairs, set `beforeSrc` and `afterSrc` on the same item.

### Edit Service Areas
Open `src/data/serviceAreas.js`. Edit the `serviceAreas` array.

### Update Stats Numbers
Open `src/components/ui/StatsBand.jsx`. Update the `target` values in the `stats` array:
- `500` → actual projects completed
- `15` → actual years in business
- `100` → keep at 100 (Licensed & Insured is always 100%)
- `4` → review rating (currently shows "4.9★")

### Add Google Maps Embed
Open `src/pages/Contact.jsx`. Find the map placeholder `<div>` (search for "Replace with Google Maps embed") and replace it with an `<iframe>` from maps.google.com → Share → Embed a map.

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
