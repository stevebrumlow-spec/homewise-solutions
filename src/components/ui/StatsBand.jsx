const stats = [
  { label: 'Years of Experience', value: '25+' },
  { label: 'Estimates', value: 'Free' },
  { label: 'Based in', value: 'Athens, GA' },
  { label: 'Projects', value: 'Big & Small' },
]

export default function StatsBand() {
  return (
    <section className="bg-[#1a1a1a] py-12 border-y border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <span className="font-display text-3xl lg:text-4xl text-gold tracking-wider">{value}</span>
            <p className="mt-2 font-body text-sm text-gray-400 tracking-wider uppercase">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
