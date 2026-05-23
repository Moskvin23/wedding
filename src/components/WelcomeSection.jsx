import { useEffect, useRef, useState } from 'react'
import welcomeFlowers from '../assets/figma/flower 4.png'

function isVideoFullyLoaded(video) {
  if (!video || video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) return false

  const { duration, buffered } = video
  if (!Number.isFinite(duration) || duration <= 0 || buffered.length === 0) return false

  return buffered.end(buffered.length - 1) >= duration - 0.05
}

function WelcomeSection({ welcome }) {
  const videoRef = useRef(null)
  const [isVideoLoading, setIsVideoLoading] = useState(true)

  const tryHideLoader = () => {
    const video = videoRef.current
    if (video && isVideoFullyLoaded(video)) setIsVideoLoading(false)
  }

  useEffect(() => {
    tryHideLoader()
  }, [])

  return (
    <section className="welcome-section">
      <div className="page-inner welcome-grid">
        <h2 className="welcome-title">{welcome.title}</h2>

        <div className="welcome-photo-wrap">
          <div className="welcome-video-shell">
            {isVideoLoading && (
              <div className="welcome-video-loader" aria-hidden="true">
                <span className="welcome-video-spinner" />
              </div>
            )}
            <video
              ref={videoRef}
              className={`welcome-video${isVideoLoading ? ' welcome-video--loading' : ''}`}
              src={welcome.photo}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Pavlo та Alona"
              onLoadedMetadata={tryHideLoader}
              onProgress={tryHideLoader}
              onCanPlayThrough={tryHideLoader}
            />
          </div>
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
