import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'evvee-cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = window.localStorage?.getItem(STORAGE_KEY)
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  function dismiss() {
    window.localStorage?.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[150] bg-white border border-border shadow-md rounded-lg p-4"
        >
          <p className="text-sm text-ink-muted mb-3">
            We use cookies to remember your saved vendors and keep search fast. That&apos;s it.
          </p>
          <div className="flex gap-2 justify-end">
            <button onClick={dismiss} className="btn-ghost btn-sm">
              Decline
            </button>
            <button onClick={dismiss} className="btn-purple btn-sm">
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
