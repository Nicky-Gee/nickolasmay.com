import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef()
  const labelRef  = useRef()
  const targetRef = useRef({ x: 0, y: 0 })
  const posRef    = useRef({ x: 0, y: 0 })
  const sizeRef   = useRef(40)
  const targetSz  = useRef(40)
  const frameRef  = useRef()
  const hasMovedRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = (e) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY

      // Reveal on first move
      if (!hasMovedRef.current) {
        hasMovedRef.current = true
        posRef.current.x = e.clientX
        posRef.current.y = e.clientY
        if (cursorRef.current) cursorRef.current.style.opacity = '1'
      }

      // Colour: white on dark, #1C1C1C on light sections
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isLight = el && el.closest('[data-theme="light"]')
      const colour  = isLight ? '#1C1C1C' : '#ffffff'
      if (cursorRef.current) {
        cursorRef.current.style.borderColor = colour
      }
      if (labelRef.current) {
        labelRef.current.style.color = colour
      }

      // Expand on images / interactive elements
      const hoverable = el && (
        el.closest('[data-cursor="image"]') ||
        el.closest('img') ||
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[role="button"]')
      )
      targetSz.current = hoverable ? 80 : 40
      if (labelRef.current) {
        labelRef.current.style.opacity = hoverable ? '1' : '0'
      }
    }

    const tick = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12)
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12)
      sizeRef.current  = lerp(sizeRef.current, targetSz.current, 0.12)

      if (cursorRef.current) {
        const s = sizeRef.current
        cursorRef.current.style.left   = `${posRef.current.x}px`
        cursorRef.current.style.top    = `${posRef.current.y}px`
        cursorRef.current.style.width  = `${s}px`
        cursorRef.current.style.height = `${s}px`
      }

      frameRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        width:          '40px',
        height:         '40px',
        border:         '1.5px solid #ffffff',
        pointerEvents:  'none',
        zIndex:         9999,
        transform:      'translate(-50%, -50%)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        opacity:        0,
        willChange:     'left, top, width, height',
      }}
    >
      <span
        ref={labelRef}
        style={{
          fontFamily:    "'Inter', sans-serif",
          fontWeight:    400,
          fontSize:      '9px',
          letterSpacing: '0.2em',
          color:         '#ffffff',
          opacity:       0,
          transition:    'opacity 0.15s ease',
          userSelect:    'none',
          whiteSpace:    'nowrap',
        }}
      >
        VIEW
      </span>
    </div>
  )
}
