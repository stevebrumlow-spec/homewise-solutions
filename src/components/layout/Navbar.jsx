import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/videos', label: 'Videos' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrollY = useScrollPosition()
  const scrolled = scrollY > 80

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#111111]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none">
              <span className="font-display text-2xl text-gold tracking-widest">HOMEWISE</span>
              <span className="font-body text-[10px] text-gray-400 tracking-[0.25em] uppercase">Solutions LLC</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `font-body text-sm tracking-wider uppercase transition-colors duration-200 relative group ${
                      isActive ? 'text-gold' : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="tel:4049226424"
                className="bg-gold hover:bg-gold-hover text-[#111111] font-body font-bold text-sm tracking-widest uppercase px-6 py-3 rounded-sm transition-colors duration-200"
              >
                Call Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#111111] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-4xl tracking-widest ${isActive ? 'text-gold' : 'text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="tel:4049226424"
              className="mt-4 bg-gold text-[#111111] font-body font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm"
            >
              Call 404-922-6424
            </a>
            <Link
              to="/estimate"
              onClick={() => setOpen(false)}
              className="border border-gold text-gold font-body font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm"
            >
              Free Estimate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
