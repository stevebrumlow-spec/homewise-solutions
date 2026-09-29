import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import { services } from '../data/services'
import { serviceAreas } from '../data/serviceAreas'

const inputCls = 'w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600'
const errorCls = 'text-red-400 text-xs mt-1 font-body'

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('https://formspree.io/f/mrewzjvo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      reset()
      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please call us at 404-922-6424 or try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <SEOMeta
        title="Contact HOMEWISE SOLUTIONS LLC | Athens GA · 404-922-6424"
        description="Contact HOMEWISE SOLUTIONS LLC in Athens, GA. Call 404-922-6424 or send us a message. Free estimates, fast response. Serving Athens and Northeast Georgia."
        keywords="contact HOMEWISE SOLUTIONS LLC, Athens GA contractor phone number, remodeling company Athens Georgia contact"
      />

      <PageHero title="Contact Us" subtitle="We respond within 24 hours. Free estimates, no obligation." />

      <section className="section-pad bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <div>
            <SectionLabel eyebrow="Get In Touch" title="Send Us a Message" />
            {submitted ? (
              <motion.div role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-8 bg-[#1a1a1a] border border-gold/30 rounded-lg text-center">
                <div className="text-gold text-4xl mb-4">✓</div>
                <h3 className="font-display text-2xl text-white tracking-wider mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-gray-300 text-sm mb-2">Full Name *</label>
                  <input id="contact-name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} autoComplete="name" {...register('name', { required: 'Name is required' })} placeholder="Full Name *" className={inputCls} />
                  {errors.name && <p id="contact-name-error" role="alert" className={errorCls}>{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-gray-300 text-sm mb-2">Phone Number *</label>
                  <input id="contact-phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'contact-phone-error' : undefined} autoComplete="tel" {...register('phone', { required: 'Phone number is required' })} type="tel" placeholder="Phone Number *" className={inputCls} />
                  {errors.phone && <p id="contact-phone-error" role="alert" className={errorCls}>{errors.phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-gray-300 text-sm mb-2">Email Address *</label>
                  <input id="contact-email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} autoComplete="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} type="email" placeholder="Email Address *" className={inputCls} />
                  {errors.email && <p id="contact-email-error" role="alert" className={errorCls}>{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-gray-300 text-sm mb-2">Service Needed (optional)</label>
                  <select id="contact-service" aria-invalid={!!errors.service} aria-describedby={errors.service ? 'contact-service-error' : undefined} {...register('service')} className={inputCls}>
                    <option value="">Service Needed (optional)</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-gray-300 text-sm mb-2">Tell us about your project *</label>
                  <textarea id="contact-message" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined} {...register('message', { required: 'Message is required' })} rows={5} placeholder="Tell us about your project *" className={inputCls + ' resize-none'} />
                  {errors.message && <p id="contact-message-error" role="alert" className={errorCls}>{errors.message.message}</p>}
                </div>
                {submitError && (
                  <p role="alert" className="text-red-400 text-sm font-body text-center bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-hover text-[#111] font-body font-bold text-sm tracking-widest uppercase py-4 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <SectionLabel eyebrow="Reach Us Directly" title="Contact Info" />
            <div className="mt-8 space-y-8">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-2">Phone</p>
                <a href="tel:4049226424" className="font-display text-3xl text-gold tracking-wider hover:text-gold-hover transition-colors">
                  404-922-6424
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-2">Business Hours</p>
                <div className="text-gray-300 text-sm font-body space-y-1">
                  <div className="flex justify-between max-w-xs"><span>Monday – Friday</span><span>7:00am – 6:00pm</span></div>
                  <div className="flex justify-between max-w-xs"><span>Saturday</span><span>8:00am – 4:00pm</span></div>
                  <div className="flex justify-between max-w-xs"><span>Sunday</span><span className="text-gray-500">Closed</span></div>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-2">Location</p>
                <p className="text-gray-300 text-sm font-body">Athens, Georgia</p>
                <p className="text-gray-500 text-xs font-body mt-1">Serving all of Clarke County and surrounding areas</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-body mb-3">Service Areas</p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map(area => (
                    <span key={area} className="text-xs bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 px-3 py-1 rounded-sm font-body">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast response band */}
      <section className="py-10 bg-[#1a1a1a] border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {['We respond within 24 hours', 'Free estimates — always', 'No obligation, no pressure'].map(text => (
            <div key={text} className="flex items-center justify-center gap-2">
              <span className="text-gold">✓</span>
              <span className="text-gray-300 font-body text-sm">{text}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
