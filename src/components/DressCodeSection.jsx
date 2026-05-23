import useScrollReveal from '../hooks/useScrollReveal'

function DressCodeSection({ dressCode }) {
  const ref = useScrollReveal({ fade: false })

  return (
    <section className="dress-section">
      <div className="page-inner dress-inner" ref={ref}>
        <h2 className="dress-title">{dressCode.title}</h2>
        <p className="dress-text">{dressCode.text}</p>
        <div className="dress-palette">
          {dressCode.colorRows.map((row) => (
            <div key={row.label} className="dress-row-group">
              <p className="dress-row-label">{row.label}</p>
              <div className="dress-swatch-row">
                {row.colors.map((color) => (
                  <div key={color} className="dress-swatch" style={{ background: color }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DressCodeSection
