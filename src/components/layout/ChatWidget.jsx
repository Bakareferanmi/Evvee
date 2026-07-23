import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const messages = [
  "Hey! Planning an event? Tell me what you need — photographer, caterer, DJ — and I'll point you to the right category.",
  "Looking for a vendor in a specific city? I can help you narrow it down by location.",
  "Need a quick recommendation? Tell me your event type and budget, and I'll steer you the right way.",
  "Stuck choosing between vendors? Check reviews and ratings before you reach out on WhatsApp.",
  "Vendors on Evvee never charge a booking fee — you deal with them directly. Anything I can help you find?",
]

function RobotMascot({ size = 44 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <line x1="44" y1="6" x2="48" y2="2" stroke="#E4DEF2" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="2" r="2.4" fill="#C79CFF" />
      <circle cx="24" cy="14" r="6" fill="#C79CFF" />
      <circle cx="40" cy="14" r="6" fill="#C79CFF" />
      <rect x="26" y="9" width="12" height="5" rx="2.5" fill="#C79CFF" />
      <circle cx="32" cy="24" r="19" fill="#FFFFFF" />
      <ellipse cx="32" cy="25.5" rx="13" ry="12" fill="#0B0912" stroke="#B57BFF" strokeWidth="2.5" />
      <rect x="24" y="21" width="4.5" height="8" rx="1.6" fill="#8FF5E8" />
      <rect x="35.5" y="21" width="4.5" height="8" rx="1.6" fill="#8FF5E8" />
      <circle cx="32" cy="32.5" r="1.6" fill="#8FF5E8" />
      <path
        d="M14 47 C14 37 21.5 32 32 32 C42.5 32 50 37 50 47 L50 50 C50 52.2 48.2 54 46 54 L18 54 C15.8 54 14 52.2 14 50 Z"
        fill="#FFFFFF"
      />
      <path d="M18 34 L14 47 L20 47 L23 36 Z" fill="#C79CFF" />
      <path d="M46 34 L50 47 L44 47 L41 36 Z" fill="#C79CFF" />
      <rect x="26" y="39" width="12" height="10" rx="3" fill="#F5F0FF" stroke="#B57BFF" strokeWidth="1.4" />
      <rect x="29" y="42" width="4.5" height="4.5" rx="1" fill="#B57BFF" />
      <circle cx="36" cy="43" r="1.1" fill="#B57BFF" />
      <circle cx="36" cy="46" r="1.1" fill="#B57BFF" />
    </svg>
  )
}

export default function ChatWidget() {
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [open, setOpen] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const lastIndex = useRef(0)

  useEffect(() => {
    const t = setTimeout(() => setBubbleVisible(true), 4000)
    return () => clearTimeout(t)
  }, [])

  function handleToggle() {
    if (!open) {
      let next = Math.floor(Math.random() * messages.length)
      if (messages.length > 1 && next === lastIndex.current) {
        next = (next + 1) % messages.length
      }
      lastIndex.current = next
      setMessageIndex(next)
    }
    setOpen((o) => !o)
  }

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
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-ink to-purple-deep flex items-center justify-center shrink-0">
                <RobotMascot size={28} />
              </span>
              <div>
                <div className="text-sm font-semibold">Feranmi</div>
                <div className="text-xs text-ink-subtle">Evvee assistant</div>
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">{messages[messageIndex]}</p>
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
        onClick={handleToggle}
        aria-label="Open Evvee assistant"
        className="w-[60px] h-[60px] rounded-2xl bg-gradient-to-br from-ink to-purple-deep shadow-md flex items-center justify-center hover:scale-105 transition-transform border border-purple/40"
      >
        {open ? <FiX size={22} className="text-white" /> : <RobotMascot size={42} />}
      </button>
    </div>
  )
}
