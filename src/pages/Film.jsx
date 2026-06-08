import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import PlaceholderImage from '../components/PlaceholderImage'
import { filmProjects } from '../data/projects'

function FilmCard({ film, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      data-cursor="video"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'none', aspectRatio: '16/9' }}
    >
      <div style={{
        height: '100%',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <PlaceholderImage label={film.title} style={{ height: '100%' }} />
      </div>

      {/* Minimal play icon */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none',
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 0, height: 0,
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
            borderLeft: '16px solid rgba(255,255,255,0.85)',
            marginLeft: '4px',
          }} />
        </div>
      </div>
    </div>
  )
}

export default function Film() {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  return (
    <section style={{ background: '#2e2d32', minHeight: '100vh', paddingTop: '64px' }}>

      {/* Hero heading */}
      <h1 style={{
        fontFamily: "'Archivo Black', sans-serif",
        fontSize: 'clamp(60px, 20vw, 200px)',
        color: '#ffffff', lineHeight: 0.85, letterSpacing: '0.01em',
        paddingLeft: '10vw', paddingTop: '60px', paddingBottom: '48px',
      }}>
        FILM
      </h1>

      {/* Featured reel */}
      <div data-cursor="video" style={{ width: '100%', position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          src="https://player.vimeo.com/video/1034885005?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Nickolas May Film Reel"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      {/* 2-column film grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '4px', padding: '4px', marginTop: '4px',
      }}>
        {filmProjects.map((film, i) => (
          <FilmCard key={film.slug} film={film} onClick={() => setLightboxIdx(i)} />
        ))}
      </div>

      {lightboxIdx !== null && (
        <FilmLightbox
          film={filmProjects[lightboxIdx]}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </section>
  )
}

function FilmLightbox({ film, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: '#0a0a0a',
        zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '80vw', maxWidth: '1200px', aspectRatio: '16/9', position: 'relative' }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${film.vimeoId}?autoplay=1`}
          allow="autoplay; fullscreen"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '28px', right: '32px',
          background: 'none', border: 'none', color: '#ffffff',
          fontSize: '28px', cursor: 'none',
        }}
      >
        ✕
      </button>
    </div>
  )
}
