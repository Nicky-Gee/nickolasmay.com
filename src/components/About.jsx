import portrait from '../assets/images/nick-portrait.jpg'

export default function About() {
  return (
    <section
      id="about"
      data-theme="light"
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left — portrait, full 50vw, 100vh */}
      <div style={{
        flex: '0 0 50vw',
        width: '50vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={portrait}
          alt="Nickolas May"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
      </div>

      {/* Right — #F2EFE9 background, text vertically centred */}
      <div style={{
        flex: '1',
        background: '#F2EFE9',
        display: 'flex',
        alignItems: 'center',
        padding: '0 7vw',
      }}>
        <div style={{ maxWidth: '480px' }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: '5vw',
            color: '#1C1C1C',
            letterSpacing: '0.03em',
            margin: '0 0 28px',
            lineHeight: 1,
          }}>
            Nickolas May
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '17px',
            lineHeight: 1.8,
            color: '#1C1C1C',
            margin: 0,
          }}>
            Gold Cannes Lions Winner. 17 years experience creating high-end commercial work across Australia and internationally for brands including Qantas, Tourism Whitsundays and Chang Beer. Crafting cinematic film and photography through a blend of traditional production experience and AI-enhanced workflows.
          </p>
        </div>
      </div>
    </section>
  )
}
