import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portrait from '../assets/images/nick-portrait.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" data-theme="light" style={{ background:'#F2EFE9', padding:'140px 10vw', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
      <img src={portrait} alt="Nickolas May" style={{ width:'100%', aspectRatio:'4/5', objectFit:'cover', objectPosition:'top', filter:'grayscale(15%)' }} />
      <div ref={ref} style={{ opacity:0 }}>
        <p style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:400, fontSize:'11px', letterSpacing:'0.25em', color:'#1C1C1C', opacity:0.45, marginBottom:'28px', textTransform:'uppercase' }}>About</p>
        <p style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:300, fontSize:'clamp(15px,1.3vw,19px)', lineHeight:1.8, color:'#1C1C1C', opacity:0.75, margin:'0 0 32px' }}>
          Gold Cannes Lions Winner. 17 years experience creating high-end commercial work across Australia and internationally for brands including Qantas, Tourism Whitsundays and Chang Beer. Crafting cinematic film and photography through a blend of traditional production experience and AI-enhanced workflows.
        </p>
        <a href="mailto:nick@nickolasmay.com" style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:400, fontSize:'11px', letterSpacing:'0.2em', color:'#1C1C1C', textDecoration:'none', textTransform:'uppercase', borderBottom:'1px solid #1C1C1C', paddingBottom:'2px' }}>Get In Touch</a>
      </div>
    </section>
  )
}
