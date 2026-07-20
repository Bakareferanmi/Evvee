import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi'
import Modal from '../ui/Modal'
import { categories } from '../../data/categories'
import { popularLocations, allStates } from '../../data/states'
import { useApp } from '../../context/AppContext'

const steps = ['Business info', 'Category & location', 'Contact', 'Review']

const emptyForm = {
  firstName: '',
  lastName: '',
  businessName: '',
  description: '',
  category: '',
  city: '',
  travelRadius: '',
  whatsapp: '',
  email: '',
  instagram: '',
}

export default function BusinessOnboardingModal() {
  const { activeModal, closeModal } = useApp()
  const open = activeModal === 'list-business'
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleClose() {
    closeModal()
    setTimeout(() => {
      setStep(0)
      setForm(emptyForm)
      setSubmitted(false)
    }, 250)
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // No backend wired up yet — this just confirms the submission locally.
    setSubmitted(true)
  }

  return (
    <Modal open={open} onClose={handleClose} title={submitted ? undefined : 'List your business'} maxWidth="max-w-lg">
      {submitted ? (
        <div className="text-center py-6">
          <span className="w-14 h-14 mx-auto rounded-full bg-lime-dim text-lime-deep flex items-center justify-center text-2xl mb-4">
            <FiCheck />
          </span>
          <h3 className="text-lg font-bold mb-2">You&apos;re on the list</h3>
          <p className="text-sm text-ink-muted mb-6">
            We&apos;ll review {form.businessName || 'your business'} and reach out on WhatsApp within 48 hours.
          </p>
          <button className="btn-purple" onClick={handleClose}>
            Done
          </button>
        </div>
      ) : (
        <>
          <StepIndicator step={step} />
          <form onSubmit={handleSubmit} className="mt-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
              >
                {step === 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="First name">
                        <input required className="input" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
                      </Field>
                      <Field label="Last name">
                        <input required className="input" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Business name">
                      <input required className="input" value={form.businessName} onChange={(e) => update('businessName', e.target.value)} />
                    </Field>
                    <Field label="Describe what you offer">
                      <textarea
                        required
                        rows={3}
                        className="textarea"
                        value={form.description}
                        onChange={(e) => update('description', e.target.value)}
                      />
                    </Field>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Field label="Category">
                      <select required className="input" value={form.category} onChange={(e) => update('category', e.target.value)}>
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Base city / state">
                      <select required className="input" value={form.city} onChange={(e) => update('city', e.target.value)}>
                        <option value="" disabled>
                          Select your base
                        </option>
                        {[...popularLocations, ...allStates].map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Willing to travel? (km, optional)">
                      <input
                        type="number"
                        min="0"
                        className="input"
                        value={form.travelRadius}
                        onChange={(e) => update('travelRadius', e.target.value)}
                        placeholder="e.g. 50"
                      />
                    </Field>
                  </>
                )}

                {step === 2 && (
                  <>
                    <Field label="WhatsApp number">
                      <input
                        required
                        className="input"
                        placeholder="e.g. 2348012345678"
                        value={form.whatsapp}
                        onChange={(e) => update('whatsapp', e.target.value)}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        required
                        type="email"
                        className="input"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                      />
                    </Field>
                    <Field label="Instagram handle (optional)">
                      <input className="input" placeholder="@yourbusiness" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} />
                    </Field>
                  </>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-2 text-sm">
                    <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                    <ReviewRow label="Business" value={form.businessName} />
                    <ReviewRow label="Category" value={categories.find((c) => c.slug === form.category)?.name} />
                    <ReviewRow label="Base" value={form.city} />
                    <ReviewRow label="WhatsApp" value={form.whatsapp} />
                    <ReviewRow label="Email" value={form.email} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="btn-ghost btn-sm disabled:opacity-0 disabled:pointer-events-none"
              >
                <FiArrowLeft /> Back
              </button>
              {step < steps.length - 1 ? (
                <button type="button" onClick={next} className="btn-purple btn-sm">
                  Continue <FiArrowRight />
                </button>
              ) : (
                <button type="submit" className="btn-lime btn-sm">
                  Submit listing
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </Modal>
  )
}

function StepIndicator({ step }) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((label, i) => (
        <div key={label} className="flex-1">
          <div className={`h-1 rounded-full transition-colors ${i <= step ? 'bg-purple' : 'bg-border'}`} />
        </div>
      ))}
    </div>
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

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-border pb-2">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium">{value || '—'}</span>
    </div>
  )
}
