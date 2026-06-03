import { motion } from 'framer-motion'

export default function SectionLabel({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center' : ''}
    >
      {eyebrow && (
        <p className="text-gold font-body font-semibold text-xs tracking-[0.3em] uppercase mb-3">{eyebrow}</p>
      )}
      <h2 className={`font-display text-4xl lg:text-5xl tracking-wider mb-4 ${light ? 'text-[#111]' : 'text-white'}`}>
        {title}
      </h2>
      <div className={`gold-divider mb-6 ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`font-body text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-gray-600' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
