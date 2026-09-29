import ProjectImage from './ProjectImage'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt = 'Before', afterAlt = 'After' }) {
  const [pos, setPos] = useState(50)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-lg overflow-hidden select-none focus-within:ring-2 focus-within:ring-gold"
      style={{ aspectRatio: '16/9' }}
    >
      {/* After (full width background) */}
      <ProjectImage src={afterSrc} loading="lazy" decoding="async" alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold tracking-widest uppercase px-2 py-1 rounded">After</div>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ProjectImage src={beforeSrc} loading="lazy" decoding="async" alt={beforeAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold tracking-widest uppercase px-2 py-1 rounded">Before</div>
      </div>

      <input type="range" min="0" max="100" value={pos} onChange={e => setPos(Number(e.target.value))}
        aria-label="Before and after comparison" aria-valuetext={`${pos}% before image`}
        className="absolute inset-0 m-0 w-full h-full opacity-0 z-20 cursor-col-resize" />
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gold cursor-col-resize"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-[#111]" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 5l-5 5 5 5M12 5l5 5-5 5"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
