import React, { useEffect, useState, useRef } from 'react';
import heroVideo from '../assets/video/hero-web.mp4';

const words = ['FILMMAKER', 'PHOTOGRAPHER', 'AI DIRECTOR'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#0a0a0a',
    }}>
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

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
      }} />

      <nav style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        display: 'flex',
        gap: '40px',
        zIndex: 10,
      }}>
        {['WORK','ABOUT','CONTACT'].map(item => (
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

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '90%',
        zIndex: 10,
      }}>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(60px, 10vw, 160px)',
          color: '#fff',
          letterSpacing: '0.02em',
          lineHeight: 1,
          margin: '0 0 16px 0',
          whiteSpace: 'nowrap',
        }}>NICKOLAS MAY</h1>
        <p key={wordIndex} style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(18px, 3vw, 48px)',
          color: '#fff',
          letterSpacing: '0.2em',
          margin: 0,
          animation: 'fadeUp 0.4s ease forwards',
        }}>{words[wordIndex]}</p>
      </div>

      <p style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.4em',
        color: 'rgba(255,255,255,0.6)',
        margin: 0,
        zIndex: 10,
        whiteSpace: 'nowrap',
      }}>GOLD CANNES LIONS WINNER</p>
    </section>
  );
}
