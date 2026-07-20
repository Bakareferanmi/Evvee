import { FiStar, FiMapPin, FiHeart, FiCheckCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Reveal from '../ui/Reveal'
import { formatNaira } from '../../data/vendors'
import { useApp } from '../../context/AppContext'

export default function VendorCard({ vendor, delay = 0 }) {
  const { savedVendorIds, toggleSaveVendor, user, addBooking } = useApp()
  const saved = savedVendorIds.includes(vendor.id)

  const waMsg = encodeURIComponent(`Hi, I found you on Evvee and I'm interested in your ${vendor.category} services.`)
  const waLink = `https://wa.me/${vendor.whatsapp_number}?text=${waMsg}`

  function handleChatClick() {
    if (user) {
      addBooking({
        vendorId: vendor.id,
        vendorName: vendor.business_name,
        category: vendor.category,
        contactedAt: new Date().toISOString(),
      })
    }
  }

  return (
    <Reveal scale delay={delay}>
      <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-44">
          <img src={vendor.cover_photo_url} alt={vendor.business_name} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {vendor.is_featured && <Badge tint="lime" icon={<FiStar size={11} />} label="Featured" />}
            {vendor.is_verified && <Badge tint="purple" icon={<FiCheckCircle size={11} />} label="Verified" />}
          </div>
          <button
            aria-label={`Save ${vendor.business_name}`}
            aria-pressed={saved}
            onClick={() => toggleSaveVendor(vendor.id)}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              saved ? 'bg-purple text-white' : 'bg-white/85 text-ink hover:bg-white'
            }`}
          >
            <FiHeart className={saved ? 'fill-current' : ''} size={15} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-ink-muted mb-1.5">
            <span className="font-medium text-purple">{vendor.category}</span>
            <span className="flex items-center gap-1">
              <FiMapPin size={11} /> {vendor.city}
            </span>
          </div>
          <div className="font-bold mb-1">{vendor.business_name}</div>
          <div className="flex items-center gap-1 text-xs mb-1.5">
            {vendor.rating_avg ? (
              <>
                <FiStar className="fill-lime-deep text-lime-deep" size={13} />
                <span className="font-semibold">{vendor.rating_avg.toFixed(1)}</span>
                <span className="text-ink-subtle">({vendor.rating_count} reviews)</span>
              </>
            ) : (
              <span className="text-ink-subtle">No reviews yet</span>
            )}
          </div>
          <p className="text-sm text-ink-muted mb-3.5 line-clamp-2">{vendor.tagline}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              {vendor.starting_price ? (
                <>
                  From <span className="text-purple">{formatNaira(vendor.starting_price)}</span>
                </>
              ) : (
                'Contact for price'
              )}
            </span>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with ${vendor.business_name} on WhatsApp`}
              onClick={handleChatClick}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-purple text-white px-3.5 py-2 rounded-full hover:bg-purple-deep transition-all"
            >
              <FaWhatsapp size={14} /> Chat
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Badge({ tint, icon, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[0.68rem] font-semibold px-2 py-1 rounded-full ${
        tint === 'lime' ? 'bg-lime text-white' : 'bg-purple text-white'
      }`}
    >
      {icon} {label}
    </span>
  )
}
