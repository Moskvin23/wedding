import { useEffect } from 'react'

let formControlFocused = false

const FORM_SELECTOR = 'input, textarea, select'

export function isFormControlFocused() {
  return formControlFocused
}

function isFormControl(el) {
  return el?.matches?.(FORM_SELECTOR)
}

function clampHorizontalScroll() {
  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY)
  }
}

export default function useFormFocusLock() {
  useEffect(() => {
    const syncFocus = () => {
      formControlFocused = isFormControl(document.activeElement)
    }

    const onFocusIn = (e) => {
      if (isFormControl(e.target)) {
        formControlFocused = true
      }
    }

    const onFocusOut = () => {
      requestAnimationFrame(() => {
        syncFocus()
        if (!formControlFocused) {
          clampHorizontalScroll()
        }
      })
    }

    const onViewportChange = () => {
      if (formControlFocused || isFormControl(document.activeElement)) {
        clampHorizontalScroll()
      }
    }

    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    window.visualViewport?.addEventListener('resize', onViewportChange)
    window.visualViewport?.addEventListener('scroll', onViewportChange)

    return () => {
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
      window.visualViewport?.removeEventListener('resize', onViewportChange)
      window.visualViewport?.removeEventListener('scroll', onViewportChange)
      formControlFocused = false
    }
  }, [])
}
