import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero         from '../components/Hero'
import WorkGrid     from '../components/WorkGrid'
import FilmSection  from '../components/FilmSection'
import AboutStrip   from '../components/AboutStrip'
import ContactStrip from '../components/ContactStrip'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const statementRef = useRef(null)

  useEffect(() => {
    const lines = statementRef.current?.querySelectorAll('.statement-line')
    if (!lines) return

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        y: 60, opacity: 0, duration: 0.9, ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: statementRef.current,
          start:   'top 85%',
        },
      })
    }, statementRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Hero />

      {/* Statement */}
      <section
        ref={statementRef}
        style={{
          background: '#ffffff',
          padding:    '120px 0',
          paddingLeft:'10vw',
          marginTop:  '100vh',
        }}
      >
        {['FILMMAKER.', 'PHOTOGRAPHER.', 'SUNSHINE COAST.'].map((line, i) => (
          <div
            key={line}
            className="statement-line"
            style={{
              fontFamily:    "'Inter', sans-serif",
              fontWeight:    400,
              fontSize:      'clamp(42px, 7vw, 96px)',
              color:         '#2e2d32',
              lineHeight:    1.05,
              letterSpacing: '0.08em',
              display:       'block',
            }}
          >
            {line}
          </div>
        ))}

        <p
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    300,
            fontSize:      '14px',
            color:         '#a2a0a2',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop:     '40px',
          }}
        >
          Gold Cannes Lions — Australian Life Photographic Prize
        </p>
      </section>

      <WorkGrid projects={projects.slice(0, 6)} />
      <FilmSection />
      <AboutStrip />
      <ContactStrip />
    </>
  )
}
