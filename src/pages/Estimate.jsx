import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SEOMeta from '../components/ui/SEOMeta'
import PageHero from '../components/ui/PageHero'
import SectionLabel from '../components/ui/SectionLabel'
import { services } from '../data/services'

const inputCls = 'w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors placeholder-gray-600'
const errorCls = 'text-red-400 text-xs mt-1 font-body'
const labelCls = 'block text-gray-400 font-body text-xs uppercase tracking-widest mb-2'

export default function Estimate() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      service: services.some(service => service.id === new URLSearchParams(window.location.search).get('service'))
        ? new URLSearchParams(window.location.search).get('service') : '',
    },
  })

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
        title="Free Estimate Request | HOMEWISE SOLUTIONS LLC Athens GA"
        description="Request a free renovation estimate from HOMEWISE SOLUTIONS LLC in Athens, GA. No obligation. We respond within 24 hours. Serving Athens and Northeast Georgia."
        keywords="free estimate Athens GA, remodeling quote Athens Georgia, renovation estimate Athens GA contractor"
      />

      <PageHero title="Free Estimate" subtitle="Tell us about your project and we'll get back to you within 24 hours." />

      {/* Trust strip */}
      <section className="py-6 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: '💬', text: 'Free Estimate' },
            { icon: '⚡', text: 'Respond in 24 Hours' },
            { icon: '✋', text: 'No Obligation' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-2">
              <span>{icon}</span>
              <span className="text-gray-300 font-body text-sm font-semibold">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLabel eyebrow="Request a Quote" title="Tell Us About Your Project" center />

          {submitted ? (
            <motion.div role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-10 bg-[#1a1a1a] border border-gold/30 rounded-lg text-center">
              <div className="text-gold text-5xl mb-4">✓</div>
              <h2 className="font-display text-3xl text-white tracking-wider mb-4">Estimate Request Received!</h2>
              <p className="text-gray-400 font-body leading-relaxed mb-6">
                Thank you for reaching out. We'll review your project details and get back to you within 24 hours with your free estimate.
              </p>
              <a href="tel:4049226424" className="text-gold font-body font-bold text-lg hover:text-gold-hover transition-colors">
                Or call us now: 404-922-6424
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="estimate-name" className={labelCls}>Full Name *</label>
                  <input id="estimate-name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'estimate-name-error' : undefined} autoComplete="name" {...register('name', { required: 'Name is required' })} placeholder="John Smith" className={inputCls} />
                  {errors.name && <p id="estimate-name-error" role="alert" className={errorCls}>{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="estimate-phone" className={labelCls}>Phone Number *</label>
                  <input id="estimate-phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'estimate-phone-error' : undefined} autoComplete="tel" {...register('phone', { required: 'Phone is required' })} type="tel" placeholder="(706) 555-0000" className={inputCls} />
                  {errors.phone && <p id="estimate-phone-error" role="alert" className={errorCls}>{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="estimate-email" className={labelCls}>Email Address *</label>
                <input id="estimate-email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'estimate-email-error' : undefined} autoComplete="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} type="email" placeholder="you@email.com" className={inputCls} />
                {errors.email && <p id="estimate-email-error" role="alert" className={errorCls}>{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="estimate-service" className={labelCls}>Service Type *</label>
                <select id="estimate-service" aria-invalid={!!errors.service} aria-describedby={errors.service ? 'estimate-service-error' : undefined} {...register('service', { required: 'Please select a service' })} className={inputCls}>
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {errors.service && <p id="estimate-service-error" role="alert" className={errorCls}>{errors.service.message}</p>}
              </div>

              <div>
                <label htmlFor="estimate-description" className={labelCls}>Project Description *</label>
                <textarea id="estimate-description" aria-invalid={!!errors.description} aria-describedby={errors.description ? 'estimate-description-error' : undefined} {...register('description', { required: 'Please describe your project' })} rows={5} placeholder="Describe your project in as much detail as possible — the more you share, the more accurate your estimate will be." className={inputCls + ' resize-none'} />
                {errors.description && <p id="estimate-description-error" role="alert" className={errorCls}>{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="estimate-budget" className={labelCls}>Estimated Budget</label>
                  <select id="estimate-budget" aria-invalid={!!errors.budget} aria-describedby={errors.budget ? 'estimate-budget-error' : undefined} {...register('budget')} className={inputCls}>
                    <option value="">Select a range...</option>
                    <option value="under1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 – $5,000</option>
                    <option value="5k-15k">$5,000 – $15,000</option>
                    <option value="15k-50k">$15,000 – $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="estimate-timeline" className={labelCls}>Desired Timeline</label>
                  <select id="estimate-timeline" aria-invalid={!!errors.timeline} aria-describedby={errors.timeline ? 'estimate-timeline-error' : undefined} {...register('timeline')} className={inputCls}>
                    <option value="">Select timeline...</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1month">Within 1 month</option>
                    <option value="1-3months">1–3 months</option>
                    <option value="3-6months">3–6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {submitError && (
                <p role="alert" className="text-red-400 text-sm font-body text-center bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-hover text-[#111] font-body font-bold text-sm tracking-widest uppercase py-5 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit Estimate Request'}
              </button>

              <p className="text-center text-gray-600 text-xs font-body">
                Or call us directly: <a href="tel:4049226424" className="text-gold hover:text-gold-hover">404-922-6424</a>
              </p>
            </form>
          )}
        </div>
      </section>
    </motion.div>
  )
}
