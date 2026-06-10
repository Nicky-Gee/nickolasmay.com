import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef()

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
        const el = document.elementFromPoint(e.clientX, e.clientY)
        const isLight = el && el.closest('[data-theme="light"]')
        cursorRef.current.querySelector('path').setAttribute('stroke', isLight ? '#1C1C1C' : '#ffffff')
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <svg ref={cursorRef} style={{ position:'fixed', pointerEvents:'none', zIndex:9999, width:'20px', height:'24px' }} viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L18 10L10 13L7 22L2 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
    </svg>
  )
}
