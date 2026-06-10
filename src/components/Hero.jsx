import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroVideo from '../assets/video/hero-web.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef()
  const nameRef = useRef()
  const titleRef = useRef()
  const credRef = useRef()

  useEffect(() => {
    const vh = window.innerHeight
    gsap.set(nameRef.current, { y: vh })
    gsap.set(titleRef.current, { y: vh })
    gsap.set(credRef.current, { y: vh })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '70% top',
        scrub: 2,
      }
    })

    tl.to(nameRef.current, { y: 0, duration: 1, ease: 'power3.out' }, 0)
      .to(titleRef.current, { y: 0, duration: 1, ease: 'power3.out' }, 0.15)
      .to(credRef.current, { y: 0, duration: 1, ease: 'power3.out' }, 0.28)

    return () => tl.kill()
  }, [])

  return (
    <div ref={sectionRef} style={{ height:'280vh', position:'relative' }}>
      <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>
        <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block', opacity:0.88, filter:'brightness(1.15)' }}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <nav style={{ position:'absolute', top:0, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'flex-end', padding:'36px 56px', zIndex:10 }}>
          <ul style={{ display:'flex', gap:'48px', listStyle:'none', margin:0, padding:0 }}>
            {['WORK','ABOUT','CONTACT'].map((item) => (
              <li key={item}><a href={`#${item.toLowerCase()}`} style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:400, fontSize:'11px', letterSpacing:'0.2em', color:'#fff', textDecoration:'none', opacity:0.85 }}>{item}</a></li>
            ))}
          </ul>
        </nav>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:10, textAlign:'center', padding:'0 6vw' }}>
          <h1 ref={nameRef} style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:700, fontSize:'clamp(52px,8vw,120px)', lineHeight:0.95, color:'#fff', margin:'0 0 16px', letterSpacing:'0.05em', textTransform:'uppercase' }}>
            Nickolas May
          </h1>
          <h2 ref={titleRef} style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:500, fontSize:'clamp(20px,3vw,46px)', lineHeight:1.05, color:'#fff', margin:'0 0 16px', letterSpacing:'0.08em', textTransform:'uppercase' }}>
            Hybrid Filmmaker,<br/>Photographer & AI Director
          </h2>
          <p ref={credRef} style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:500, fontSize:'13px', letterSpacing:'0.3em', color:'#fff', margin:0, textTransform:'uppercase', opacity:0.85 }}>
            Gold Cannes Lions Winner
          </p>
        </div>
      </div>
    </div>
  )
}
