import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { serviceAreas } from '../../data/serviceAreas'

export default function Footer() {
  const year = new Date().getFullYear()
  const footerServices = services.slice(0, 7)

  return (
    <footer className="bg-[#0a0a0a] border-t-2 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <div className="font-display text-3xl text-gold tracking-widest mb-1">HOMEWISE</div>
            <div className="font-body text-[10px] text-gray-500 tracking-[0.3em] uppercase mb-4">Solutions LLC</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Athens Georgia's trusted residential contractor. Premium craftsmanship, honest pricing, and results that last.
            </p>
            <a href="tel:4049226424" className="text-gold font-body font-bold text-lg hover:text-gold-hover transition-colors">
              404-922-6424
            </a>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-display text-xl text-white tracking-widest mb-6">SERVICES</h4>
            <ul className="space-y-2">
              {footerServices.map(s => (
                <li key={s.id}>
                  <Link to="/services" className="text-gray-400 text-sm hover:text-gold transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-gold text-sm hover:text-gold-hover transition-colors">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <h4 className="font-display text-xl text-white tracking-widest mb-6">SERVICE AREAS</h4>
            <ul className="space-y-2">
              {serviceAreas.slice(0, 8).map(area => (
                <li key={area} className="text-gray-400 text-sm">{area}, GA</li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-display text-xl text-white tracking-widest mb-6">CONTACT</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Phone</div>
                <a href="tel:4049226424" className="text-white hover:text-gold transition-colors">404-922-6424</a>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Location</div>
                <div>Athens, Georgia</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Hours</div>
                <div>Mon–Fri: 7am–6pm</div>
                <div>Sat: 8am–4pm</div>
              </div>
              <div className="pt-4">
                <Link
                  to="/estimate"
                  className="inline-block bg-gold hover:bg-gold-hover text-[#111111] font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-colors"
                >
                  Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#222] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© {year} HOMEWISE SOLUTIONS LLC · Athens, GA · Licensed & Insured</span>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
            <Link to="/estimate" className="hover:text-gray-400 transition-colors">Free Estimate</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
