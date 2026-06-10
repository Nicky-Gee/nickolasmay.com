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
  { src: img1, title: 'Noosa Tourism',        category: 'TOURISM' },
  { src: img2, title: 'Elysian Eco Resort',   category: 'HOSPITALITY' },
  { src: img3, title: 'Mirage Whitsundays',   category: 'HOSPITALITY' },
  { src: img4, title: 'Finca La Torre',       category: 'COMMERCIAL' },
  { src: img5, title: 'Kakadu Tourism',       category: 'TOURISM' },
  { src: img6, title: 'Cavan Merino Station', category: 'RURAL COMMERCIAL' },
]

const N = works.length // 6

export default function Work() {
  const sectionRef = useRef()
  const stickyRef  = useRef()
  const cardRefs   = useRef([])
  const imgRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set cards 1–5 to start fully below the viewport (clipped by overflow:hidden)
      gsap.set(cardRefs.current.slice(1), { yPercent: 100 })

      // Each card slides up from yPercent:100 → 0 during its 100vh scroll window.
      // Simultaneously the outgoing card (i-1) fades to opacity 0 so there's
      // no hard image boundary at the wipe edge.
      for (let i = 1; i < N; i++) {
        const start = (i - 1) * 100  // in vh units relative to section pin start
        const end   = i * 100

        gsap.to(cardRefs.current[i], {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${start}vh top`,
            end:   `top+=${end}vh top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })


        // Ken Burns on this card while it's the active card on screen
        gsap.fromTo(imgRefs.current[i],
          { scale: 1 },
          {
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${end}vh top`,
              end:   `top+=${end + 100}vh top`,
              scrub: 2,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      // Ken Burns on card 0 while it's the active card (before card 1 covers it)
      gsap.fromTo(imgRefs.current[0],
        { scale: 1 },
        {
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end:   'top+=-100vh top',
            scrub: 2,
            invalidateOnRefresh: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${N * 100}vh`,
      }}
    >
      {/* Sticky viewport — overflow:hidden clips all cards outside bounds */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {works.map((w, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              zIndex: i + 1,
              // Soften the leading wipe edge on incoming cards
              maskImage: i > 0 ? 'linear-gradient(to bottom, transparent 0%, black 14%)' : 'none',
              WebkitMaskImage: i > 0 ? 'linear-gradient(to bottom, transparent 0%, black 14%)' : 'none',
            }}
          >
            {/* Full-bleed image */}
            <img
              ref={el => { imgRefs.current[i] = el }}
              src={w.src}
              alt={w.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />

            {/* Overlay — max rgba(0,0,0,0.25) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.22)',
              pointerEvents: 'none',
            }} />

            {/* Category + Title — bottom left */}
            <div style={{
              position: 'absolute',
              bottom: '8vh',
              left: '6vw',
              zIndex: 2,
              pointerEvents: 'none',
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.4em',
                color: 'rgba(255,255,255,0.7)',
                margin: '0 0 10px',
                textTransform: 'uppercase',
              }}>
                {w.category}
              </p>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontWeight: 400,
                fontSize: '8vw',
                color: '#fff',
                letterSpacing: '0.05em',
                lineHeight: 1,
                margin: 0,
              }}>
                {w.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
