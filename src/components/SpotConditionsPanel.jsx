// src/components/SpotConditionsPanel.jsx
import { useState } from 'react'
import { SPOTS } from '../data/spots'
import ConditionsWidget from './ConditionsWidget'

function SpotConditionsPanel() {
  const [selectedId, setSelectedId] = useState(SPOTS[0].id)
  const spot = SPOTS.find(s => s.id === selectedId)

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.95rem', fontWeight: 500 }}>
          Spot:{' '}
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            style={{
              fontSize: '1rem',
              padding: '0.6rem 1rem',
              minWidth: '260px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: 'white',
              outline: 'none'
            }}
          >
            {SPOTS.map(s => (
              <option
                key={s.id}
                value={s.id}
                style={{ color: 'black' }} // dropdown list text
              >
                {s.name}
              </option>
            ))}
          </select>
        </label>
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
