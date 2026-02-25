import { useSessions } from '../context/SessionContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts'
import styles from './Progress.module.css'

function Progress() {
  const { sessions } = useSessions()

  const byMonth = sessions.reduce((acc, s) => {
    const month = s.date?.slice(0, 7)
    if (!month) return acc
    if (!acc[month]) acc[month] = { month, sessions: 0, totalWaves: 0 }
    acc[month].sessions += 1
    acc[month].totalWaves += Number(s.waveHeight || 0)
    return acc
  }, {})

  const chartData = Object.values(byMonth).sort((a, b) =>
    a.month.localeCompare(b.month)
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Progress</h2>

      {sessions.length < 2 ? (
        <p className={styles.empty}>
          Log at least 2 sessions to see your progress charts.
        </p>
      ) : (
        <>
          <div className={styles.chartBlock}>
            <h3>Sessions Per Month</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: '#111827',
                    border: 'none',
                    color: '#f1f5f9'
                  }}
                />
                <Bar
                  dataKey="sessions"
                  fill="#38bdf8"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartBlock}>
            <h3>Total Wave Height Logged</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: '#111827',
                    border: 'none',
                    color: '#f1f5f9'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="totalWaves"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={{ fill: '#38bdf8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}

export default Progress
