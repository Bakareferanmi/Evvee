import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { FiSearch, FiArrowRight, FiStar, FiHeadphones, FiCamera } from 'react-icons/fi'
import { GiForkKnifeSpoon, GiLipstick } from 'react-icons/gi'
import LocationPicker from './LocationPicker'
import { useApp } from '../../context/AppContext'

const collage = [
  'https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?auto=format&fit=crop&w=700&q=75',
  'https://images.unsplash.com/photo-1709477542149-f4e0e21d590b?auto=format&fit=crop&w=700&q=75',
  'https://images.unsplash.com/photo-1571266028243-d220c6a7edbf?auto=format&fit=crop&w=700&q=75',
  'https://images.unsplash.com/photo-1576842546422-60562b9242ae?auto=format&fit=crop&w=700&q=75',
]

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
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16">
      <div
        className="absolute -top-24 -right-20 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)' }}
      />
      <div className="container-evvee grid lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.1em] uppercase text-lime-deep bg-lime-dim border border-lime-deep/20 px-3.5 py-1.5 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime-deep animate-pulse" />
            Nigeria&apos;s event vendor marketplace
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-[clamp(2.2rem,7vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight mb-5 max-w-xl"
          >
            Find the{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(100deg, #7B2FFF 10%, #9B5CFF 50%, #7B2FFF 90%)' }}
            >
              right vendor
            </span>{' '}
            for every <span className="text-lime-deep">occasion.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-[1.05rem] text-ink-muted max-w-md mb-9 leading-relaxed"
          >
            Photographers, caterers, DJs, makeup artists and more, all verified, all across Nigeria. Contact them
            directly on WhatsApp.
          </motion.p>

          <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap gap-3 mb-5">
            <button
              className="btn-lime btn-lg"
              onClick={() => document.getElementById('hero-search')?.focus()}
            >
              <FiSearch /> Find a vendor
            </button>
            <button className="btn-ghost btn-lg" onClick={() => openModal('list-business')}>
              List your business <FiArrowRight />
            </button>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="bg-white border border-border rounded-lg shadow-sm p-2 mb-6"
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
                className="flex-1 text-sm outline-none placeholder:text-ink-subtle"
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

          <motion.div custom={5} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs text-ink-subtle">Popular:</span>
            {popularTags.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => {
                  setQuery(label)
                  document.getElementById('hero-search')?.focus()
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted bg-chip px-3 py-1.5 rounded-full hover:text-ink transition-colors"
              >
                <Icon size={12} /> {label}
              </button>
            ))}
          </motion.div>

          <motion.div custom={6} initial="hidden" animate="show" variants={fadeUp}>
            <div className="flex flex-col">
              <span ref={statRef} className="text-3xl font-extrabold">
                0
              </span>
              <span className="text-xs text-ink-muted">States covered</span>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:block relative" aria-hidden="true">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <img src={collage[0]} alt="" className="rounded-lg h-64 object-cover" loading="lazy" />
              <img src={collage[1]} alt="" className="rounded-lg h-40 object-cover" loading="lazy" />
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <img src={collage[2]} alt="" className="rounded-lg h-40 object-cover" loading="lazy" />
              <img src={collage[3]} alt="" className="rounded-lg h-64 object-cover" loading="lazy" />
            </div>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-full px-4 py-2.5 flex items-center gap-2 text-sm font-medium whitespace-nowrap">
            <span className="flex items-center gap-1 text-lime-deep font-bold">
              <FiStar className="fill-lime-deep" /> 4.9
            </span>
            Loved by planners across Nigeria
          </div>
        </div>
      </div>
    </section>
  )
}
