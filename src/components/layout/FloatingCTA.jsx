import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FloatingCTA() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const sentinel = document.querySelector('footer')
    if (!sentinel) return
    const observer = new IntersectionObserver(([e]) => setHidden(e.isIntersecting))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  if (hidden) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex h-14 shadow-2xl">
      <a
        href="tel:4049226424"
        className="flex-1 flex items-center justify-center gap-2 bg-gold text-[#111111] font-bold text-sm tracking-wide"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Call Now
      </a>
      <Link
        to="/estimate"
        className="flex-1 flex items-center justify-center bg-[#1a1a1a] text-white font-bold text-sm tracking-wide border-l border-[#333]"
      >
        Free Estimate
      </Link>
    </div>
  )
}
