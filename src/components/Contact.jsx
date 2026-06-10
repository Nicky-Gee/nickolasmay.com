export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        background:    '#0A0A0A',
        padding:       '120px 6vw 80px',
        display:       'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        minHeight:     '80vh',
      }}
    >
      {/* Three-line statement */}
      <div>
        {[
          'Real Creative Experience.',
          'Modern AI Workflows.',
          'Cinematic Commercial Results.',
        ].map(line => (
          <h2
            key={line}
            style={{
              fontFamily:    "'Bebas Neue', sans-serif",
              fontWeight:    400,
              fontSize:      '7vw',
              color:         '#F2EFE9',
              letterSpacing: '0.02em',
              lineHeight:    1.05,
              margin:        0,
              textAlign:     'left',
            }}
          >
            {line}
          </h2>
        ))}
      </div>

      {/* Email + Instagram — bottom left */}
      <div style={{ display: 'flex', gap: '48px', marginTop: '60px' }}>
        <a
          href="mailto:nick@nickolasmay.com"
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    300,
            fontSize:      '12px',
            letterSpacing: '0.3em',
            color:         '#F2EFE9',
            textDecoration:'none',
            textTransform: 'uppercase',
            opacity:       0.7,
          }}
        >
          nick@nickolasmay.com
        </a>
        <a
          href="https://www.instagram.com/nickolas_may_"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    300,
            fontSize:      '12px',
            letterSpacing: '0.3em',
            color:         '#F2EFE9',
            textDecoration:'none',
            textTransform: 'uppercase',
            opacity:       0.7,
          }}
        >
          Instagram
        </a>
      </div>
    </section>
  )
}
