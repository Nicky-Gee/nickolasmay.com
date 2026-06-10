import { useEffect, useRef, useState } from 'react'
import heroVideo from '../assets/video/hero-web.mp4'

const WORDS = ['FILMMAKER', 'PHOTOGRAPHER', 'AI DIRECTOR']

export default function Hero() {
  const videoRef = useRef()
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % WORDS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted={true}
        loop
        playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />

      {/* Nav — top right */}
      <nav style={{ position: 'absolute', top: 0, right: 0, padding: '36px 6vw', zIndex: 10 }}>
        <ul style={{ display: 'flex', gap: '48px', listStyle: 'none', margin: 0, padding: 0 }}>
          {['WORK', 'ABOUT', 'CONTACT'].map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  letterSpacing: '0.25em',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Name + cycling subtitle — bottom left */}
      <div style={{ position: 'absolute', bottom: '12vh', left: '6vw', zIndex: 10, textAlign: 'left' }}>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontWeight: 400,
          fontSize: '18vw',
          lineHeight: 0.9,
          color: '#fff',
          letterSpacing: '0.02em',
          margin: 0,
          whiteSpace: 'nowrap',
          textAlign: 'left',
          display: 'block',
        }}>
          NICKOLAS MAY
        </h1>

        {/* Cycling subtitle — key forces remount → fresh animation every swap */}
        <div style={{ overflow: 'hidden', marginTop: '0.6vw' }}>
          <p
            key={wordIndex}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: '5vw',
              color: '#fff',
              letterSpacing: '0.15em',
              margin: 0,
              animation: 'wordSlideIn 0.25s cubic-bezier(0.22,1,0.36,1) forwards',
            }}
          >
            {WORDS[wordIndex]}
          </p>
        </div>
      </div>

      {/* Award credential — bottom left, lower */}
      <p style={{
        position: 'absolute',
        bottom: '4vh',
        left: '6vw',
        zIndex: 10,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        fontSize: '11px',
        letterSpacing: '0.4em',
        color: 'rgba(255,255,255,0.6)',
        margin: 0,
        textTransform: 'uppercase',
      }}>
        Gold Cannes Lions Winner
      </p>
    </div>
  )
}
