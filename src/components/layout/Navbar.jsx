import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiUser, FiHeart, FiClipboard, FiCheckCircle, FiLogOut, FiArrowRight } from 'react-icons/fi'
import { useApp } from '../../context/AppContext'

const navLinks = [
  { href: '#categories', label: 'Browse' },
  { href: '#featured', label: 'Vendors' },
  { href: '#how', label: 'How it works' },
  { href: '#blog', label: 'Journal' },
]

export default function Navbar() {
  const { user, logout, savedVendorIds, bookings, openModal } = useApp()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-3.5 bg-white/80 backdrop-blur-md border-b border-black/[0.06]">
      <div className="container-evvee flex items-center justify-between">
        <a href="#" className="text-2xl font-extrabold tracking-tight flex items-center">
          <span className="text-ink">Ev</span>
          <span className="text-lime-deep">vee</span>
        </a>

        <ul className="hidden md:flex gap-7 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <div className="relative" ref={wrapRef}>
            <button
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((o) => !o)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-purple transition-colors"
            >
              {user ? (
                user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-purple text-white text-xs font-bold flex items-center justify-center">
                    {initials}
                  </span>
                )
              ) : (
                <FiUser />
              )}
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-md border border-border p-4 z-[110]"
                >
                  {!user ? (
                    <div>
                      <div className="font-bold mb-1">Welcome to Evvee</div>
                      <p className="text-sm text-ink-muted mb-4">
                        Log in to save vendors, track your shortlist, and manage your listing.
                      </p>
                      <button
                        className="btn-purple w-full justify-center mb-2"
                        onClick={() => {
                          setDropdownOpen(false)
                          openModal('login')
                        }}
                      >
                        Log in
                      </button>
                      <button
                        className="btn-ghost w-full justify-center text-sm"
                        onClick={() => {
                          setDropdownOpen(false)
                          openModal('signup')
                        }}
                      >
                        Create an account <FiArrowRight />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3 pb-3 mb-2 border-b border-border">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <span className="w-10 h-10 rounded-full bg-purple text-white font-bold flex items-center justify-center">
                            {initials}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{user.name}</div>
                          <div className="text-xs text-ink-muted truncate">{user.email}</div>
                        </div>
                      </div>
                      <MenuItem
                        icon={<FiUser />}
                        label="My profile"
                        onClick={() => {
                          setDropdownOpen(false)
                          openModal('profile')
                        }}
                      />
                      <MenuItem
                        icon={<FiHeart />}
                        label="Saved vendors"
                        badge={savedVendorIds.length}
                        onClick={() => {
                          setDropdownOpen(false)
                          openModal('saved')
                        }}
                      />
                      <MenuItem
                        icon={<FiClipboard />}
                        label="My bookings"
                        badge={bookings.length}
                        onClick={() => {
                          setDropdownOpen(false)
                          openModal('bookings')
                        }}
                      />
                      <MenuItem
                        icon={<FiCheckCircle />}
                        label="My listing"
                        onClick={() => {
                          setDropdownOpen(false)
                          openModal('list-business')
                        }}
                      />
                      <div className="h-px bg-border my-2" />
                      <MenuItem
                        icon={<FiLogOut />}
                        label="Log out"
                        danger
                        onClick={() => {
                          setDropdownOpen(false)
                          logout()
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MenuItem({ icon, label, onClick, badge, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 text-sm px-2 py-2.5 rounded-md hover:bg-surface transition-colors ${
        danger ? 'text-red-600' : 'text-ink'
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {!!badge && <span className="text-xs bg-purple-dim text-purple font-semibold px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
  )
}
