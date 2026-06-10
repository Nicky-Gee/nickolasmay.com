import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/video/hero-web.mp4';

gsap.registerPlugin(ScrollTrigger);

const words = ['FILMMAKER', 'PHOTOGRAPHER', 'AI DIRECTOR'];

export default function Hero() {
  const sectionRef  = useRef();
  const nameRef     = useRef();
  const subtitleRef = useRef();
  const credRef     = useRef();
  const [wordIndex, setWordIndex] = useState(0);

  // Cycling subtitle
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Scroll-driven text reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // All three text elements start below viewport, rise together on scroll
      tl.from([nameRef.current, subtitleRef.current, credRef.current], {
        yPercent: 120,
        ease: 'none',
        stagger: 0.05,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Section is 200vh — gives scroll room for the reveal
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '200vh' }}
    >
      {/* Sticky container — video + text pin here while section scrolls */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}>
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
        }} />

        {/* Nav */}
        <nav style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          display: 'flex',
          gap: '40px',
          zIndex: 10,
        }}>
          {['WORK', 'ABOUT', 'CONTACT'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.25em',
              fontWeight: 400,
            }}>{item}</a>
          ))}
        </nav>

        {/* Text block — centred, overflow hidden so text wipes up from below */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '90%',
          zIndex: 10,
          overflow: 'hidden',
        }}>
          <div ref={nameRef} style={{ overflow: 'hidden' }}>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(40px, 8vw, 120px)',
              color: '#fff',
              letterSpacing: '0.02em',
              lineHeight: 1,
              margin: '0 0 16px 0',
              whiteSpace: 'nowrap',
            }}>NICKOLAS MAY</h1>
          </div>

          <div ref={subtitleRef} style={{ overflow: 'hidden' }}>
            <p key={wordIndex} style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(18px, 3vw, 48px)',
              color: '#fff',
              letterSpacing: '0.2em',
              margin: 0,
              animation: 'fadeUp 0.4s ease forwards',
            }}>{words[wordIndex]}</p>
          </div>
        </div>

        {/* Credential */}
        <div style={{ overflow: 'hidden', position: 'absolute', bottom: '40px', left: 0, width: '100%', zIndex: 10 }}>
          <p ref={credRef} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.6)',
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}>GOLD CANNES LIONS WINNER</p>
        </div>
      </div>
    </section>
  );
}
