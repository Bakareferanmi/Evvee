import Modal from '../ui/Modal'
import VendorCard from '../sections/VendorCard'
import { vendors } from '../../data/vendors'
import { useApp } from '../../context/AppContext'

export default function SavedVendorsModal() {
  const { activeModal, closeModal, savedVendorIds } = useApp()
  const open = activeModal === 'saved'
  const saved = vendors.filter((v) => savedVendorIds.includes(v.id))

  return (
    <Modal open={open} onClose={closeModal} title="Saved vendors" maxWidth="max-w-3xl">
      {saved.length === 0 ? (
        <p className="text-ink-muted py-8 text-center">
          Nothing saved yet. Tap the heart on any vendor card to shortlist them here.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {saved.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </Modal>
  )
}
