import { motion } from 'framer-motion'
import CTAButton from './CTAButton'

export default function CTABand({ title = "Ready to Start Your Project?", subtitle = "Contact us today for a free estimate. No obligation, no pressure." }) {
  return (
    <section className="bg-[#1a1a1a] border-y border-[#2a2a2a] py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        <h2 className="font-display text-4xl lg:text-5xl text-white tracking-wider mb-4">{title}</h2>
        <p className="text-gray-400 font-body text-lg mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton to="/estimate">Get a Free Estimate</CTAButton>
          <CTAButton href="tel:7064248498" variant="outline">Call 706-424-8498</CTAButton>
        </div>
      </motion.div>
    </section>
  )
}
