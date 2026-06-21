import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categoryLabels } from '../../data/videos'

export default function VideoModal({ video, videos, currentIndex, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  if (!video) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close video"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Prev arrow */}
        {videos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-2 sm:left-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous video"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next arrow */}
        {videos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-2 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next video"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div
          className="w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video player */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
            {video.type === 'local' ? (
              <video
                key={video.id}
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted
                playsInline
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                key={video.id}
                className="w-full h-full"
                src={`${video.videoUrl}${video.videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>

          {/* Info below player */}
          <div className="mt-4 px-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gold font-body text-xs font-bold tracking-[0.2em] uppercase">
                {categoryLabels[video.category] || video.category}
              </span>
              {videos.length > 1 && (
                <span className="text-gray-500 font-body text-xs">
                  {currentIndex + 1} / {videos.length}
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl lg:text-3xl text-white tracking-wider mb-2">
              {video.title}
            </h3>
            <p className="text-gray-400 font-body text-sm leading-relaxed">
              {video.description}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
