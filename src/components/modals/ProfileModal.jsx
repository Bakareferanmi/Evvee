import { useEffect, useRef, useState } from 'react'
import { FiCamera, FiHeart, FiClipboard, FiCheck } from 'react-icons/fi'
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
  const { activeModal, closeModal, user, updateProfile, savedVendorIds, bookings } = useApp()
  const open = activeModal === 'profile'
  const fileInputRef = useRef(null)

  const [nameDraft, setNameDraft] = useState('')
  const [avatarDraft, setAvatarDraft] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (open && user) {
      setNameDraft(user.name || '')
      setAvatarDraft(user.avatarUrl || '')
      setSaved(false)
    }
  }, [open, user])

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
    reader.onload = () => setAvatarDraft(reader.result)
    reader.readAsDataURL(file)
  }

  function handleSave() {
    updateProfile({ name: nameDraft.trim() || user.name, avatarUrl: avatarDraft })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <Modal open={open} onClose={closeModal} title="My profile" maxWidth="max-w-md">
      {!user ? (
        <p className="text-ink-muted py-8 text-center">Log in to see your profile.</p>
      ) : (
        <div>
          {/* Avatar + upload */}
          <div className="flex flex-col items-center mb-5">
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
            <p className="text-xs text-ink-subtle mt-2">Tap the camera icon to upload a photo</p>
          </div>

          {/* Avatar presets */}
          <div className="mb-5">
            <div className="text-xs font-semibold text-ink-muted mb-2">Or choose an avatar</div>
            <div className="grid grid-cols-4 gap-2.5">
              {AVATAR_PRESETS.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setAvatarDraft(src)}
                  className={`rounded-full overflow-hidden border-2 transition-colors ${
                    avatarDraft === src ? 'border-purple' : 'border-border hover:border-purple/50'
                  }`}
                >
                  <img src={src} alt="" className="w-full aspect-square object-cover bg-surface" />
                </button>
              ))}
            </div>
          </div>

          {/* Name field */}
          <div className="mb-5">
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
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

          <button onClick={handleSave} className="btn-purple w-full justify-center">
            {saved ? (
              <>
                <FiCheck /> Saved
              </>
            ) : (
              'Save changes'
            )}
          </button>
        </div>
      )}
    </Modal>
  )
}
