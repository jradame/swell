import { useSessions } from '../context/SessionContext'
import SessionCard from '../components/SessionCard'
import { Link } from 'react-router-dom'
import styles from './History.module.css'

function History() {
  const { sessions } = useSessions()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Session History</h2>
        <Link to="/log" className={styles.logBtn}>+ Log Session</Link>
      </div>

      {sessions.length === 0 ? (
        <div className={styles.empty}>
          <p>No sessions yet.</p>
          <Link to="/log">Log your first session →</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {sessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  )
}

export default History
