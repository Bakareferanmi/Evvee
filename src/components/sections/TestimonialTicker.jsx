import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Reveal from '../ui/Reveal'
import { testimonials } from '../../data/testimonials'

export default function TestimonialTicker() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Measure one full set (half the duplicated track) and loop it seamlessly.
    const setWidth = track.scrollWidth / 2
    const tween = gsap.to(track, {
      x: -setWidth,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    const onEnter = () => tween.pause()
    const onLeave = () => tween.resume()
    track.addEventListener('mouseenter', onEnter)
    track.addEventListener('mouseleave', onLeave)

    return () => {
      tween.kill()
      track.removeEventListener('mouseenter', onEnter)
      track.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="py-14 bg-surface border-t border-border overflow-hidden">
      <div className="container-evvee mb-7">
        <Reveal>
          <div className="section-eyebrow">What planners say</div>
          <h2 className="section-title">
            Loved across <span className="section-title-accent">Nigeria</span>
          </h2>
        </Reveal>
      </div>

      <div className="flex" ref={trackRef} style={{ width: 'max-content' }}>
        {doubled.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="w-80 shrink-0 bg-white border border-border rounded-lg p-5 mx-2.5"
          >
            <div className="flex gap-2 mb-3">
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                  t.tint === 'lime' ? 'bg-lime text-white' : 'bg-purple text-white'
                }`}
              >
                {t.initials}
              </span>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
              </div>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
