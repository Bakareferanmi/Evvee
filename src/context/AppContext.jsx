import { createContext, useContext, useMemo, useState, useCallback } from 'react'

const AppContext = createContext(null)

/**
 * Central app state. Everything here is in-memory/mock for now —
 * no backend is wired up. Swap the functions in this file for real
 * API/Supabase calls later without touching any component.
 */
export function AppProvider({ children }) {
  const [user, setUser] = useState(null) // { name, email }
  const [savedVendorIds, setSavedVendorIds] = useState([])
  const [bookings, setBookings] = useState([])
  const [activeModal, setActiveModal] = useState(null) // 'login' | 'signup' | 'list-business' | 'bookings' | 'saved' | 'category' | 'blog' | null
  const [modalPayload, setModalPayload] = useState(null)

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
      savedVendorIds,
      toggleSaveVendor,
      bookings,
      addBooking,
      activeModal,
      modalPayload,
      openModal,
      closeModal,
    }),
    [user, login, logout, savedVendorIds, toggleSaveVendor, bookings, addBooking, activeModal, modalPayload, openModal, closeModal]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
