import { useEffect } from 'react'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 3.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://use.typekit.net/ucf3jav.css');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; cursor:none; }
        html { scroll-behavior:smooth; }
        body { background:#000; -webkit-font-smoothing:antialiased; }
      `}</style>
      <Cursor />
      <main>
        <Hero />
        <div style={{ marginBottom:'-3px' }}><Work /></div>
        <About />
        <Contact />
      </main>
    </>
  )
}
