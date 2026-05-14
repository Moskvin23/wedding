import useScrollReveal from '../hooks/useScrollReveal'

function DressCodeSection({ dressCode }) {
  const ref = useScrollReveal()

  return (
    <section className="dress-section">
      <div className="page-inner dress-inner" ref={ref}>
        <h2 className="dress-title">{dressCode.title}</h2>
        <p className="dress-text">{dressCode.text}</p>
        <div className="dress-palette">
          {dressCode.colorRows.map((row, i) => (
            <div key={i} className="dress-row-group">
              <p className="dress-row-label">{i === 0 ? 'Girls' : 'Men'}</p>
              <div className="dress-swatch-row">
                {row.map((color) => (
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
