import { useSessions } from '../context/SessionContext'
import { Link } from 'react-router-dom'
import SpotConditionsPanel from '../components/SpotConditionsPanel'
import styles from './Home.module.css'

function Home() {
  const { sessions } = useSessions()
  const latest = sessions[0]

  const avgWave =
    sessions.length > 0
      ? (
          sessions.reduce((sum, s) => sum + Number(s.waveHeight || 0), 0) /
          sessions.length
        ).toFixed(1)
      : '—'

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
  <span className={styles.heroLogoIconCircle}>
    <span className={styles.heroLogoIcon}>🌊</span>
  </span>
  <span className={styles.heroLogoText}>SWELL</span>
</h1>

        <p className={styles.subtitle}>
          Log every surf session, track conditions, and watch your surfing
          progress over time.
        </p>
        <Link to="/log" className={styles.cta}>
          Log a Session
        </Link>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{sessions.length}</span>
          <span className={styles.statLabel}>Total Sessions</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{avgWave}</span>
          <span className={styles.statLabel}>Avg Wave Height (ft)</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>
            {latest ? latest.spot : '—'}
          </span>
          <span className={styles.statLabel}>Last Spot</span>
        </div>
      </div>

      <SpotConditionsPanel />
    </div>
  )
}

export default Home
