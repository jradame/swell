import { useState } from 'react'
import { SPOTS } from '../data/spots'
import ConditionsWidget from './ConditionsWidget'
import styles from './SpotConditionsPanel.module.css' // optional; create or remove

function SpotConditionsPanel() {
  const [selectedId, setSelectedId] = useState(SPOTS[0].id)

  const spot = SPOTS.find(s => s.id === selectedId)

  return (
    <div className={styles.panel || ''}>
      <div className={styles.header || ''}>
        <label>
          Spot:{' '}
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
          >
            {SPOTS.map(s => (
              <option key={s.id} value={s.id}>
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
