import { useState } from 'react'
import { motion } from 'framer-motion'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import VideoModal from '../components/ui/VideoModal'
import CTABand from '../components/ui/CTABand'
import { videos, videoCategories, categoryLabels } from '../data/videos'

export default function Videos() {
  const [filter, setFilter] = useState('all')
  const [activeIndex, setActiveIndex] = useState(null)

  const filtered = filter === 'all' ? videos : videos.filter(v => v.category === filter)
  const activeVideo = activeIndex !== null ? filtered[activeIndex] : null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Project Videos & Renovation Walkthroughs | HOMEWISE SOLUTIONS LLC Athens GA"
        description="Watch real project videos, before-and-after clips, job-site walkthroughs, and finished renovation highlights from Homewise Solutions in Athens, Georgia."
        keywords="renovation videos Athens GA, remodeling walkthrough Athens Georgia, contractor project videos Athens GA, before after renovation video"
      />

      <PageHero
        title="Project Videos"
        subtitle="Take a closer look at our work through real project videos, before-and-after clips, job-site walkthroughs, and finished renovation highlights."
      />

      {/* Filters */}
      <section className="py-8 bg-[#1a1a1a] border-b border-[#2a2a2a] sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 flex-wrap justify-center">
          {videoCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-body text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-200 ${
                filter === cat ? 'bg-gold text-[#111]' : 'bg-[#222] text-gray-400 hover:text-white'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </section>

      {/* Video Grid */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel
            eyebrow="Our Work in Motion"
            title="Project Videos & Renovation Walkthroughs"
            subtitle="See the quality and craftsmanship behind every Homewise Solutions project. From start to finish, our work speaks for itself."
            center
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group cursor-pointer rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] hover:border-gold/40 transition-colors duration-300"
                onClick={() => setActiveIndex(filtered.indexOf(video))}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={`${video.title} — ${categoryLabels[video.category]} video thumbnail`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play button */}
                  <button
                    aria-label={`Play video: ${video.title}`}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold/80 group-hover:bg-gold flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <svg className="w-6 h-6 text-[#111] ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>

                  {/* Category badge */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-gold font-body text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-sm">
                    {categoryLabels[video.category]}
                  </span>
                </div>

                {/* Card info */}
                <div className="p-4">
                  <h3 className="font-display text-xl text-white tracking-wider mb-2 group-hover:text-gold transition-colors duration-200">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 font-body text-sm leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 font-body text-lg">No videos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <CTABand
        title="Have a Project in Mind?"
        subtitle="Contact Homewise Solutions today for a free estimate. No obligation, no pressure."
      />

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          videos={filtered}
          currentIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex(i => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setActiveIndex(i => (i + 1) % filtered.length)}
        />
      )}
    </motion.div>
  )
}
