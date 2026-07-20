import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { FiSearch, FiArrowRight, FiStar, FiHeadphones, FiCamera } from 'react-icons/fi'
import { GiForkKnifeSpoon, GiLipstick } from 'react-icons/gi'
import LocationPicker from './LocationPicker'
import { useApp } from '../../context/AppContext'

const popularTags = [
  { label: 'Lagos DJ', icon: FiHeadphones },
  { label: 'Abuja photographer', icon: FiCamera },
  { label: 'Wedding catering', icon: GiForkKnifeSpoon },
  { label: 'Makeup artist', icon: GiLipstick },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.5, ease: [0.2, 0.6, 0.2, 1] } }),
}

export default function Hero() {
  const { openModal } = useApp()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Lagos')
  const statRef = useRef(null)

  useEffect(() => {
    const el = statRef.current
    if (!el) return
    const counter = { value: 0 }
    gsap.to(counter, {
      value: 36,
      duration: 1.4,
      delay: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(counter.value)
      },
    })
  }, [])

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-20 bg-ink text-bg">
      {/* subtle gold rule frame, invitation-card style */}
      <div className="absolute inset-4 sm:inset-6 border border-lime/20 rounded-lg pointer-events-none hidden md:block" />
      <div
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(199,154,61,0.14) 0%, transparent 70%)' }}
      />

      <div className="container-evvee grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center relative">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.14em] uppercase text-lime border border-lime/30 px-3.5 py-1.5 rounded-full mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            Nigeria&apos;s event vendor marketplace
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-[clamp(2.4rem,6.5vw,4rem)] font-display font-semibold leading-[1.02] tracking-tight mb-5 max-w-xl text-bg"
          >
            Every occasion deserves the <span className="italic text-lime">right</span> vendor.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-[1.05rem] text-bg/70 max-w-md mb-9 leading-relaxed font-sans"
          >
            Photographers, caterers, DJs, makeup artists and more — verified, and across Nigeria. Skip the
            back-and-forth, message them directly on WhatsApp.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="bg-bg text-ink rounded-lg shadow-md p-2 mb-6 max-w-lg"
          >
            <div className="flex items-center gap-2 px-2 py-1.5">
              <FiSearch className="text-ink-subtle" />
              <input
                id="hero-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search photographers, DJs, caterers…"
                aria-label="Search vendors"
                className="flex-1 text-sm outline-none placeholder:text-ink-subtle bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 border-t border-border px-2 pt-2 mt-1 flex-wrap">
              <LocationPicker location={location} onChange={setLocation} />
              <button
                className="btn-lime btn-sm ml-auto"
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Search vendors
              </button>
            </div>
          </motion.div>

          <motion.div custom={4} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            <button className="btn-ghost btn-lg border-bg/25 text-bg hover:border-lime hover:bg-lime/10" onClick={() => openModal('list-business')}>
              List your business <FiArrowRight />
            </button>
          </motion.div>

          <motion.div custom={5} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-bg/50 font-mono uppercase tracking-wide">Popular:</span>
            {popularTags.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => {
                  setQuery(label)
                  document.getElementById('hero-search')?.focus()
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-bg/80 bg-bg/10 border border-bg/10 px-3 py-1.5 rounded-full hover:bg-bg/15 hover:text-lime transition-colors"
              >
                <Icon size={12} /> {label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Ticket-styled preview card — the signature element */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="hidden lg:block relative"
        >
          <div className="bg-bg text-ink rounded-lg shadow-md overflow-hidden max-w-sm mx-auto rotate-[-2deg]">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=75"
                alt=""
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[0.68rem] font-semibold px-2 py-1 rounded-full bg-lime text-white">
                <FiStar size={11} /> Featured
              </span>
            </div>
            <div className="p-5 ticket-perforation">
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1.5 font-mono uppercase tracking-wide">
                <span>Event coordination</span>
                <span ref={statRef} className="text-ink font-semibold">
                  0
                </span>
                <span className="sr-only">states covered</span>
              </div>
              <div className="font-display font-semibold text-lg mb-1">Momentum Events &amp; Co.</div>
              <p className="text-sm text-ink-muted mb-4">Full-service planning, decor, and day-of coordination.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple">From ₦500,000</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#25D366] text-white px-3.5 py-2 rounded-full">
                  Chat
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-2 bg-lime text-white shadow-md rounded-full px-4 py-2.5 flex items-center gap-2 text-sm font-medium whitespace-nowrap rotate-[3deg]">
            <FiStar className="fill-white" /> 4.9 average rating
          </div>
        </motion.div>
      </div>
    </section>
  )
}
