import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCamera, FiHeart, FiClipboard, FiCheck, FiPhone, FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi'
import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'

const AVATAR_PRESETS = [
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ada',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Chidi',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ngozi',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Tunde',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Femi',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Zainab',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Kemi',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ifeoma',
]

export default function ProfileModal() {
  const { activeModal, closeModal, openModal, user, updateProfile, savedVendorIds, bookings } = useApp()
  const open = activeModal === 'profile'
  const fileInputRef = useRef(null)
  const wasOpen = useRef(false)

  const [nameDraft, setNameDraft] = useState('')
  const [avatarDraft, setAvatarDraft] = useState('')
  const [phoneDraft, setPhoneDraft] = useState('')
  const [cityDraft, setCityDraft] = useState('')
  const [bioDraft, setBioDraft] = useState('')
  const [toast, setToast] = useState('')

  // Only load fields from `user` the moment the modal transitions from closed -> open,
  // never while it's already open (that was wiping the "Saved" toast right after saving).
  useEffect(() => {
    if (open && !wasOpen.current && user) {
      setNameDraft(user.name || '')
      setAvatarDraft(user.avatarUrl || '')
      setPhoneDraft(user.phone || '')
      setCityDraft(user.city || '')
      setBioDraft(user.bio || '')
    }
    wasOpen.current = open
  }, [open, user])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  const initials = nameDraft
    ? nameDraft
        .split(' ')
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      setAvatarDraft(reader.result)
      updateProfile({ avatarUrl: reader.result })
      showToast('Display picture updated')
    }
    reader.readAsDataURL(file)
  }

  function handlePresetPick(src) {
    setAvatarDraft(src)
    updateProfile({ avatarUrl: src })
    showToast('Avatar updated')
  }

  function handleSave() {
    updateProfile({
      name: nameDraft.trim() || user.name,
      avatarUrl: avatarDraft,
      phone: phoneDraft.trim(),
      city: cityDraft.trim(),
      bio: bioDraft.trim(),
    })
    showToast('Profile saved')
  }

  const memberSince = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : null

  return (
    <Modal open={open} onClose={closeModal} title="My profile" maxWidth="max-w-md">
      {!user ? (
        <p className="text-ink-muted py-8 text-center">Log in to see your profile.</p>
      ) : (
        <div className="relative">
          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -top-1 left-0 right-0 z-10 flex justify-center"
              >
                <span className="inline-flex items-center gap-1.5 bg-ink text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-md">
                  <FiCheck size={13} /> {toast}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar + upload */}
          <div className="flex flex-col items-center mb-5 pt-2">
            <div className="relative">
              {avatarDraft ? (
                <img
                  src={avatarDraft}
                  alt="Your avatar"
                  className="w-20 h-20 rounded-full object-cover border border-border"
                />
              ) : (
                <span className="w-20 h-20 rounded-full bg-purple text-white font-bold text-2xl flex items-center justify-center">
                  {initials}
                </span>
              )}
              <button
                type="button"
                aria-label="Upload a display picture"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center border-2 border-white hover:bg-purple-deep transition-colors"
              >
                <FiCamera size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {memberSince && (
              <p className="text-xs text-ink-subtle mt-2 flex items-center gap-1">
                <FiCalendar size={12} /> Member since {memberSince}
              </p>
            )}
          </div>

          {/* Avatar presets */}
          <div className="mb-5">
            <div className="text-xs font-semibold text-ink-muted mb-2">Choose an avatar</div>
            <div className="grid grid-cols-4 gap-2.5">
              {AVATAR_PRESETS.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => handlePresetPick(src)}
                  className={`rounded-full overflow-hidden border-2 transition-colors ${
                    avatarDraft === src ? 'border-purple' : 'border-border hover:border-purple/50'
                  }`}
                >
                  <img src={src} alt="" className="w-full aspect-square object-cover bg-surface" />
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="mb-5 flex flex-col gap-3.5">
            <div>
              <label htmlFor="profile-name" className="text-xs font-semibold text-ink-muted mb-1.5 block">
                Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                className="input"
                placeholder="Your name"
              />
              <div className="text-xs text-ink-subtle mt-1.5">{user.email}</div>
            </div>

            <div>
              <label htmlFor="profile-phone" className="text-xs font-semibold text-ink-muted mb-1.5 flex items-center gap-1.5">
                <FiPhone size={12} /> Phone number
              </label>
              <input
                id="profile-phone"
                type="tel"
                value={phoneDraft}
                onChange={(e) => setPhoneDraft(e.target.value)}
                className="input"
                placeholder="e.g. 0803 123 4567"
              />
            </div>

            <div>
              <label htmlFor="profile-city" className="text-xs font-semibold text-ink-muted mb-1.5 flex items-center gap-1.5">
                <FiMapPin size={12} /> City
              </label>
              <input
                id="profile-city"
                type="text"
                value={cityDraft}
                onChange={(e) => setCityDraft(e.target.value)}
                className="input"
                placeholder="e.g. Lagos"
              />
            </div>

            <div>
              <label htmlFor="profile-bio" className="text-xs font-semibold text-ink-muted mb-1.5 block">
                About
              </label>
              <textarea
                id="profile-bio"
                value={bioDraft}
                onChange={(e) => setBioDraft(e.target.value)}
                className="textarea"
                rows={3}
                placeholder="Tell vendors a bit about the events you're planning…"
              />
            </div>
          </div>

          {/* Stats + quick links */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => openModal('saved')}
              className="bg-surface rounded-md p-4 text-center hover:bg-purple-dim transition-colors group"
            >
              <FiHeart className="mx-auto mb-1.5 text-purple" size={18} />
              <div className="text-xl font-bold">{savedVendorIds.length}</div>
              <div className="text-xs text-ink-muted flex items-center justify-center gap-1">
                Saved vendors <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={11} />
              </div>
            </button>
            <button
              onClick={() => openModal('bookings')}
              className="bg-surface rounded-md p-4 text-center hover:bg-purple-dim transition-colors group"
            >
              <FiClipboard className="mx-auto mb-1.5 text-purple" size={18} />
              <div className="text-xl font-bold">{bookings.length}</div>
              <div className="text-xs text-ink-muted flex items-center justify-center gap-1">
                Vendors contacted <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={11} />
              </div>
            </button>
          </div>

          <button onClick={handleSave} className="btn-purple w-full justify-center">
            Save changes
          </button>
        </div>
      )}
    </Modal>
  )
}
