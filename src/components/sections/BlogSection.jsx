import Reveal from '../ui/Reveal'
import { blogPosts } from '../../data/blogPosts'
import { useApp } from '../../context/AppContext'

export default function BlogSection() {
  const { openModal } = useApp()
  const [featured, ...rest] = blogPosts

  return (
    <section id="blog" className="py-20">
      <div className="container-evvee">
        <Reveal className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="section-eyebrow">Evvee Journal</div>
            <h2 className="section-title">
              Plan smarter,
              <br />
              celebrate bigger
            </h2>
            <p className="text-ink-muted mt-2 max-w-sm">
              Tips, guides, and vendor spotlights to help Nigerian event planners get the most out of every occasion.
            </p>
          </div>
          <button className="btn-ghost btn-sm" onClick={() => openModal('blog', { slug: 'all' })}>
            See all articles
          </button>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-5">
          <Reveal>
            <button
              onClick={() => openModal('blog', featured)}
              className="text-left w-full bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img src={featured.image} alt="" className="w-full h-56 object-cover" loading="lazy" />
              <div className="p-5">
                <span className="text-xs font-semibold text-purple">{featured.tag}</span>
                <div className="font-bold text-lg mt-1.5 mb-2">{featured.title}</div>
                <p className="text-sm text-ink-muted line-clamp-3 mb-3">{featured.excerpt}</p>
                <span className="text-xs text-ink-subtle">By {featured.author}</span>
              </div>
            </button>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <button
                  onClick={() => openModal('blog', post)}
                  className="text-left w-full bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
                >
                  <img src={post.image} alt="" className="w-full h-32 object-cover" loading="lazy" />
                  <div className="p-4 flex-1">
                    <span className="text-xs font-semibold text-purple">{post.tag}</span>
                    <div className="font-bold text-sm mt-1.5 mb-1.5 leading-snug">{post.title}</div>
                    <span className="text-xs text-ink-subtle">By {post.author}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
