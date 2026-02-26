import { useState } from 'react'
import { SPOTS } from '../data/spots'
import ConditionsWidget from './ConditionsWidget'

function SpotConditionsPanel() {
  const [selectedId, setSelectedId] = useState(SPOTS[0].id)
  const spot = SPOTS.find(s => s.id === selectedId)

  return (
    <div style={{ marginTop: '2rem' }}>
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        <label
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#A8B8C8'
          }}
        >
          Spot:
        </label>

        <select
  value={selectedId}
  onChange={e => setSelectedId(e.target.value)}
  style={{
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: '0.95rem',
    padding: '0.35rem 0.8rem',
    width: 'fit-content',                 // auto-size to content
    maxWidth: '100%',                     // safety on small screens
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(15,23,42,0.9)',
    color: 'white',
    outline: 'none'
  }}
>
  {SPOTS.map(s => (
    <option key={s.id} value={s.id} style={{ color: 'black' }}>
      {s.name}
    </option>
  ))}
</select>

      </div>

      {spot && (
        <ConditionsWidget
          lat={spot.lat}
          lng={spot.lng}
          spotName={spot.name}
        />
      )}
    </div>
  )
}

export default SpotConditionsPanel
