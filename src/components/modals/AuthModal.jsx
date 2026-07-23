import { useState } from 'react'
import Modal from '../ui/Modal'
import { useApp } from '../../context/AppContext'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.6 26.9 35.6 24 35.6c-5.3 0-9.7-3.1-11.3-7.5l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.6 5.6C39.5 37.4 44 31.4 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  )
}

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

  function handleGoogleAuth() {
    // No backend yet — mock Google sign-in until real OAuth is wired up.
    login('Google User', 'you@gmail.com')
  }

  return (
    <Modal open={open} onClose={closeModal} title={isSignup ? 'Create an account' : 'Welcome back'} maxWidth="max-w-sm">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-2.5 border border-border rounded-full py-2.5 text-sm font-semibold text-ink hover:bg-surface transition-colors"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-1">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-ink-subtle">or</span>
          <div className="h-px bg-border flex-1" />
        </div>

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

          <button type="submit" className="btn-purple w-full justify-center mt-1">
            {isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

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
      </div>
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
