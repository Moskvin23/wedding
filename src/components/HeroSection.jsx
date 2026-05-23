import { useEffect, useRef } from 'react'
import heroFlower from '../assets/hero-flower.svg'
import { isFormControlFocused } from '../hooks/useFormFocusLock'

function HeroSection() {
  const contentRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (isFormControlFocused()) return

      const vh = window.visualViewport?.height ?? window.innerHeight
      const progress = Math.min(window.scrollY / (vh * 0.8), 1)
      const maxTranslate = Math.min(vh * 0.42, 422)
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${-progress * maxTranslate}px)`
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.visualViewport?.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.visualViewport?.removeEventListener('resize', handleScroll)
    }
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
