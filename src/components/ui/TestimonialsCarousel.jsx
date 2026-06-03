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

function TestimonialCard({ t }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 h-full">
      <Stars count={t.rating} />
      <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-white font-body font-semibold">{t.name}</p>
          <p className="text-gray-500 text-xs">{t.city}</p>
        </div>
        <span className="text-gold text-xs font-body tracking-widest uppercase">{t.service}</span>
      </div>
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
      {/* Desktop: show 3 — no animation on advance to avoid flash */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {visible.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </div>

      {/* Mobile: show 1 with slide animation */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <TestimonialCard t={testimonials[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === current % testimonials.length ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${i === current % testimonials.length ? 'bg-gold w-6' : 'bg-[#333] w-2'}`}
          />
        ))}
      </div>
    </div>
  )
}
