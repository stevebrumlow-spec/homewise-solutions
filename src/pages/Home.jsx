import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEOMeta from '../components/ui/SEOMeta'
import SectionLabel from '../components/ui/SectionLabel'
import ServiceCard from '../components/ui/ServiceCard'
import StatsBand from '../components/ui/StatsBand'
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider'
import TestimonialsCarousel from '../components/ui/TestimonialsCarousel'
import CTAButton from '../components/ui/CTAButton'
import { featuredServices } from '../data/services'
import { serviceAreas } from '../data/serviceAreas'
import { beforeAfterPairs } from '../data/gallery'

const HERO_PHOTO = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85'

export default function Home() {
  return (
    <>
      <SEOMeta
        title="Athens GA Renovation & Remodeling Experts | All Phase Renovations"
        description="All Phase Renovations — Athens Georgia's trusted contractor for kitchen remodels, bathroom renovations, flooring, painting, decks, and more. Call 706-424-8498 for a free estimate."
        keywords="remodeling Athens GA, contractor Athens Georgia, home renovation Athens GA, kitchen remodeling Athens GA, bathroom remodeling Athens GA"
      />

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_PHOTO})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative text-center px-4 max-w-5xl mx-auto"
        >
          <p className="text-gold font-body font-semibold text-xs tracking-[0.4em] uppercase mb-6">
            ATHENS, GEORGIA · LICENSED & INSURED
          </p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl text-white tracking-wider leading-none mb-6">
            Athens Georgia's Trusted Renovation & Remodeling Experts
          </h1>
          <p className="text-gray-300 font-body text-lg lg:text-xl max-w-2xl mx-auto mb-10">
            Premium craftsmanship. Honest pricing. Results that last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/estimate">Get a Free Estimate</CTAButton>
            <CTAButton href="tel:7064248498" variant="outline">Call 706-424-8498</CTAButton>
          </div>
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Stats */}
      <StatsBand />

      {/* Services Preview */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel
            eyebrow="What We Do"
            title="Our Services"
            subtitle="From a fresh coat of paint to a full kitchen transformation — we handle it all with the same level of care and craftsmanship."
            center
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="text-gold font-body font-bold text-sm tracking-widest uppercase border-b border-gold pb-1 hover:text-gold-hover hover:border-gold-hover transition-colors">
              View All 14 Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Why All Phase" title="Built on Trust & Craftsmanship" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏆', title: 'Premium Craftsmanship', desc: "Every project is executed with the precision and attention to detail you'd expect from a luxury builder." },
              { icon: '🛡️', title: 'Licensed & Insured', desc: 'Fully licensed in Georgia and carrying comprehensive liability insurance on every job.' },
              { icon: '💬', title: 'Free Estimates', desc: "No pressure, no obligation. We'll assess your project and give you a detailed written quote — free." },
              { icon: '📍', title: 'Athens Local', desc: "We live and work here. We know the homes, the neighborhoods, and what it means to be your neighbor." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-lg border border-[#2a2a2a] hover:border-gold/40 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl text-white tracking-wider mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Our Work" title="Our Work Speaks For Itself" center />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {beforeAfterPairs.map(item => (
              <BeforeAfterSlider key={item.id} beforeSrc={item.beforeSrc} afterSrc={item.afterSrc} />
            ))}
          </div>
          <p className="text-center mt-6 text-gray-500 text-sm">Drag the handle to reveal before & after</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Reviews" title="What Our Customers Say" center />
          <div className="mt-12">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="Coverage" title="Proudly Serving Northeast Georgia" center />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-3 gap-x-6">
            {serviceAreas.map(area => (
              <div key={area} className="flex items-center gap-2">
                <span className="text-gold text-xs">▸</span>
                <span className="text-gray-300 text-sm font-body">{area}, GA</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-gold py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-body text-xs font-bold tracking-[0.3em] uppercase text-[#111] mb-1">Emergency Repairs</p>
            <p className="font-display text-3xl text-[#111] tracking-wider">Need Emergency Home Repairs?</p>
          </div>
          <a
            href="tel:7064248498"
            className="flex-shrink-0 bg-[#111] text-gold font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-[#222] transition-colors"
          >
            Call Now: 706-424-8498
          </a>
        </div>
      </section>
    </>
  )
}
