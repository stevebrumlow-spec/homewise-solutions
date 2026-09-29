import { motion } from 'framer-motion'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import StatsBand from '../components/ui/StatsBand'
import CTABand from '../components/ui/CTABand'

const values = [
  { icon: '🏆', title: 'Quality', desc: "We don't cut corners. Every surface, every joint, every finish is executed to last." },
  { icon: '🤝', title: 'Integrity', desc: 'We give you honest assessments, fair prices, and straight answers — always.' },
  { icon: '📍', title: 'Community', desc: "We're Athens locals. These are our neighborhoods. We care about the community we build in." },
  { icon: '🔨', title: 'Craftsmanship', desc: 'We take pride in our trade. The work we do reflects who we are as professionals.' },
]

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="About HOMEWISE SOLUTIONS LLC | Athens GA Contractor"
        description="Learn about HOMEWISE SOLUTIONS LLC — Athens Georgia's locally owned and operated residential contractor. Licensed, insured, and committed to quality craftsmanship."
        keywords="about HOMEWISE SOLUTIONS LLC, Athens GA contractor, local remodeling company Athens Georgia"
      />

      <PageHero title="About Us" subtitle="Home repairs and remodeling in Athens, Georgia." />

      {/* Story */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel eyebrow="Our Story" title="Local Help for Your Home" />
            <div className="space-y-4 text-gray-400 font-body leading-relaxed">
              <p>HOMEWISE SOLUTIONS LLC was built on a simple belief: homeowners in Athens, Georgia deserve the same quality of work you'd expect from the most expensive contractors in Atlanta — without the big-city price tag or the runaround.</p>
              <p>From painting and flooring to bathroom remodels and home repairs, we help homeowners in Athens and the surrounding communities care for their homes.</p>
              <p>Today we handle everything from a single bathroom remodel to whole-home renovations — always with the same hands-on attention that built our name. We're licensed, insured, and proud to be your neighbors.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img
              src="/images/millwork-shiplap-1280.webp"
              alt="Shiplap and finish carpentry project"
              loading="lazy"
              className="rounded-lg w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <StatsBand />

      {/* Values */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="What We Stand For" title="Our Values" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-lg border border-[#2a2a2a] text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display text-xl text-white tracking-wider mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-bg-primary border-y border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {['Licensed in Georgia', 'Fully Insured', 'Locally Owned', 'Satisfaction Guaranteed'].map(badge => (
              <div key={badge} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center text-gold text-xl">✓</div>
                <span className="text-white font-body font-semibold text-sm tracking-wide">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Let's Work Together" subtitle="Ready to transform your Athens home? We'd love to hear about your project." />
    </motion.div>
  )
}
