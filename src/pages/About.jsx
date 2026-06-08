import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PlaceholderImage from '../components/PlaceholderImage'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  ['Photography Production', 'Commercial, editorial, and brand photography.'],
  ['Video Production',       'Campaign films, documentaries, and social content.'],
  ['AI Content',             'AI-augmented creative production workflows.'],
  ['Branding',               'Visual identity, art direction, and brand strategy.'],
  ['Social Media',           'Platform-native content creation and strategy.'],
  ['Post Production',        'Colour grading, editing, and retouching.'],
]

export default function About() {
  const contentRef  = useRef(null)
  const statementRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(statementRef.current, {
        opacity: 0, y: 50,
        duration: 0.9, ease: 'power2.out',
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 85%',
        },
      })

      const rows = contentRef.current?.querySelectorAll('.service-row')
      if (rows?.length) {
        gsap.from(rows, {
          opacity: 0, y: 30,
          duration: 0.7, ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero — full-viewport portrait, no text overlay */}
      <div style={{ height: '100vh', overflow: 'hidden', marginTop: 0 }}>
        <PlaceholderImage
          label="Nickolas May — Portrait"
          style={{ height: '100%', width: '100%' }}
        />
      </div>

      {/* Statement */}
      <section style={{ padding: '100px 10vw 60px' }}>
        <h2
          ref={statementRef}
          style={{
            fontFamily:    "'Archivo Black', sans-serif",
            fontSize:      'clamp(32px, 5vw, 64px)',
            color:         '#2e2d32',
            lineHeight:    1.1,
            letterSpacing: '0.03em',
            maxWidth:      '900px',
          }}
        >
          I MAKE IMAGES THAT MOVE PEOPLE.
        </h2>
      </section>

      {/* Bio */}
      <section style={{ padding: '0 10vw 80px' }}>
        <p style={{
          fontFamily:  "'Inter', sans-serif",
          fontWeight:  300,
          fontSize:    '18px',
          color:       '#2e2d32',
          lineHeight:  1.9,
          maxWidth:    '680px',
        }}>
          Nickolas May is an award-winning commercial filmmaker and photographer based on the
          Sunshine Coast. With a Gold Cannes Lions award and the Australian Life Photographic
          Prize, he brings cinematic precision to every project.
        </p>
      </section>

      {/* Services */}
      <section ref={contentRef} style={{ padding: '0 10vw 80px' }}>
        <div style={{
          borderTop: '1px solid #f0f0f0',
          paddingTop: '48px',
        }}>
          {SERVICES.map(([label, value]) => (
            <div
              key={label}
              className="service-row"
              style={{
                display:       'flex',
                gap:           '4vw',
                padding:       '20px 0',
                borderBottom:  '1px solid #f0f0f0',
                alignItems:    'baseline',
              }}
            >
              <span style={{
                flex:          '0 0 220px',
                fontFamily:    "'Archivo Black', sans-serif",
                fontSize:      '13px',
                color:         '#336065',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize:   '16px',
                color:      '#2e2d32',
                lineHeight: 1.6,
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section style={{ padding: '0 10vw 80px' }}>
        <p style={{
          fontFamily:  "'Inter', sans-serif",
          fontWeight:  300,
          fontSize:    '16px',
          color:       '#a2a0a2',
          lineHeight:  1.8,
        }}>
          Gold Cannes Lions<br />
          Australian Life Photographic Prize
        </p>
      </section>

      {/* Client logos placeholder */}
      <section style={{ padding: '0 10vw 100px' }}>
        <div style={{
          display:        'flex',
          gap:            '3rem',
          flexWrap:       'wrap',
          alignItems:     'center',
        }}>
          {['Client 01', 'Client 02', 'Client 03', 'Client 04', 'Client 05'].map(c => (
            <div key={c} style={{
              fontFamily:    "'Archivo Black', sans-serif",
              fontSize:      '12px',
              color:         '#c8c8c8',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition:    'color 0.2s ease',
              cursor:        'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#2e2d32' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#c8c8c8' }}
            >
              {c}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
