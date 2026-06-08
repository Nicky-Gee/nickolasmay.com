import { useState } from 'react'

export default function ContactStrip() {
  const [hovered, setHovered] = useState(false)

  return (
    <section
      style={{
        background:      '#336065',
        padding:         '80px 0',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             '20px',
        textAlign:       'center',
      }}
    >
      <h2
        style={{
          fontFamily:    "'Archivo Black', sans-serif",
          fontSize:      'clamp(36px, 6vw, 72px)',
          color:         '#ffffff',
          letterSpacing: '0.03em',
          lineHeight:    1,
        }}
      >
        LET'S MAKE SOMETHING.
      </h2>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize:   '18px',
          color:      'rgba(255,255,255,0.75)',
          lineHeight: 1.6,
        }}
      >
        Based on the Sunshine Coast. Working globally.
      </p>

      <a
        href="mailto:nick@nickolasmay.com"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily:      "'Archivo Black', sans-serif",
          fontSize:        '20px',
          color:           '#ffffff',
          textDecoration:  hovered ? 'underline' : 'none',
          textUnderlineOffset: '4px',
          letterSpacing:   '0.03em',
          cursor:          'none',
          marginTop:       '8px',
        }}
      >
        nick@nickolasmay.com
      </a>
    </section>
  )
}
