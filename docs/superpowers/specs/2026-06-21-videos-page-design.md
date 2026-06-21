# Videos Page Design Spec

## Overview

Add a dedicated `/videos` page to the Homewise Solutions website for showcasing project videos, before-and-after clips, walkthroughs, and renovation highlights. Follows the established Gallery page pattern: PageHero + sticky filter bar + responsive card grid + modal player + CTABand.

## Architecture

### New Files

| File | Purpose |
|------|---------|
| `src/data/videos.js` | Video data array with 6 placeholder entries |
| `src/components/ui/VideoModal.jsx` | Lightbox-style modal for playing videos |
| `src/pages/Videos.jsx` | Videos page component |

### Modified Files

| File | Change |
|------|--------|
| `src/App.jsx` | Add import + `<Route path="/videos">` |
| `src/components/layout/Navbar.jsx` | Add `{ to: '/videos', label: 'Videos' }` after Gallery |

## Data Structure: `src/data/videos.js`

```js
{
  id: number,
  title: string,
  description: string,
  category: string,        // "kitchen-remodel" | "deck-build" | "painting" | "flooring" | "before-after" | "walkthrough"
  videoUrl: string,         // Local path ("/videos/file.mp4") or embed URL
  type: "local" | "youtube" | "vimeo",
  thumbnail: string,        // Path to thumbnail image
}
```

- 6 placeholder entries with clear comments for adding real videos
- Mix of local and YouTube type examples
- Categories match the service types on the site

## Videos Page: `src/pages/Videos.jsx`

Mirrors `Gallery.jsx` structure:

1. **SEOMeta** - Video-specific title, description, keywords for Athens GA
2. **PageHero** - Title: "Project Videos", subtitle about real project videos and walkthroughs
3. **Sticky filter bar** - Same styling as Gallery (`bg-[#1a1a1a]`, gold active, `sticky top-16 lg:top-20 z-30`). Categories: all, kitchen-remodel, deck-build, painting, flooring, before-after, walkthrough
4. **Responsive card grid** - `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` inside `section-pad bg-bg-primary`
5. **CTABand** - Custom text: "Have a Project in Mind?" / "Contact Homewise Solutions today for a free estimate."

### Video Card Design

- 16:9 aspect ratio container (`aspect-video`) with thumbnail
- Dark gradient overlay at bottom for text
- Centered play button: semi-transparent circle with play triangle, scale on hover, `aria-label="Play video: {title}"`
- Category badge: gold text, top-left corner
- Title + description: bottom overlay, white on gradient
- Hover: thumbnail scale-up, play button brightens
- `loading="lazy"` on thumbnail images
- Framer Motion stagger entrance animations

## Video Modal: `src/components/ui/VideoModal.jsx`

Styled consistently with existing `LightboxModal`:

- Full-screen overlay: `bg-black/90`, `z-50`
- Close button: top-right, keyboard Escape support
- Video container: centered, max-width ~`max-w-5xl`, 16:9 aspect ratio
  - `type === "local"`: `<video controls autoPlay muted playsInline>` (muted autoplay for accessibility)
  - `type === "youtube"` or `"vimeo"`: `<iframe>` with `allow="autoplay; fullscreen"`, `allowFullScreen`
- Title and description below the player
- Prev/Next arrows to cycle through filtered video list
- AnimatePresence for enter/exit
- Body scroll lock (`overflow: hidden` on body while open)
- Click outside video area to close

## Navigation

Add to `Navbar.jsx` links array at index 3 (after Gallery, before About):
```js
{ to: '/videos', label: 'Videos' }
```

Both desktop and mobile menus iterate this same array, so both update automatically.

## Performance & Accessibility

- Lazy loading on all thumbnail images
- Alt text on all thumbnails: `alt="{title} — {category} video thumbnail"`
- `aria-label` on play buttons
- No autoplay with sound (muted by default)
- YouTube/Vimeo iframes only load when modal opens
- Keyboard navigation: Escape closes modal, arrow keys for prev/next

## No Changes To

- Footer (does not list all nav pages)
- Any existing pages, components, or data files
- Build configuration
