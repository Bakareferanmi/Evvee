import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMapPin, FiChevronDown, FiX } from 'react-icons/fi'
import { popularLocations, allStates } from '../../data/states'

export default function LocationPicker({ location, onChange }) {
  const [open, setOpen] = useState(false)
  const [showAllStates, setShowAllStates] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function select(loc) {
    onChange(loc)
    setOpen(false)
  }

  return (
    <div className="relative flex items-center gap-1" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-ink px-2 py-1 rounded-md hover:bg-surface transition-colors"
      >
        <FiMapPin className="text-purple" />
        {location}
        <FiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} size={14} />
      </button>
      {location !== 'All Nigeria' && (
        <button
          type="button"
          aria-label="Clear location, search all Nigeria"
          onClick={() => select('All Nigeria')}
          className="text-ink-subtle hover:text-ink"
        >
          <FiX size={14} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-56 max-h-80 overflow-y-auto bg-white border border-border rounded-md shadow-md p-2 z-20 list-none"
          >
            <Option label="🇳🇬 All Nigeria" active={location === 'All Nigeria'} onClick={() => select('All Nigeria')} />
            <li className="text-[0.7rem] uppercase tracking-wide text-ink-subtle px-2 pt-2 pb-1">Popular</li>
            {popularLocations.map((loc) => (
              <Option key={loc} label={loc} active={location === loc} onClick={() => select(loc)} />
            ))}
            <li>
              <button
                type="button"
                onClick={() => setShowAllStates((s) => !s)}
                className="w-full flex items-center justify-between text-sm px-2 py-2 rounded-md hover:bg-surface text-ink-muted"
              >
                All 36 states
                <FiChevronDown className={`transition-transform ${showAllStates ? 'rotate-180' : ''}`} size={14} />
              </button>
            </li>
            {showAllStates &&
              allStates.map((loc) => <Option key={loc} label={loc} active={location === loc} onClick={() => select(loc)} />)}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function Option({ label, active, onClick }) {
  return (
    <li>
      <button
        type="button"
        role="option"
        aria-selected={active}
        onClick={onClick}
        className={`w-full text-left text-sm px-2 py-2 rounded-md transition-colors ${
          active ? 'bg-purple-dim text-purple font-medium' : 'hover:bg-surface text-ink'
        }`}
      >
        {label}
      </button>
    </li>
  )
}
