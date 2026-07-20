import Modal from '../ui/Modal'
import VendorCard from '../sections/VendorCard'
import { vendorsByCategory } from '../../data/vendors'
import { useApp } from '../../context/AppContext'

export default function CategoryModal() {
  const { activeModal, modalPayload, closeModal } = useApp()
  const open = activeModal === 'category'
  const category = modalPayload
  const list = category ? vendorsByCategory(category.slug) : []

  return (
    <Modal open={open} onClose={closeModal} title={category?.name} maxWidth="max-w-3xl">
      {list.length === 0 ? (
        <p className="text-ink-muted py-8 text-center">No vendors listed yet in this category. Check back soon!</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {list.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </Modal>
  )
}
