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

const team = [
  { name: 'Owner', role: 'Founder & Lead Contractor', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Project Manager', role: 'Operations & Scheduling', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Lead Carpenter', role: 'Finish Work & Millwork', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
]

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="About All Phase Renovations | Athens GA Contractor"
        description="Learn about All Phase Renovations — Athens Georgia's locally owned and operated residential contractor. Licensed, insured, and committed to quality craftsmanship."
        keywords="about All Phase Renovations, Athens GA contractor, local remodeling company Athens Georgia"
      />

      <PageHero title="About Us" subtitle="Athens-born. Craft-driven. Community-focused." />

      {/* Story */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel eyebrow="Our Story" title="Athens Born, Craft Driven" />
            <div className="space-y-4 text-gray-400 font-body leading-relaxed">
              <p>All Phase Renovations was built on a simple belief: homeowners in Athens, Georgia deserve the same quality of work you'd expect from the most expensive contractors in Atlanta — without the big-city price tag or the runaround.</p>
              <p>We started with one truck, one crew, and a commitment to showing up on time, doing the work right, and treating every home as if it were our own. That reputation spread through Clarke County one satisfied homeowner at a time.</p>
              <p>Today we handle everything from a single bathroom remodel to whole-home renovations — always with the same hands-on attention that built our name. We're licensed, insured, and proud to be your neighbors.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img
              src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80"
              alt="All Phase Renovations team at work in Athens GA"
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

      {/* Team */}
      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="The Team" title="The People Behind the Work" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.photo}
                  alt={`${member.name} — All Phase Renovations Athens GA`}
                  loading="lazy"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-gold"
                />
                <h3 className="font-display text-lg text-white tracking-wider">{member.name}</h3>
                <p className="text-gray-500 text-xs font-body mt-1">{member.role}</p>
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
