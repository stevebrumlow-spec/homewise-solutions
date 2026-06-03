import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useEffect, useState } from 'react'

function Counter({ target, suffix = '', duration = 2000 }) {
  const [ref, isVisible] = useIntersectionObserver()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const start = Date.now()
    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return (
    <span ref={ref} className="font-display text-4xl lg:text-5xl text-gold tracking-wider">
      {count}{suffix}
    </span>
  )
}

const stats = [
  { label: 'Projects Completed', target: 500, suffix: '+' },
  { label: 'Years of Experience', target: 15, suffix: '+' },
  { label: 'Licensed & Insured', target: 100, suffix: '%' },
  { label: 'Customer Rating', target: 4, suffix: '.9★' },
]

export default function StatsBand() {
  return (
    <section className="bg-[#1a1a1a] py-12 border-y border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ label, target, suffix }) => (
            <div key={label}>
              <Counter target={target} suffix={suffix} />
              <p className="mt-2 font-body text-sm text-gray-400 tracking-wider uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
