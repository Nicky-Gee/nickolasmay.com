/* Grey labelled rectangle — correct aspect ratio, no stock photos ever */
export default function PlaceholderImage({ label, style }) {
  return (
    <div
      style={{
        width:           '100%',
        height:          '100%',
        background:      '#c8c8c8',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily:    "'Archivo Black', sans-serif",
          fontSize:      '13px',
          color:         '#888888',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          textAlign:     'center',
          padding:       '0 20px',
          pointerEvents: 'none',
          userSelect:    'none',
        }}
      >
        {label}
      </span>
    </div>
  )
}
