import { useConditions } from '../hooks/useConditions'
import styles from './ConditionsWidget.module.css'

function ConditionsWidget({ lat, lng, spotName }) {
  const { conditions, loading, error } = useConditions(lat, lng)

  if (loading) {
    return <div className={styles.widget}>Loading conditions...</div>
  }

  if (error) {
    return (
      <div className={styles.widget}>
        Conditions unavailable.
        <br />
        <small>{error.message}</small>
      </div>
    )
  }

  if (!conditions) return null

  console.log('conditions:', conditions)

  const wave =
    conditions.waveHeight != null ? conditions.waveHeight.toFixed(1) : '—'
  const period =
    conditions.wavePeriod != null ? conditions.wavePeriod.toFixed(0) : '—'
  const wind =
    conditions.windSpeed != null ? conditions.windSpeed.toFixed(0) : '—'
  const water =
    conditions.waterTemperature != null
      ? conditions.waterTemperature.toFixed(0)
      : '—'

  return (
    <div className={styles.widget}>
      <h4 className={styles.title}>🌊 Current Conditions — {spotName}</h4>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.val}>{wave} m</span>
          <span className={styles.lbl}>Wave Height</span>
        </div>
        <div className={styles.item}>
          <span className={styles.val}>{period} s</span>
          <span className={styles.lbl}>Period</span>
        </div>
        <div className={styles.item}>
          <span className={styles.val}>{wind} km/h</span>
          <span className={styles.lbl}>Wind</span>
        </div>
        <div className={styles.item}>
          <span className={styles.val}>{water} °C</span>
          <span className={styles.lbl}>Water Temp</span>
        </div>
      </div>
    </div>
  )
}

export default ConditionsWidget
