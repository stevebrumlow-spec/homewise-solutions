import { motion } from 'framer-motion'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import ServiceCard from '../components/ui/ServiceCard'
import FAQAccordion from '../components/ui/FAQAccordion'
import CTABand from '../components/ui/CTABand'
import { services } from '../data/services'

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Remodeling Services Athens GA | HOMEWISE SOLUTIONS LLC"
        description="Kitchen remodeling, bathroom renovation, flooring, painting, decks, drywall, epoxy floors, and more in Athens GA. Licensed and insured contractor. Free estimates."
        keywords="painter Athens GA, flooring Athens Georgia, kitchen remodeling Athens GA, bathroom remodeling Athens GA, deck builder Athens GA"
      />

      <PageHero
        title="Our Services"
        subtitle="14 services. One trusted contractor. Athens Georgia's go-to renovation team."
      />

      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="All Services" title="Everything We Do" center />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel eyebrow="FAQ" title="Common Questions" center />
          <div className="mt-12">
            <FAQAccordion />
          </div>
        </div>
      </section>

      <CTABand />
    </motion.div>
  )
}
