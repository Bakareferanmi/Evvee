import { FiArrowRight } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import VendorCard from './VendorCard'
import { vendors } from '../../data/vendors'

export default function VendorGrid() {
  const featured = vendors.filter((v) => v.is_featured)

  return (
    <section id="featured" className="py-20 bg-surface">
      <div className="container-evvee">
        <Reveal className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="section-eyebrow">Featured vendors</div>
            <h2 className="section-title">Top picks this week</h2>
          </div>
          <button
            className="btn-ghost btn-sm"
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View all <FiArrowRight />
          </button>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(featured.length ? featured : vendors).map((vendor, i) => (
            <VendorCard key={vendor.id} vendor={vendor} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
