import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTransition } from '../context/TransitionContext'
import PlaceholderImage from '../components/PlaceholderImage'
import { projects } from '../data/projects'

export default function ProjectPage() {
  const { slug }        = useParams()
  const { transitionTo } = useTransition()

  const project = projects.find(p => p.slug === slug)
  const idx     = projects.findIndex(p => p.slug === slug)
  const next    = projects[(idx + 1) % projects.length]

  if (!project) {
    return (
      <div style={{ padding: '20vh 10vw', fontFamily: "'Inter', sans-serif" }}>
        Project not found.
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <PlaceholderImage label={project.title} style={{ height: '100%' }} />
        <div style={{ position: 'absolute', bottom: '60px', left: '10vw' }}>
          <div style={{ width: '80px', height: '2px', background: '#ffffff', marginBottom: '16px' }} />
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(36px,5vw,64px)',
            color: '#ffffff', letterSpacing: '0.04em',
          }}>
            {project.title.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Content: 60/40 split */}
      <div style={{
        display: 'flex', gap: 0, background: '#ffffff',
        padding: '80px 0', minHeight: '60vh',
      }}>
        {/* Left: stacked images */}
        <div style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ aspectRatio: '3/2' }}>
              <PlaceholderImage label={`${project.title} — ${n}`} style={{ height: '100%' }} />
            </div>
          ))}
        </div>

        {/* Right: sticky info panel */}
        <div style={{
          flex: 1, padding: '0 5vw',
          position: 'sticky', top: '80px', alignSelf: 'flex-start',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {[
              ['Client',   project.client],
              ['Services', project.services],
              ['Year',     project.year],
              ['Location', project.location],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Archivo Black', sans-serif", fontSize: '11px',
                  color: '#336065', textTransform: 'uppercase', letterSpacing: '0.15em',
                  marginBottom: '6px',
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '16px',
                  color: '#2e2d32', lineHeight: 1.5,
                }}>
                  {value}
                </div>
              </div>
            ))}
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '16px',
              color: '#a2a0a2', lineHeight: 1.8, marginTop: '8px', maxWidth: '340px',
            }}>
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Next project teaser */}
      <NextProject project={next} transitionTo={transitionTo} />
    </>
  )
}

function NextProject({ project, transitionTo }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      data-cursor="image"
      onClick={() => transitionTo(`/commissioned/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', height: '50vh', cursor: 'none' }}
    >
      <div style={{
        height: '100%',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <PlaceholderImage label={project.title} style={{ height: '100%' }} />
      </div>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '12px',
        background: 'rgba(0,0,0,0.25)',
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '13px',
          color: '#ffffff', letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          Next Project
        </span>
        <span style={{
          fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(24px,4vw,48px)',
          color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          {project.title}
        </span>
      </div>
    </div>
  )
}
