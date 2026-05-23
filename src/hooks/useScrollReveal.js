import { useEffect, useRef } from 'react'
import { isFormControlFocused } from './useFormFocusLock'

function useScrollReveal({ outFactor = 0.8, translate = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      if (isFormControlFocused()) return

      const top = el.getBoundingClientRect().top
      const vh = window.visualViewport?.height ?? window.innerHeight

      el.style.opacity = '1'

      if (top > vh) {
        el.style.transform = translate ? 'translateY(40px)' : 'none'
      } else if (top > 0) {
        const appear = Math.min((1 - top / vh) / 0.6, 1)
        el.style.transform = translate ? `translateY(${(1 - appear) * 40}px)` : 'none'
      } else {
        const out = Math.min(-top / (vh * outFactor), 1)
        el.style.transform = translate ? `translateY(${-out * 60}px)` : 'none'
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.visualViewport?.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [outFactor, translate])

  return ref
}

export default useScrollReveal
