import { FiSearch, FiEye } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import Reveal from '../ui/Reveal'

const steps = [
  {
    icon: FiSearch,
    title: 'Search & Browse',
    desc: 'Find vendors by category, location, and budget. Every listing is reviewed before going live.',
  },
  {
    icon: FiEye,
    title: 'View Portfolios',
    desc: "See real work from vendors: photos, videos, and detailed profiles so you know what you're getting.",
  },
  {
    icon: FaWhatsapp,
    title: 'Contact on WhatsApp',
    desc: 'Hit the WhatsApp button to connect directly. No middlemen, no platform fees on bookings.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 border-t border-b border-border">
      <div className="container-evvee">
        <Reveal className="text-center max-w-lg mx-auto mb-12">
          <div className="section-eyebrow justify-center flex">Simple process</div>
          <h2 className="section-title">
            How Evvee <span className="section-title-accent">works</span>
          </h2>
          <p className="text-ink-muted mt-2">From search to confirmation in minutes.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="text-center px-4">
                <span className="w-14 h-14 mx-auto rounded-full bg-purple-dim text-purple flex items-center justify-center text-2xl mb-4">
                  <Icon />
                </span>
                <div className="font-bold mb-2">{title}</div>
                <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
