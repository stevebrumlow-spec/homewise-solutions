import ProjectImage from './ProjectImage'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.03 }}
      className="relative rounded-lg overflow-hidden group "
      style={{ aspectRatio: '4/3' }}
    >
      <ProjectImage
        src={service.photo}
        alt={`${service.name} Athens GA`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-2xl text-white tracking-wider leading-tight mb-1">
          {service.name}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-3 transition-opacity duration-300">
          {service.shortDesc}
        </p>
        <Link
          to={`/estimate?service=${encodeURIComponent(service.id)}`}
          className="inline-flex items-center gap-2 text-gold text-xs font-body font-bold tracking-widest uppercase border-b border-gold pb-0.5 transition-opacity duration-300"
        >
          Get a Quote <span>→</span>
        </Link>
      </div>
    </motion.div>
  )
}
