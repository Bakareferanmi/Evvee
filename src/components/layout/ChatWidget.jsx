import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMessageCircle, FiX } from 'react-icons/fi'

export default function ChatWidget() {
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBubbleVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-[140] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="w-72 bg-elevated text-ink border border-border rounded-lg shadow-md p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center text-sm font-bold">
                F
              </span>
              <div>
                <div className="text-sm font-semibold">Feranmi</div>
                <div className="text-xs text-ink-subtle">Evvee assistant</div>
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Hey! Planning an event? Tell me what you need — photographer, caterer, DJ — and I&apos;ll point you to the
              right category.
            </p>
          </motion.div>
        )}

        {!open && bubbleVisible && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="max-w-[220px] bg-elevated text-ink border border-border rounded-lg shadow-sm px-3.5 py-2.5 text-sm relative"
          >
            <button
              aria-label="Dismiss"
              onClick={(e) => {
                e.stopPropagation()
                setDismissed(true)
              }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-elevated border border-border rounded-full flex items-center justify-center text-ink-subtle"
            >
              <FiX size={10} />
            </button>
            Need help finding a vendor? I&apos;m Feranmi 👋
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Evvee assistant"
        className="w-[52px] h-[52px] rounded-full bg-purple text-white shadow-md flex items-center justify-center text-xl hover:bg-purple-deep transition-colors"
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  )
}

