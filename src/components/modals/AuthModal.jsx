import { useState } from 'react'
import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'

export default function AuthModal() {
  const { activeModal, closeModal, openModal, login } = useApp()
  const isSignup = activeModal === 'signup'
  const open = activeModal === 'login' || activeModal === 'signup'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // No backend yet — this is a mock login that just stores the name/email locally.
    login(isSignup ? name || email.split('@')[0] : email.split('@')[0], email)
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <Modal open={open} onClose={closeModal} title={isSignup ? 'Create an account' : 'Welcome back'} maxWidth="max-w-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {isSignup && (
          <Field label="Full name">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Ada Okafor"
            />
          </Field>
        )}
        <Field label="Email">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Password">
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
          />
        </Field>

        <button type="submit" className="btn-purple w-full justify-center mt-2">
          {isSignup ? 'Create account' : 'Log in'}
        </button>

        <p className="text-xs text-ink-muted text-center mt-1">
          {isSignup ? 'Already have an account?' : 'New to Evvee?'}{' '}
          <button
            type="button"
            className="text-purple font-semibold"
            onClick={() => openModal(isSignup ? 'login' : 'signup')}
          >
            {isSignup ? 'Log in' : 'Create an account'}
          </button>
        </p>
      </form>
    </Modal>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-muted mb-1 block">{label}</span>
      {children}
    </label>
  )
}
