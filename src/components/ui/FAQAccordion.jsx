import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Do you provide free estimates?',
    a: 'Yes — all estimates are completely free and come with no obligation. We\'ll assess your project, discuss your goals, and provide a detailed written quote.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Absolutely. HOMEWISE SOLUTIONS LLC is fully licensed and insured in the state of Georgia. We carry general liability insurance and workers\' compensation on all jobs.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve Athens and the surrounding Northeast Georgia area including Watkinsville, Bogart, Commerce, Jefferson, Monroe, Madison, Winder, Gainesville, and all of Clarke County.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope. A single-room paint job takes 1–2 days. A bathroom remodel typically takes 1–2 weeks. A kitchen remodel runs 2–4 weeks. We\'ll give you a firm timeline before we start.',
  },
  {
    q: 'Do you handle permits?',
    a: 'Yes. For projects that require building permits in Athens-Clarke County or surrounding municipalities, we handle the permitting process as part of the project.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, check, and all major credit cards. Larger projects are typically structured with a deposit, progress payment, and final payment on completion.',
  },
  {
    q: 'Can I see examples of your previous work?',
    a: 'Yes — visit our Gallery page for photos of recent projects, or call us and we can connect you with past clients for references.',
  },
  {
    q: 'Do you offer any warranty on your work?',
    a: 'We stand behind our workmanship. HOMEWISE SOLUTIONS LLC provides a one-year warranty on labor for all completed projects. Material warranties vary by manufacturer.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-2 max-w-3xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-[#2a2a2a] rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left bg-[#1a1a1a] hover:bg-[#222] transition-colors"
          >
            <span className="font-body font-semibold text-white pr-4">{faq.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gold text-2xl flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-6 py-5 text-gray-400 font-body text-sm leading-relaxed bg-[#151515]">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
