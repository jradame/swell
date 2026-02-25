import { useSessions } from '../context/SessionContext'
import styles from './SessionCard.module.css'

function SessionCard({ session }) {
  const { deleteSession } = useSessions()

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.spot}>{session.spot}</h3>
        <span className={styles.date}>{session.date}</span>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.value}>{session.waveHeight}ft</span>
          <span className={styles.label}>Waves</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.value}>{session.duration}min</span>
          <span className={styles.label}>Duration</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.value}>{session.board || '—'}</span>
          <span className={styles.label}>Board</span>
        </div>
      </div>
      {session.notes && <p className={styles.notes}>{session.notes}</p>}
      <button
        className={styles.delete}
        onClick={() => deleteSession(session.id)}
      >
        Delete
      </button>
    </div>
  )
}

export default SessionCard
