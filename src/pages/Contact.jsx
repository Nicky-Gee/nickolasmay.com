import { useState } from 'react'

const PROJECT_TYPES = ['Photography', 'Film', 'Campaign', 'Social Media', 'Branding', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.type}\n\n${form.message}`
    )
    window.location.href = `mailto:nick@nickolasmay.com?subject=Project Enquiry&body=${body}`
  }

  return (
    <section style={{
      paddingTop:  '120px',
      paddingBottom:'100px',
      background:  '#ffffff',
      minHeight:   '100vh',
    }}>
      <div style={{
        display:      'flex',
        gap:          '8vw',
        padding:      '0 10vw',
        flexWrap:     'wrap',
      }}>

        {/* Left column */}
        <div style={{ flex: '0 0 40%', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h1 style={{
            fontFamily:    "'Archivo Black', sans-serif",
            fontSize:      'clamp(36px, 5vw, 72px)',
            color:         '#2e2d32',
            lineHeight:    1,
            letterSpacing: '0.03em',
          }}>
            GET IN TOUCH.
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize:   '17px',
            color:      '#a2a0a2',
            lineHeight: 1.7,
          }}>
            Based on the Sunshine Coast.<br />Working globally.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            <a
              href="mailto:nick@nickolasmay.com"
              style={{
                fontFamily:    "'Archivo Black', sans-serif",
                fontSize:      '16px',
                color:         '#336065',
                textDecoration:'none',
                letterSpacing: '0.02em',
                cursor:        'none',
              }}
            >
              nick@nickolasmay.com
            </a>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize:   '16px',
              color:      '#a2a0a2',
            }}>
              +61 411 66 7000
            </span>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ cursor: 'none' }}>
              <InstagramIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ cursor: 'none' }}>
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Right column — form */}
        <form
          onSubmit={handleSubmit}
          style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '36px' }}
        >
          <Field label="Name" value={form.name} onChange={v => set('name', v)} />
          <Field label="Email" type="email" value={form.email} onChange={v => set('email', v)} />

          {/* Project type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Project Type</Label>
            <select
              value={form.type}
              onChange={e => set('type', e.target.value)}
              style={inputStyle}
            >
              <option value="">Select…</option>
              {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Message */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Label>Message</Label>
            <textarea
              rows={5}
              value={form.message}
              onChange={e => set('message', e.target.value)}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </div>

          <button
            type="submit"
            style={{
              background:    '#336065',
              border:        'none',
              padding:       '20px',
              fontFamily:    "'Archivo Black', sans-serif",
              fontSize:      '18px',
              color:         '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor:        'none',
              borderRadius:  0,
              transition:    'background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2a4f53' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#336065' }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

function Label({ children }) {
  return (
    <span style={{
      fontFamily:    "'Inter', sans-serif",
      fontWeight:    300,
      fontSize:      '11px',
      color:         '#336065',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
    }}>
      {children}
    </span>
  )
}

function Field({ label, type = 'text', value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  )
}

const inputStyle = {
  background:   'none',
  border:       'none',
  borderBottom: '1px solid #2e2d32',
  padding:      '10px 0',
  fontFamily:   "'Inter', sans-serif",
  fontWeight:   300,
  fontSize:     '16px',
  color:        '#2e2d32',
  outline:      'none',
  borderRadius: 0,
  width:        '100%',
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#336065" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="#336065" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="#336065" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="#336065" strokeWidth="1.5" />
      <line x1="7" y1="10" x2="7" y2="17" stroke="#336065" strokeWidth="1.5" strokeLinecap="square" />
      <circle cx="7" cy="7.5" r="1" fill="#336065" />
      <path d="M11 10v7M11 13c0-2 6-3 6 1v3" stroke="#336065" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
