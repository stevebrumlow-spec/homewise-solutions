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
  if (!item) return null

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
