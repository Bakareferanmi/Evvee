import Reveal from '../ui/Reveal'
import { categories } from '../../data/categories'
import { useApp } from '../../context/AppContext'

export default function CategoryGrid() {
  const { openModal } = useApp()

  return (
    <section id="categories" className="py-20">
      <div className="container-evvee">
        <Reveal className="text-center max-w-lg mx-auto mb-10">
          <div className="section-eyebrow justify-center flex">Browse by category</div>
          <h2 className="section-title">
            What are you <span className="section-title-accent">looking for?</span>
          </h2>
          <p className="text-ink-muted mt-2">Six categories, vetted vendors across Nigeria.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <Reveal key={cat.slug} delay={i * 0.05}>
                <button
                  onClick={() => openModal('category', cat)}
                  className="w-full flex flex-col items-center gap-3 text-center bg-white border border-border rounded-lg p-5 hover:border-purple hover:shadow-sm transition-all"
                >
                  <span
                    className={`w-12 h-12 rounded-md flex items-center justify-center text-xl ${
                      cat.tint === 'purple' ? 'bg-purple-dim text-purple' : 'bg-lime-dim text-lime-deep'
                    }`}
                  >
                    <Icon />
                  </span>
                  <span className="text-sm font-semibold">{cat.name}</span>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
