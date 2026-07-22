import { FiInstagram, FiFacebook } from 'react-icons/fi'
import { FaWhatsapp, FaXTwitter, FaTiktok } from 'react-icons/fa6'
import { useApp } from '../../context/AppContext'

const links = [
  { label: 'Browse', href: '#categories' },
  { label: 'Vendors', href: '#featured' },
  { label: 'How it works', href: '#how' },
  { label: 'Journal', href: '#blog' },
  { label: 'Privacy', modal: 'privacy' },
  { label: 'Terms', modal: 'terms' },
]

const socials = [
  { icon: FaWhatsapp, label: 'Evvee on WhatsApp' },
  { icon: FaXTwitter, label: 'Evvee on X' },
  { icon: FiInstagram, label: 'Evvee on Instagram' },
  { icon: FiFacebook, label: 'Evvee on Facebook' },
  { icon: FaTiktok, label: 'Evvee on TikTok' },
]

export default function Footer() {
  const { openModal } = useApp()

  return (
    <footer className="border-t border-border py-10">
      <div className="container-evvee">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">
          <img src="/logo.png" alt="Evvee" className="h-20 w-auto object-contain" />

          <ul className="flex flex-wrap gap-5 list-none">
            {links.map((link) => (
              <li key={link.label}>
                {link.modal ? (
                  <button
                    onClick={() => openModal(link.modal)}
                    className="text-[0.82rem] text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a href={link.href} className="text-[0.82rem] text-ink-muted hover:text-ink transition-colors">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-muted hover:text-ink hover:border-ink transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-8 pt-6 border-t border-border text-center sm:text-left">
          <div className="text-[0.78rem] text-ink-subtle font-mono">© 2026 Evvee · Nigeria</div>
          <div className="text-[0.78rem] text-ink-subtle font-mono">
            Built with ♥️ <strong>BeepeeLabs</strong>
          </div>
        </div>
      </div>
    </footer>
  )
}
