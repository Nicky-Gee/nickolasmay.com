import { useEffect, useCallback } from 'react'
import PlaceholderImage from './PlaceholderImage'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft')  onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const img = images[currentIndex]

  return (
    <div
      onClick={onClose}
      style={{
        position:        'fixed',
        inset:           0,
        background:      '#0a0a0a',
        zIndex:          9000,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth:  '90vw',
          maxHeight: '90vh',
          position:  'relative',
        }}
      >
        <div style={{ width: '80vmin', aspectRatio: img.aspect ?? '2/3' }}>
          <PlaceholderImage label={img.label} />
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position:   'absolute',
          top:        '28px',
          right:      '32px',
          background: 'none',
          border:     'none',
          color:      '#ffffff',
          fontSize:   '28px',
          fontWeight: 300,
          cursor:     'none',
          lineHeight: 1,
        }}
      >
        ✕
      </button>

      {/* Prev */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          style={{
            position:   'absolute',
            left:       '32px',
            top:        '50%',
            transform:  'translateY(-50%)',
            background: 'none',
            border:     'none',
            color:      '#ffffff',
            fontSize:   '24px',
            cursor:     'none',
            opacity:    0.7,
          }}
        >
          ←
        </button>
      )}

      {/* Next */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          style={{
            position:   'absolute',
            right:      '80px',
            top:        '50%',
            transform:  'translateY(-50%)',
            background: 'none',
            border:     'none',
            color:      '#ffffff',
            fontSize:   '24px',
            cursor:     'none',
            opacity:    0.7,
          }}
        >
          →
        </button>
      )}
    </div>
  )
}
