import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import LightboxModal from '../components/ui/LightboxModal'
import CTABand from '../components/ui/CTABand'
import { galleryItems, beforeAfterPairs } from '../data/gallery'

const FILTERS = ['all', 'kitchen', 'bathroom', 'flooring', 'painting', 'decks', 'exterior', 'carpentry']

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Project Gallery | HOMEWISE SOLUTIONS LLC Athens GA"
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
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="break-inside-avoid cursor-pointer group relative rounded-lg overflow-hidden mb-4"
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
          </div>
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
