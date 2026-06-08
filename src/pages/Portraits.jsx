import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PlaceholderImage from '../components/PlaceholderImage'
import Lightbox from '../components/Lightbox'
import { portraitImages } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Portraits() {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.masonry-item')
    if (!items?.length) return

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0, y: 40,
        duration: 0.7, ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div style={{ paddingTop: '64px', background: '#ffffff', minHeight: '100vh' }}>
        {/* Page heading */}
        <div style={{ padding: '60px 10vw 40px' }}>
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: '#2e2d32',
            letterSpacing: '0.04em',
          }}>
            PORTRAITS
          </h1>
        </div>

        {/* Masonry grid — 3 col desktop, CSS columns */}
        <div
          ref={gridRef}
          style={{
            columns: '3',
            columnGap: '4px',
            padding: '0 4px 4px',
          }}
          className="masonry-grid"
        >
          {portraitImages.map((img, i) => (
            <MasonryItem
              key={img.id}
              img={img}
              onClick={() => setLightboxIdx(i)}
            />
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={portraitImages}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => Math.max(0, i - 1))}
          onNext={() => setLightboxIdx(i => Math.min(portraitImages.length - 1, i + 1))}
        />
      )}
    </>
  )
}

function MasonryItem({ img, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="masonry-item"
      data-cursor="image"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        breakInside:   'avoid',
        marginBottom:  '4px',
        display:       'block',
        position:      'relative',
        overflow:      'hidden',
        cursor:        'none',
      }}
    >
      <div style={{
        aspectRatio: img.aspect,
        transform:   hovered ? 'scale(1.03)' : 'scale(1)',
        transition:  'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <PlaceholderImage label={img.label} style={{ height: '100%' }} />
      </div>

      {/* Subtle white vignette on hover */}
      <div style={{
        position:   'absolute',
        inset:      0,
        boxShadow:  hovered ? 'inset 0 0 40px rgba(255,255,255,0.18)' : 'none',
        transition: 'box-shadow 0.3s ease',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
