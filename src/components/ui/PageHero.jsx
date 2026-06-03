import { motion } from 'framer-motion'

export default function PageHero({ title, subtitle, photo }) {
  const bg = photo || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80'
  return (
    <section
      className="relative flex items-center justify-center h-[50vh] min-h-[320px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center px-4"
      >
        <p className="text-gold font-body font-semibold text-xs tracking-[0.4em] uppercase mb-4">
          ALL PHASE RENOVATIONS
        </p>
        <h1 className="font-display text-5xl lg:text-7xl text-white tracking-wider">{title}</h1>
        {subtitle && <p className="mt-4 text-gray-300 font-body text-lg max-w-xl mx-auto">{subtitle}</p>}
      </motion.div>
    </section>
  )
}
