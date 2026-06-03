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
