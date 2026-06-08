import { useEffect, useRef } from 'react'

/*
  Custom cursor — equilateral triangle, point facing up.
  Hot-point: top apex tracks mouse at lerp 0.08.

  States
  ──────
  default  12px  filled teal, no dot
  link     24px  filled teal, no dot
  image    48px  stroke-only (2px teal) + inner dot (centroid) + "VIEW" below
  video    48px  stroke-only (2px teal) + inner dot (centroid) + "PLAY" below

  All sizing via CSS scale() from a single 48px SVG — scale animates from
  the apex (transform-origin: top-centre) so expansion radiates downward.
  Fill ↔ outline transitions use fill-opacity / stroke-opacity (CSS-animatable).
*/

const TEAL = '#336065'

const SIZE = { default: 12, link: 24, image: 48, video: 48 }

// Equilateral triangle pointing up: top-apex at (w/2, 0)
function triPoints(size) {
  const h = size * 0.866
  return `${size / 2},0 0,${h} ${size},${h}`
}

// Centroid of triangle (48×41.57 SVG user-space)
const MAX    = SIZE.image          // 48
const SVG_H  = MAX * 0.866         // 41.57
const CX     = MAX / 2             // 24
const CY     = (SVG_H * 2) / 3    // 27.71 — centroid Y
const DOT_R  = 3.5                 // radius in SVG units at scale 1.0

export default function CustomCursor() {
  const wrapRef  = useRef(null)   // outer — translate to cursor pos
  const innerRef = useRef(null)   // inner — CSS scale from apex
  const polyRef  = useRef(null)   // triangle polygon
  const dotRef   = useRef(null)   // inner circle dot
  const labelRef = useRef(null)   // VIEW / PLAY text

  const posRef    = useRef({ x: -200, y: -200 })
  const targetRef = useRef({ x: -200, y: -200 })
  const stateRef  = useRef('default')
  const frameRef  = useRef(null)

  function applyState(type) {
    if (stateRef.current === type) return
    stateRef.current = type

    const size       = SIZE[type] ?? SIZE.default
    const isExpanded = type === 'image' || type === 'video'
    const scale      = size / MAX

    // Size via CSS scale from apex
    innerRef.current.style.transform = `scale(${scale})`

    // Fill ↔ outline — transition on opacity only (CSS-animatable in SVG)
    polyRef.current.style.fillOpacity   = isExpanded ? '0' : '1'
    polyRef.current.style.strokeOpacity = isExpanded ? '1' : '0'
    // Compensate stroke width for CSS scale so it always appears as ~2px visually
    polyRef.current.style.strokeWidth   = `${2 / scale}`

    // Inner dot — visible only when expanded
    if (dotRef.current) {
      dotRef.current.style.opacity = isExpanded ? '1' : '0'
      // Compensate dot radius for scale so it stays visually ~3.5px
      dotRef.current.setAttribute('r', DOT_R / scale)
    }

    // Label
    if (labelRef.current) {
      labelRef.current.textContent   = type === 'video' ? 'PLAY' : 'VIEW'
      labelRef.current.style.opacity = isExpanded ? '1' : '0'
    }
  }

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const lerp = (a, b, t) => a + (b - a) * t

    const onMouseMove = (e) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
    }

    const resolveState = (el) => {
      if (!el) return 'default'
      if (el.closest('[data-cursor="image"]')) return 'image'
      if (el.closest('[data-cursor="video"]')) return 'video'
      if (el.closest('a, button, [role="button"]')) return 'link'
      return 'default'
    }

    const onMouseOver = (e) => applyState(resolveState(e.target))

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })

    const tick = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.08)
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.08)

      if (wrapRef.current) {
        // Position so top apex sits exactly at cursor point
        wrapRef.current.style.transform =
          `translate(${posRef.current.x - MAX / 2}px, ${posRef.current.y}px)`
      }

      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(frameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Skip render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        pointerEvents: 'none',
        userSelect:    'none',
        zIndex:        9999,
        willChange:    'transform',
        transform:     'translate(-200px, -200px)',
      }}
    >
      {/* innerRef: CSS scale animates from the apex downward */}
      <div
        ref={innerRef}
        style={{
          transformOrigin: `${MAX / 2}px 0`,
          transform:       `scale(${SIZE.default / MAX})`,
          transition:      'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          gap:             '6px',
        }}
      >
        <svg
          ref={useRef(null)}
          width={MAX}
          height={SVG_H}
          viewBox={`0 0 ${MAX} ${SVG_H}`}
          style={{ overflow: 'visible', display: 'block' }}
        >
          {/* Triangle */}
          <polygon
            ref={polyRef}
            points={triPoints(MAX)}
            style={{
              fill:          TEAL,
              fillOpacity:   '1',
              stroke:        TEAL,
              strokeWidth:   `${2 / (SIZE.default / MAX)}`,  // compensated for initial scale
              strokeOpacity: '0',
              strokeLinejoin:'round',
              transition:    'fill-opacity 0.25s ease, stroke-opacity 0.25s ease',
            }}
          />

          {/* Inner circle dot — centred at triangle centroid */}
          <circle
            ref={dotRef}
            cx={CX}
            cy={CY}
            r={DOT_R / (SIZE.default / MAX)}  // compensated for initial scale
            style={{
              fill:       TEAL,
              opacity:    '0',
              transition: 'opacity 0.25s ease',
              pointerEvents: 'none',
            }}
          />
        </svg>

        {/* VIEW / PLAY label — always in DOM, opacity-toggled */}
        <span
          ref={labelRef}
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      '9px',
            fontWeight:    300,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         '#ffffff',
            opacity:       0,
            transition:    'opacity 0.2s ease',
            lineHeight:    1,
            whiteSpace:    'nowrap',
          }}
        >
          VIEW
        </span>
      </div>
    </div>
  )
}
