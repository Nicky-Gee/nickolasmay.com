import { useState } from 'react'
import { useTransition } from '../context/TransitionContext'
import PlaceholderImage from '../components/PlaceholderImage'
import { projects, CATEGORIES } from '../data/projects'

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const { transitionTo } = useTransition()

  return (
    <div
      data-cursor="image"
      onClick={() => transitionTo(`/commissioned/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'none' }}
    >
      <div
        style={{
          aspectRatio: '3/2',
          transform:   hovered ? 'scale(1.03)' : 'scale(1)',
          transition:  'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <PlaceholderImage label={project.title} style={{ height: '100%' }} />
      </div>
      <div
        style={{
          position:   'absolute', inset: 0,
          background: 'rgba(51,96,101,0.18)',
          opacity:    hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display:    'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontFamily: "'Archivo Black', sans-serif", fontSize: '22px',
          color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em',
          textAlign: 'center', padding: '0 1.5rem',
        }}>
          {project.title}
        </span>
      </div>
    </div>
  )
}

export default function Commissioned() {
  const [active, setActive] = useState('ALL')

  const filtered = active === 'ALL'
    ? projects
    : projects.filter(p => p.category.toUpperCase() === active)

  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <PlaceholderImage label="Commissioned — Hero" style={{ height: '100%' }} />
        {/* White line + title, bottom-left */}
        <div style={{ position: 'absolute', bottom: '60px', left: '10vw' }}>
          <div style={{ width: '80px', height: '2px', background: '#ffffff', marginBottom: '16px' }} />
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(40px,6vw,72px)',
            color: '#ffffff', letterSpacing: '0.04em', lineHeight: 1,
          }}>
            COMMISSIONED
          </h1>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        background: '#ffffff', padding: '32px 10vw', display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
        borderBottom: '1px solid #f0f0f0',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              background: 'none', border: 'none', padding: '0 0 4px',
              fontFamily: "'Inter', sans-serif", fontWeight: 300,
              fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: active === cat ? '#336065' : '#a2a0a2',
              borderBottom: active === cat ? '1px solid #336065' : '1px solid transparent',
              cursor: 'none', transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asymmetric grid */}
      <div style={{ background: '#f4f4f4', padding: '4px' }}>
        {/* Row A */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
          {filtered[0] && (
            <div style={{ flex: '0 0 65%' }}>
              <ProjectCard project={filtered[0]} />
            </div>
          )}
          {filtered[1] && (
            <div style={{ flex: 1 }}>
              <ProjectCard project={filtered[1]} />
            </div>
          )}
        </div>

        {/* Row B */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
          <div style={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filtered[2] && <ProjectCard project={filtered[2]} />}
            {filtered[3] && <ProjectCard project={filtered[3]} />}
          </div>
          {filtered[4] && (
            <div style={{ flex: 1 }}>
              <ProjectCard project={filtered[4]} />
            </div>
          )}
        </div>

        {/* Remaining projects in pairs */}
        {filtered.slice(5).reduce((rows, p, i) => {
          if (i % 2 === 0) rows.push([p])
          else rows[rows.length - 1].push(p)
          return rows
        }, []).map((pair, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
            <div style={{ flex: ri % 2 === 0 ? '0 0 40%' : '0 0 60%' }}>
              <ProjectCard project={pair[0]} />
            </div>
            {pair[1] && (
              <div style={{ flex: 1 }}>
                <ProjectCard project={pair[1]} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
