import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2 })
    lenisRef.current = lenis

    // Let ScrollTrigger know about Lenis' scroll values
    lenis.on('scroll', ScrollTrigger.update)

    // Provide a scrollerProxy so ScrollTrigger reads Lenis-controlled scrolling
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value)
        }
        return lenis.scroll // current scroll position
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      // Pinning strategy
      pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
    })

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after setup
    ScrollTrigger.addEventListener('refresh', () => {})
    ScrollTrigger.refresh()

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
      ScrollTrigger.removeEventListener('refresh', () => {})
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}
