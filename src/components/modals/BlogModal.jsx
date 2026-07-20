import Modal from '../ui/Modal'
import { blogPosts } from '../../data/blogPosts'
import { useApp } from '../../context/AppContext'

export default function BlogModal() {
  const { activeModal, modalPayload, closeModal, openModal } = useApp()
  const open = activeModal === 'blog'
  const isAll = modalPayload?.slug === 'all'

  return (
    <Modal open={open} onClose={closeModal} title={isAll ? 'All articles' : modalPayload?.tag} maxWidth="max-w-2xl">
      {isAll ? (
        <div className="flex flex-col gap-3 pt-2">
          {blogPosts.map((post) => (
            <button
              key={post.slug}
              onClick={() => openModal('blog', post)}
              className="flex gap-3 text-left items-center bg-surface hover:bg-chip transition-colors rounded-md p-3"
            >
              <img src={post.image} alt="" className="w-16 h-16 rounded-md object-cover shrink-0" />
              <div>
                <span className="text-xs font-semibold text-purple">{post.tag}</span>
                <div className="text-sm font-semibold leading-snug">{post.title}</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <article>
          <img src={modalPayload?.image} alt="" className="w-full h-52 object-cover rounded-md mb-4" />
          <h2 className="text-xl font-bold mb-2 leading-snug">{modalPayload?.title}</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">{modalPayload?.excerpt}</p>
          <span className="text-xs text-ink-subtle">By {modalPayload?.author}</span>
          <div className="mt-6 pt-4 border-t border-border text-center">
            <span className="text-xs text-ink-muted">More articles coming soon</span>
          </div>
        </article>
      )}
    </Modal>
  )
}
