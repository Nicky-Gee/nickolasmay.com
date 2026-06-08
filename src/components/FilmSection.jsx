import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTransition } from '../context/TransitionContext'

gsap.registerPlugin(ScrollTrigger)

export default function FilmSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const { transitionTo } = useTransition()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0, y: 50,
        duration: 0.9, ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start:   'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#2e2d32',
        padding:    '80px 0 60px',
      }}
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        style={{
          fontFamily:    "'Archivo Black', sans-serif",
          fontSize:      'clamp(72px, 14vw, 140px)',
          color:         '#ffffff',
          marginLeft:    '10vw',
          marginBottom:  '40px',
          lineHeight:    0.9,
          letterSpacing: '0.02em',
        }}
      >
        FILM
      </h2>

      {/* Vimeo embed — full-width 16:9 */}
      <div
        data-cursor="video"
        style={{
          position:    'relative',
          width:       '100%',
          paddingTop:  '56.25%', /* 16:9 */
          overflow:    'hidden',
        }}
      >
        <iframe
          src="https://player.vimeo.com/video/1034885005?background=1&autoplay=0&loop=1&muted=1&byline=0&title=0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Nickolas May Film"
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            border: 'none',
          }}
        />
      </div>

      {/* Sub-label */}
      <p
        style={{
          fontFamily:    "'Inter', sans-serif",
          fontWeight:    300,
          fontSize:      '16px',
          color:         '#a2a0a2',
          marginLeft:    '10vw',
          marginTop:     '28px',
          letterSpacing: '0.05em',
        }}
      >
        Commercial · Documentary · Social
      </p>

      {/* CTA */}
      <div style={{ textAlign: 'right', paddingRight: '10vw', marginTop: '24px' }}>
        <button
          onClick={() => transitionTo('/film')}
          style={{
            background:    'none', border: 'none', padding: 0,
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    300,
            fontSize:      '14px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         '#336065',
            cursor:        'none',
          }}
        >
          VIEW ALL FILM WORK →
        </button>
      </div>
    </section>
  )
}
