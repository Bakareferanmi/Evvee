import { FiUser, FiMail, FiHeart, FiClipboard } from 'react-icons/fi'
import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'

export default function ProfileModal() {
  const { activeModal, closeModal, user, savedVendorIds, bookings } = useApp()
  const open = activeModal === 'profile'

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <Modal open={open} onClose={closeModal} title="My profile" maxWidth="max-w-md">
      {!user ? (
        <p className="text-ink-muted py-8 text-center">Log in to see your profile.</p>
      ) : (
        <div>
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
            <span className="w-14 h-14 rounded-full bg-purple text-white font-bold text-lg flex items-center justify-center">
              {initials}
            </span>
            <div className="min-w-0">
              <div className="font-bold text-lg truncate">{user.name}</div>
              <div className="text-sm text-ink-muted flex items-center gap-1.5 truncate">
                <FiMail size={13} /> {user.email}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface rounded-md p-4 text-center">
              <FiHeart className="mx-auto mb-1.5 text-purple" size={18} />
              <div className="text-xl font-bold">{savedVendorIds.length}</div>
              <div className="text-xs text-ink-muted">Saved vendors</div>
            </div>
            <div className="bg-surface rounded-md p-4 text-center">
              <FiClipboard className="mx-auto mb-1.5 text-purple" size={18} />
              <div className="text-xl font-bold">{bookings.length}</div>
              <div className="text-xs text-ink-muted">Vendors contacted</div>
            </div>
          </div>

          <div className="mt-4 bg-purple-dim rounded-md p-4 flex items-start gap-2.5">
            <FiUser className="text-purple mt-0.5 shrink-0" size={15} />
            <p className="text-sm text-ink-muted">
              Profile editing is coming soon — for now you can manage saved vendors and bookings from the menu.
            </p>
          </div>
        </div>
      )}
    </Modal>
  )
}
