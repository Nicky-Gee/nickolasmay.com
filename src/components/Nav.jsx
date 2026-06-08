import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { useTransition } from '../context/TransitionContext'

// Logo assets (provided)
const logoTeal = new URL('../assets/logos/logo-teal.png', import.meta.url).href
const logoDark = new URL('../assets/logos/logo-dark.png', import.meta.url).href

const LINKS = [
  { label: 'Work',    path: '/commissioned' },
  { label: 'Film',    path: '/film' },
  { label: 'About',  path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { transitionTo }            = useTransition()
  const location                    = useLocation()
  const linksRef                    = useRef([])
  const wordmarkRef                 = useRef(null)

  const isHome         = location.pathname === '/'
  const isHeroOverlay  = isHome && !scrolled

  // Scroll detection — triggers nav background at 85% of hero height
  useEffect(() => {
    const heroH    = window.innerHeight
    const onScroll = () => setScrolled(window.scrollY > heroH * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entry animation — home page only, fires once on mount
  useEffect(() => {
    if (!isHome) return
    const els = [wordmarkRef.current, ...linksRef.current].filter(Boolean)
    gsap.from(els, {
      opacity:  0,
      y:        -6,
      duration: 0.55,
      ease:     'power2.out',
      stagger:  0.08,
      delay:    0.8,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const go = (path) => {
    setMobileOpen(false)
    transitionTo(path)
  }

  // Over dark hero: white links. Past hero: dark links.
  const linkColor = isHeroOverlay ? 'rgba(255,255,255,0.85)' : '#2e2d32'
  const lineColor = isHeroOverlay ? '#ffffff' : '#2e2d32'

  return (
    <>
      <nav
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         1000,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 2.5rem',
          height:         '64px',
          background:     scrolled ? '#ffffff' : 'transparent',
          borderBottom:   scrolled ? '1px solid #f0f0f0' : 'none',
          transition:     'background 0.35s ease, border-color 0.35s ease',
        }}
      >
        <button
          ref={wordmarkRef}
          onClick={() => go('/')}
          style={{
            background: 'none',
            border:     'none',
            padding:    0,
            cursor:     'none',
          }}
        >
          <img
            src={scrolled ? logoDark : logoTeal}
            alt="NICKOLAS MAY"
            style={{
              height: '18px',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </button>

        {/* Desktop links */}
        <ul
          style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="nav-desktop"
        >
          {LINKS.map(({ label, path }, i) => (
            <li key={path} ref={el => { linksRef.current[i] = el }}>
              <NavLink label={label} path={path} baseColor={linkColor} go={go} />
            </li>
          ))}
        </ul>

        {/* Mobile hamburger — 2 lines */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Menu"
          style={{
            background:    'none',
            border:        'none',
            padding:       '4px',
            display:       'none',
            flexDirection: 'column',
            gap:           '6px',
            cursor:        'none',
          }}
          className="nav-hamburger"
        >
          <span style={{ display: 'block', width: '24px', height: '1px', background: lineColor }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: lineColor }} />
        </button>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        style={{
          position:       'fixed',
          inset:          0,
          background:     '#2e2d32',
          zIndex:         999,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '2.5rem',
          transform:      mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition:     'transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        {LINKS.map(({ label, path }) => (
          <button
            key={path}
            onClick={() => go(path)}
            style={{
              background:    'none',
              border:        'none',
              fontFamily:    "'Archivo Black', sans-serif",
              fontSize:      '48px',
              color:         '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor:        'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  )
}

function NavLink({ label, path, baseColor, go }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => go(path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    'none',
        border:        'none',
        padding:       0,
        fontFamily:    "'Inter', sans-serif",
        fontWeight:    300,
        fontSize:      '13px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         hovered ? '#f5f5f5' : baseColor,
        cursor:        'none',
        transition:    'color 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}
