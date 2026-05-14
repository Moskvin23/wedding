import useScrollReveal from '../hooks/useScrollReveal'
import welcomeFlowers from '../assets/figma/flower 4.png'

function WelcomeSection({ welcome }) {
  const ref = useScrollReveal()

  return (
    <section className="welcome-section">
      <div className="page-inner welcome-grid" ref={ref}>
        <h2 className="welcome-title">{welcome.title}</h2>

        <div className="welcome-photo-wrap">
          <img
            className="welcome-photo"
            src={welcome.photo}
            alt="Pavlo та Alona"
          />
        </div>

        <img
          className="welcome-flowers"
          src={welcomeFlowers}
          alt=""
          aria-hidden="true"
        />

        <div className="welcome-content">
          <h3 className="welcome-heading">{welcome.subtitle}</h3>
          <p className="welcome-text welcome-text--desktop">{welcome.text}</p>
          <p className="welcome-text welcome-text--mobile">
            {welcome.textMobile || welcome.text}
          </p>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
