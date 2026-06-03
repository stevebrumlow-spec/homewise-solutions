import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTAButton({ to, href, children, variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center justify-center font-body font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200'
  const variants = {
    primary: 'bg-gold hover:bg-gold-hover text-[#111111]',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-[#111111]',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) return <a href={href} className={cls}>{children}</a>
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link to={to} className={cls}>{children}</Link>
    </motion.div>
  )
}
