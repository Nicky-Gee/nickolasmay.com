import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PlaceholderImage from './PlaceholderImage'

gsap.registerPlugin(ScrollTrigger)

export default function AboutStrip() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from(rightRef.current, {
        x: 60, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background:   '#ffffff',
        padding:      '100px 0',
        display:      'flex',
        gap:          0,
        overflow:     'hidden',
      }}
    >
      {/* Left: portrait */}
      <div
        ref={leftRef}
        style={{
          flex:     '0 0 45%',
          minHeight:'560px',
          overflow: 'hidden',
          display:  'none',
        }}
      >
        <PlaceholderImage label="Nickolas May — Portrait" style={{ height: '100%' }} />
      </div>

      {/* Right: content */}
      <div
        ref={rightRef}
        style={{
          flex:           1,
          padding:        '0 6vw',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          gap:            '24px',
        }}
      >
        <span
          style={{
            fontFamily:    "'Archivo Black', sans-serif",
            fontSize:      '13px',
            color:         '#a2a0a2',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          About
        </span>

        <h2
          style={{
            fontFamily:    "'Archivo Black', sans-serif",
            fontSize:      'clamp(28px, 3.5vw, 48px)',
            color:         '#2e2d32',
            lineHeight:    1.1,
            letterSpacing: '0.02em',
            maxWidth:      '520px',
          }}
        >
          NICKOLAS MAY IS AN AWARD-WINNING PHOTOGRAPHER AND FILMMAKER.
        </h2>

        <p
          style={{
            fontFamily:  "'Inter', sans-serif",
            fontWeight:  300,
            fontSize:    '17px',
            color:       '#a2a0a2',
            lineHeight:  1.8,
            maxWidth:    '440px',
          }}
        >
          Gold Cannes Lions. Australian Life Photographic Prize.
        </p>

        {/* Stats */}
        <div
          style={{
            display:   'flex',
            gap:       '3rem',
            marginTop: '16px',
          }}
        >
          {[
            { num: '14', label: 'Years Independent' },
            { num: '3',  label: 'Brands' },
            { num: '1',  label: 'Gold Cannes Lion' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily:    "'Archivo Black', sans-serif",
                  fontSize:      'clamp(40px, 6vw, 72px)',
                  color:         '#2e2d32',
                  lineHeight:    1,
                  letterSpacing: '-0.01em',
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontWeight:    300,
                  fontSize:      '13px',
                  color:         '#a2a0a2',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop:     '6px',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
