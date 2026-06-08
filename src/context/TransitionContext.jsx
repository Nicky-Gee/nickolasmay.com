import { createContext, useContext, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

const TransitionContext = createContext(null)
export const useTransition = () => useContext(TransitionContext)

export function TransitionProvider({ children }) {
  const overlayRef  = useRef(null)
  const navigate    = useNavigate()
  const inProgress  = useRef(false)

  const transitionTo = useCallback((path) => {
    if (inProgress.current) return
    inProgress.current = true

    const overlay = overlayRef.current
    gsap.timeline({
      onComplete: () => { inProgress.current = false },
    })
      .set(overlay,  { scaleX: 0, transformOrigin: 'left center', display: 'block' })
      .to(overlay,   { scaleX: 1, duration: 0.45, ease: 'power2.in' })
      .call(()       => { window.scrollTo(0, 0); navigate(path) })
      .to(overlay,   { scaleX: 0, duration: 0.4,  ease: 'power2.out',
                       transformOrigin: 'right center', delay: 0.05 })
      .set(overlay,  { display: 'none' })
  }, [navigate])

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}

      {/* Full-screen wipe overlay */}
      <div
        ref={overlayRef}
        style={{
          position:       'fixed',
          inset:          0,
          background:     '#ffffff',
          zIndex:         9990,
          transform:      'scaleX(0)',
          transformOrigin:'left center',
          display:        'none',
          pointerEvents:  'none',
        }}
      />
    </TransitionContext.Provider>
  )
}
