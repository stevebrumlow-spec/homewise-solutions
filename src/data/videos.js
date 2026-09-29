// ============================================================
// VIDEO DATA — Add your videos here!
// ============================================================
//
// Each video entry needs these fields:
//   id          — Unique number (increment from the last entry)
//   title       — Video title shown on the card and in the modal
//   description — Short description (1-2 sentences)
//   category    — One of: "kitchen-remodel", "deck-build", "painting",
//                 "flooring", "before-after", "walkthrough"
//   videoUrl    — Path to the video file or embed URL:
//                 Local:   "/videos/my-video.mp4"
//                 YouTube: "https://www.youtube.com/embed/VIDEO_ID"
//                 Vimeo:   "https://player.vimeo.com/video/VIDEO_ID"
//   type        — "local", "youtube", or "vimeo"
//   thumbnail   — Path to a thumbnail image (e.g., "/videos/my-thumb.jpg")
//
// For local videos:
//   1. Place your .mp4 file in the /public/videos/ folder
//   2. Place a thumbnail image in /public/videos/ (screenshot from the video works great)
//   3. Set videoUrl to "/videos/your-file.mp4"
//   4. Set thumbnail to "/videos/your-thumb.jpg"
//   5. Set type to "local"
//
// For YouTube videos:
//   1. Go to your YouTube video
//   2. Click Share → Embed → copy the URL from the src attribute
//      (looks like: https://www.youtube.com/embed/dQw4w9WgXcQ)
//   3. Set videoUrl to that embed URL
//   4. Set thumbnail to a local image or use YouTube's thumbnail:
//      https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
//   5. Set type to "youtube"
//
// For Vimeo videos:
//   1. Get the Vimeo video ID from the URL
//   2. Set videoUrl to "https://player.vimeo.com/video/VIDEO_ID"
//   3. Set type to "vimeo"
// ============================================================

export const videos = [
  // --- PLACEHOLDER VIDEOS — Replace these with your real videos ---

  {
    id: 1,
    title: 'Kitchen Remodel Walkthrough',
    description: 'A complete walkthrough of a modern kitchen renovation in Athens, GA — new cabinets, countertops, backsplash, and flooring.',
    category: 'kitchen-remodel',
    videoUrl: '/videos/kitchen-reno.MP4',
    type: 'local',
    thumbnail: '/images/kitchen-after-1280.webp',
  },
  {
    id: 2,
    title: 'Kitchen Renovation Progress',
    description: 'Follow the progress of a full kitchen transformation — demolition through final touches.',
    category: 'kitchen-remodel',
    videoUrl: '/videos/kitchen2-reno.MP4',
    type: 'local',
    thumbnail: '/images/kitchen-before-1280.webp',
  },
  {
    id: 3,
    title: 'Custom Deck Build',
    description: 'Watch a custom deck build from start to finish — footings, framing, decking, and railing.',
    category: 'deck-build',
    videoUrl: '/videos/deck-builds.MP4',
    type: 'local',
    thumbnail: '/images/deck-1-1280.webp',
  },
  {
    id: 4,
    title: 'Room Addition Project',
    description: 'A full room addition project — framing, electrical, drywall, and finishing for extra living space.',
    category: 'walkthrough',
    videoUrl: '/videos/room-addition.MP4',
    type: 'local',
    thumbnail: '/images/porch-after-1280.webp',
  },

  // --- ADD YOUR VIDEOS BELOW THIS LINE ---
  // Copy one of the entries above, change the id, and fill in your details.
  // Example YouTube entry:
  // {
  //   id: 7,
  //   title: 'Your YouTube Video Title',
  //   description: 'Description of the video.',
  //   category: 'kitchen-remodel',
  //   videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  //   type: 'youtube',
  //   thumbnail: 'https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg',
  // },
]

export const videoCategories = [
  'all',
  'kitchen-remodel',
  'deck-build',
  'painting',
  'flooring',
  'before-after',
  'walkthrough',
]

export const categoryLabels = {
  'all': 'All',
  'kitchen-remodel': 'Kitchen Remodel',
  'deck-build': 'Deck Build',
  'painting': 'Painting',
  'flooring': 'Flooring',
  'before-after': 'Before & After',
  'walkthrough': 'Walkthrough',
}
