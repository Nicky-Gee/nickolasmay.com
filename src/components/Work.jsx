import img1 from '../assets/images/noosa-tourism.jpg'
import img2 from '../assets/images/elysian-retreat.jpg'
import img3 from '../assets/images/mirage-whitsundays.jpg'
import img4 from '../assets/images/finca-la-torre.jpg'
import img5 from '../assets/images/kakadu-tourism.jpg'
import img6 from '../assets/images/cavan-station.jpg'

const works = [
  { src: img1, title: 'Noosa Tourism',        category: 'TOURISM' },
  { src: img2, title: 'Elysian Eco Resort',   category: 'HOSPITALITY' },
  { src: img3, title: 'Mirage Whitsundays',   category: 'HOSPITALITY' },
  { src: img4, title: 'Finca La Torre',       category: 'COMMERCIAL' },
  { src: img5, title: 'Kakadu Tourism',       category: 'TOURISM' },
  { src: img6, title: 'Cavan Merino Station', category: 'RURAL COMMERCIAL' },
]

export default function Work() {
  return (
    <section
      id="work"
      style={{
        position: 'relative',
        height: `${works.length * 100}vh`,
      }}
    >
      {works.map((w, i) => (
        <div
          key={i}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            zIndex: i + 1,
          }}
        >
          {/* Full-bleed image */}
          <img
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

          {/* Overlay */}
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
    </section>
  )
}
