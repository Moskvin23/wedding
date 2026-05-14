import { useEffect, useRef } from 'react'

function useScrollReveal({ outFactor = 0.8, translate = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const top = el.getBoundingClientRect().top
      const vh = window.innerHeight

      if (top > vh) {
        el.style.opacity = 0
        el.style.transform = translate ? 'translateY(40px)' : 'none'
      } else if (top > 0) {
        const appear = Math.min((1 - top / vh) / 0.6, 1)
        el.style.opacity = appear
        el.style.transform = translate ? `translateY(${(1 - appear) * 40}px)` : 'none'
      } else {
        const out = Math.min(-top / (vh * outFactor), 1)
        el.style.opacity = 1 - out
        el.style.transform = translate ? `translateY(${-out * 60}px)` : 'none'
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [outFactor, translate])

  return ref
}

export default useScrollReveal
