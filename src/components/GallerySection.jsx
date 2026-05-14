import useScrollReveal from '../hooks/useScrollReveal'

function GallerySection({ gallery }) {
  const ref = useScrollReveal()

  return (
    <section className="gallery-section">
      <div className="page-inner gallery-inner" ref={ref}>
        <h2 className="gallery-title">{gallery.title}</h2>
        <div className="gallery-grid">
          {gallery.items.map((item) => (
            <figure key={item.alt} className="gallery-card">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
