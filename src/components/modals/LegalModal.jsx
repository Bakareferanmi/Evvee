import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'

const content = {
  privacy: {
    title: 'Privacy Policy',
    body: `Evvee collects only what's needed to connect you with vendors: your search activity, saved vendors, and contact details if you list a business. We never sell your data. WhatsApp conversations happen directly between you and the vendor, off-platform.`,
  },
  terms: {
    title: 'Terms of Service',
    body: `Evvee is a discovery marketplace, not a booking agent. We vet listings before publishing but aren't a party to any agreement between you and a vendor. Contact and payment happen directly between you and the vendor you choose.`,
  },
}

export default function LegalModal() {
  const { activeModal, closeModal } = useApp()
  const doc = content[activeModal]
  const open = Boolean(doc)

  return (
    <Modal open={open} onClose={closeModal} title={doc?.title} maxWidth="max-w-md">
      <p className="text-sm text-ink-muted leading-relaxed">{doc?.body}</p>
      <span className="block text-xs text-ink-subtle font-mono mt-6">Last updated · January 2026</span>
    </Modal>
  )
}
