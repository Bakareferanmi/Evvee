import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'

const AppContext = createContext(null)

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

/**
 * Central app state. User, saved vendors, and bookings persist to
 * localStorage so they survive a page refresh. Swap for real
 * API/Supabase calls later without touching any component.
 */
export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage('evvee_user', null)) // { name, email, avatarUrl }
  const [savedVendorIds, setSavedVendorIds] = useState(() => loadFromStorage('evvee_saved', []))
  const [bookings, setBookings] = useState(() => loadFromStorage('evvee_bookings', []))
  const [activeModal, setActiveModal] = useState(null) // 'login' | 'signup' | 'list-business' | 'bookings' | 'saved' | 'category' | 'blog' | 'profile' | null
  const [modalPayload, setModalPayload] = useState(null)

  useEffect(() => {
    localStorage.setItem('evvee_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('evvee_saved', JSON.stringify(savedVendorIds))
  }, [savedVendorIds])

  useEffect(() => {
    localStorage.setItem('evvee_bookings', JSON.stringify(bookings))
  }, [bookings])

  const openModal = useCallback((name, payload = null) => {
    setActiveModal(name)
    setModalPayload(payload)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    setModalPayload(null)
  }, [])

  const login = useCallback((name, email) => {
    setUser({ name, email })
    closeModal()
  }, [closeModal])

  const logout = useCallback(() => setUser(null), [])

  const updateProfile = useCallback((updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev))
  }, [])

  const toggleSaveVendor = useCallback((vendorId) => {
    setSavedVendorIds((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    )
  }, [])

  const addBooking = useCallback((booking) => {
    setBookings((prev) => [...prev, { id: `bk_${Date.now()}`, ...booking }])
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateProfile,
      savedVendorIds,
      toggleSaveVendor,
      bookings,
      addBooking,
      activeModal,
      modalPayload,
      openModal,
      closeModal,
    }),
    [user, login, logout, updateProfile, savedVendorIds, toggleSaveVendor, bookings, addBooking, activeModal, modalPayload, openModal, closeModal]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
