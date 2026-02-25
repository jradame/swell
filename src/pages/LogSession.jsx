import { useState } from 'react'
import { useSessions } from '../context/SessionContext'
import { useNavigate } from 'react-router-dom'
import styles from './LogSession.module.css'

function LogSession() {
  const { addSession } = useSessions()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    spot: '',
    date: '',
    waveHeight: '',
    duration: '',
    board: '',
    notes: ''
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addSession(form)
    navigate('/history')
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Log a Session</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.field}>
          <label>Spot</label>
          <input name="spot" value={form.spot} onChange={handleChange} placeholder="e.g. Trestles" required />
        </div>

        <div className={styles.field}>
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Wave Height (ft)</label>
            <input name="waveHeight" type="number" value={form.waveHeight} onChange={handleChange} placeholder="e.g. 4" required />
          </div>
          <div className={styles.field}>
            <label>Duration (min)</label>
            <input name="duration" type="number" value={form.duration} onChange={handleChange} placeholder="e.g. 90" required />
          </div>
        </div>

        <div className={styles.field}>
          <label>Board</label>
          <input name="board" value={form.board} onChange={handleChange} placeholder="e.g. 6'2 shortboard" />
        </div>

        <div className={styles.field}>
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="How was the session?" rows={4} />
        </div>

        <button type="submit" className={styles.submit}>Save Session</button>
      </form>
    </div>
  )
}

export default LogSession
