import { useState } from 'react'
import { useTransition } from '../context/TransitionContext'
import PlaceholderImage from './PlaceholderImage'

// Map project slugs to provided image filenames
const IMAGE_MAP = {
  'tourism-noosa':       new URL('../assets/images/noosa-tourism.jpg', import.meta.url).href,
  'elysian-retreat':     new URL('../assets/images/elysian-retreat.jpg', import.meta.url).href,
  'mirage-whitsundays':  new URL('../assets/images/mirage-whitsundays.jpg', import.meta.url).href,
  'finca-la-torre':      new URL('../assets/images/finca-la-torre.jpg', import.meta.url).href,
  'ingenia-lifestyle-drift': null, // image not provided
  'kakadu-tourism':      new URL('../assets/images/kakadu-tourism.jpg', import.meta.url).href,
  'cavan':               new URL('../assets/images/cavan-station.jpg', import.meta.url).href,
}

/*
  Asymmetric layout — MANDATORY, no equal-sized cards.

  Row A (height: 70vh)
    Left  65%: project[0]
    Right 35%: project[1]

  Row B (height: 100vh)
    Left  35%  column: project[2] (50vh) stacked over project[3] (50vh)
    Right 65%: project[4]

  6th project (if present) in a full-width Row C
*/

function ProjectCard({ project, heightStyle, wide = false }) {
  const [hovered, setHovered] = useState(false)
  const { transitionTo } = useTransition()

  return (
    <div
      data-cursor="image"
      onClick={() => transitionTo(`/commissioned/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:   'relative',
        overflow:   'hidden',
        flexShrink: 0,
        width:      wide ? '100%' : undefined,
        ...heightStyle,
      }}
    >
      {/* Image (placeholder scales on hover — overflow:hidden on parent clips it) */}
        <div
        style={{
          width:      '100%',
          height:     '100%',
          transform:  hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {IMAGE_MAP[project.slug] ? (
          <img
            src={IMAGE_MAP[project.slug]}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <PlaceholderImage label={project.title} />
        )}
      </div>

      {/* Teal overlay + title — ON image, never below */}
      <div
        style={{
          position:       'absolute',
          inset:          0,
          background:     'rgba(0,0,0,0.35)',
          opacity:        hovered ? 1 : 0,
          transition:     'opacity 0.3s ease',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          pointerEvents:  'none',
        }}
      >
        <span
          style={{
            fontFamily:    "'Archivo Black', sans-serif",
            fontSize:      '24px',
            color:         '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign:     'center',
            padding:       '0 2rem',
          }}
        >
          {project.title}
        </span>
      </div>
    </div>
  )
}

export default function WorkGrid({ projects }) {
  const { transitionTo } = useTransition()

  const GAP = '4px'

  return (
    <section style={{ background: '#ffffff', padding: 0 }}>

      {/* Row A */}
      <div style={{ display: 'flex', gap: GAP }}>
        <div style={{ flex: '0 0 65%' }}>
          <ProjectCard project={projects[0]} heightStyle={{ height: '70vh' }} />
        </div>
        <div style={{ flex: 1 }}>
          <ProjectCard project={projects[1]} heightStyle={{ height: '70vh' }} />
        </div>
      </div>

      {/* Row B */}
      <div style={{ display: 'flex', gap: GAP, marginTop: GAP }}>
        {/* Left: 2 stacked */}
        <div
          style={{
            flex:          '0 0 35%',
            display:       'flex',
            flexDirection: 'column',
            gap:           GAP,
          }}
        >
          <ProjectCard project={projects[2]} heightStyle={{ height: '50vh' }} />
          <ProjectCard project={projects[3]} heightStyle={{ height: '50vh' }} />
        </div>
        {/* Right: 1 tall */}
        <div style={{ flex: 1 }}>
          <ProjectCard project={projects[4]} heightStyle={{ height: '100vh' }} />
        </div>
      </div>

      {/* Row C — 6th project, full width */}
      {projects[5] && (
        <div style={{ marginTop: GAP }}>
          <ProjectCard project={projects[5]} heightStyle={{ height: '45vh' }} wide />
        </div>
      )}

      {/* CTA */}
      <div
        style={{
          padding:    '3rem 0 4rem',
          textAlign:  'left',
          paddingLeft:'10vw',
        }}
      >
        <button
          onClick={() => transitionTo('/commissioned')}
          style={{
            background:    'none', border: 'none', padding: 0,
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    300,
            fontSize:      '14px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         '#2e2d32',
            cursor:        'none',
          }}
        >
          VIEW ALL WORK →
        </button>
      </div>
    </section>
  )
}
