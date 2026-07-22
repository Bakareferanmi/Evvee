import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useEffect } from 'react'

export default function Modal({ open, onClose, children, maxWidth = 'max-w-lg', title }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`w-full ${maxWidth} bg-elevated text-ink rounded-t-lg sm:rounded-lg shadow-md max-h-[90vh] overflow-y-auto`}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.2, 0.6, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              {title ? <h3 className="text-lg font-bold">{title}</h3> : <span />}
              <button
                aria-label="Close"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
              >
                <FiX />
              </button>
            </div>
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
