import { FiClipboard } from 'react-icons/fi'
import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'

export default function BookingsModal() {
  const { activeModal, closeModal, bookings } = useApp()
  const open = activeModal === 'bookings'

  return (
    <Modal open={open} onClose={closeModal} title="My bookings" maxWidth="max-w-md">
      {bookings.length === 0 ? (
        <p className="text-ink-muted py-8 text-center">
          No bookings yet. Vendors you contact on WhatsApp while logged in will show up here.
        </p>
      ) : (
        <ul className="flex flex-col gap-2 pt-1">
          {bookings
            .slice()
            .reverse()
            .map((b) => (
              <li key={b.id} className="flex items-center gap-3 bg-surface rounded-md p-3">
                <span className="w-9 h-9 rounded-full bg-purple-dim text-purple flex items-center justify-center">
                  <FiClipboard size={15} />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{b.vendorName}</div>
                  <div className="text-xs text-ink-muted">
                    {b.category} · {new Date(b.contactedAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </Modal>
  )
}
