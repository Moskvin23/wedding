import { useEffect, useRef } from 'react'
import heroFlower from '../assets/hero-flower.svg'

function HeroSection() {
  const contentRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1)
      const maxTranslate = Math.min(window.innerHeight * 0.42, 422)
      if (contentRef.current) {
        contentRef.current.style.opacity = 1 - progress
        contentRef.current.style.transform = `translateY(${-progress * maxTranslate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero-section">
      <img className="hero-flower" src={heroFlower} alt="" aria-hidden="true" />
      <div className="hero-content" ref={contentRef}>
        <p className="hero-names">
          <span>Pavlo</span>
          <span className="hero-names-second">& Alona</span>
        </p>
        <p className="hero-date">23.08.2026</p>
      </div>
    </section>
  )
}

export default HeroSection
