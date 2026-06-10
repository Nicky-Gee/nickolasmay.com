export default function Contact() {
  return (
    <section id="contact" style={{ background:'#1C1C1C', padding:'120px 10vw', display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'32px' }}>
      <p style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:400, fontSize:'11px', letterSpacing:'0.25em', color:'#fff', opacity:0.4, textTransform:'uppercase', margin:0 }}>Contact</p>
      <h2 style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:700, fontSize:'clamp(32px,4vw,56px)', color:'#F2EFE9', margin:0, lineHeight:1.1, letterSpacing:'0.02em' }}>Real Creative Experience.<br/>Modern AI Workflows.<br/>Cinematic Commercial Results.</h2>
      <div style={{ display:'flex', gap:'48px', marginTop:'16px' }}>
        <a href="mailto:nick@nickolasmay.com" style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:400, fontSize:'12px', letterSpacing:'0.15em', color:'#F2EFE9', textDecoration:'none', opacity:0.7, textTransform:'uppercase' }}>nick@nickolasmay.com</a>
        <a href="https://www.instagram.com/nickolas_may_" target="_blank" rel="noreferrer" style={{ fontFamily:"'futura-pt',sans-serif", fontWeight:400, fontSize:'12px', letterSpacing:'0.15em', color:'#F2EFE9', textDecoration:'none', opacity:0.7, textTransform:'uppercase' }}>Instagram</a>
      </div>
    </section>
  )
}
