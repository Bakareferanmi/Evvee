import { useState } from 'react'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import { useApp } from '../../context/AppContext'

export default function ListBusinessCTA() {
  const { openModal } = useApp()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <section className="py-20">
      <div className="container-evvee grid lg:grid-cols-2 gap-6">
        <Reveal className="bg-purple text-white rounded-lg p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold mb-3">Are you an event vendor?</h2>
          <p className="text-white/80 mb-6 max-w-sm">
            List your business on Evvee and get discovered by planners across Nigeria — no booking fees, ever.
          </p>
          <button
            onClick={() => openModal('list-business')}
            className="btn-lime btn-lg w-fit"
          >
            List your business <FiArrowRight />
          </button>
        </Reveal>

        <Reveal delay={0.1} className="bg-surface rounded-lg p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold mb-3">
            Get the best vendors
            <br />
            delivered to your inbox
          </h2>
          <p className="text-ink-muted mb-6 max-w-sm">
            One email a month. Fresh vendors, seasonal tips, no spam.
          </p>
          {subscribed ? (
            <div className="flex items-center gap-2 text-purple font-semibold">
              <FiCheck /> You&apos;re subscribed — welcome to the Journal.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 flex-wrap">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 min-w-[200px] bg-white border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:border-purple"
              />
              <button type="submit" className="btn-purple">
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
