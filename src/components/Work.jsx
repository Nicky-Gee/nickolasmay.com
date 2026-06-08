import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import img1 from '../assets/images/noosa-tourism.jpg'
import img2 from '../assets/images/elysian-retreat.jpg'
import img3 from '../assets/images/mirage-whitsundays.jpg'
import img4 from '../assets/images/finca-la-torre.jpg'
import img5 from '../assets/images/kakadu-tourism.jpg'
import img6 from '../assets/images/cavan-station.jpg'

gsap.registerPlugin(ScrollTrigger)

const works = [
  { src: img1, title: 'Noosa Tourism' },
  { src: img2, title: 'Elysian Eco Resort' },
  { src: img3, title: 'Mirage Whitsundays' },
  { src: img4, title: 'Finca La Torre' },
  { src: img5, title: 'Kakadu Tourism' },
  { src: img6, title: 'Cavan Merino Station' },
]

function WorkItem({ src, title, index }) {
  const outer = useRef()
  const inner = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: outer.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={outer} style={{
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      position: 'sticky',
      top: 0,
      zIndex: index + 1,
    }}>
      <div ref={inner} style={{
        width: '100%',
        height: '116%',
        position: 'absolute',
        top: '-8%',
        willChange: 'transform',
      }}>
        <img src={src} alt={title} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: 'saturate(0.85)',
        }} />
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.15)',
      }}>
        <h2 style={{
          fontFamily: "'futura-pt',sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(28px,4.5vw,64px)',
          color: '#fff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textAlign: 'center',
          textShadow: '0 2px 40px rgba(0,0,0,0.5)',
          padding: '0 6vw',
        }}>{title}</h2>
      </div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" style={{ position: 'relative', isolation: 'isolate' }}>
      {works.map((w, i) => (
        <WorkItem key={i} {...w} index={i} />
      ))}
    </section>
  )
}
