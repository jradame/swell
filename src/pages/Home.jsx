import { useState, useEffect } from 'react'
import { useSessions } from '../context/SessionContext'
import { Link } from 'react-router-dom'
import { SPOTS } from '../data/spots'

const mToFt = (m) => Math.round(m * 3.281)

const getQuality = (waveHeightFt, windKt) => {
  if (waveHeightFt < 1.5) return 'Flat'
  if (windKt > 25) return 'Blown'
  if (windKt > 15 || waveHeightFt > 12) return 'Fair'
  return 'Clean'
}

const msToKt = (ms) => Math.round(ms * 1.944)

async function fetchConditions(lat, lng) {
  // Marine API for wave data
  const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=wave_height,wave_period,wave_direction&forecast_days=1`
  // Weather API for wind data (more reliable than marine hourly wind)
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=wind_speed_10m&wind_speed_unit=ms`

  const [marineRes, weatherRes] = await Promise.all([
    fetch(marineUrl),
    fetch(weatherUrl),
  ])

  if (!marineRes.ok || !weatherRes.ok) throw new Error('Failed to fetch conditions')

  const [marineData, weatherData] = await Promise.all([
    marineRes.json(),
    weatherRes.json(),
  ])

  const c = marineData.current
  const waveHeightFt = mToFt(c.wave_height)
  const period = Math.round(c.wave_period)

  const windMs = weatherData.current.wind_speed_10m
  const windKt = msToKt(windMs)
  const quality = getQuality(waveHeightFt, windKt)

  return { waveHeight: waveHeightFt, period, wind: windKt, quality }
}

function StarRating({ rating = 0, size = 10 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(n => (
        <svg key={n} width={size} height={size} viewBox="0 0 10 10">
          <polygon
            points="5,0 6.2,3.5 10,3.5 7,5.7 8.1,9.5 5,7.3 1.9,9.5 3,5.7 0,3.5 3.8,3.5"
            fill={n <= rating ? 'var(--amber)' : 'var(--text-muted)'}
            opacity={n <= rating ? 1 : 0.35}
          />
        </svg>
      ))}
    </div>
  )
}

function QualityBadge({ label }) {
  const colors = {
    'Clean': { bg: 'var(--green-dim)', color: 'var(--green)' },
    'Fair':  { bg: 'var(--amber-dim)', color: 'var(--amber)' },
    'Blown': { bg: 'var(--red-dim)',   color: 'var(--red)'   },
  }
  const c = colors[label] || colors['Fair']
  return (
    <span style={{
      fontSize: '11px', fontWeight: '500',
      padding: '3px 10px', borderRadius: '20px',
      background: c.bg, color: c.color,
    }}>
      {label}
    </span>
  )
}

export default function Home() {
  const { sessions } = useSessions()
  const [selectedSpotId, setSelectedSpotId] = useState('trestles')
  const [conditions, setConditions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const selectedSpot = SPOTS.find(s => s.id === selectedSpotId) || SPOTS[0]

  useEffect(() => {
    setLoading(true)
    setError(false)
    setConditions(null)
    fetchConditions(selectedSpot.lat, selectedSpot.lng)
      .then(data => { setConditions(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [selectedSpotId])

  const now = new Date()
  const greeting = (() => {
    const h = now.getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  })()
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' })
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

  const totalSessions = sessions.length
  const thisMonth = sessions.filter(s => {
    const d = new Date(s.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const avgWave = sessions.length
    ? (sessions.reduce((acc, s) => acc + parseFloat(s.waveHeight || 0), 0) / sessions.length).toFixed(1)
    : '--'

  const recentSessions = sessions.slice(0, 4)

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div style={{ padding: '24px 20px 40px', maxWidth: '960px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            {greeting}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 6vw, 48px)',
            fontWeight: '800',
            letterSpacing: '0.02em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            {dayName}
          </div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center',
          gap: '3px', flexShrink: 0, paddingLeft: '12px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: '700',
            color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>
            {dateStr}
          </div>
        </div>
      </div>

      {/* Conditions card */}
      <div style={{
        background: 'var(--card)',
        borderRadius: 'var(--radius-lg)',
        border: '0.5px solid var(--border-mid)',
        marginBottom: '20px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 24px 14px',
          flexWrap: 'wrap', gap: '10px',
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
              Current conditions
            </div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <select
                value={selectedSpotId}
                onChange={e => setSelectedSpotId(e.target.value)}
                style={{
                  background: 'var(--card-alt)',
                  border: '0.5px solid var(--border-mid)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text)',
                  fontSize: '16px',
                  fontWeight: '500',
                  fontFamily: 'var(--font-body)',
                  padding: '7px 32px 7px 12px',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  outline: 'none',
                }}
              >
                {SPOTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <svg style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <QualityBadge label={loading ? '...' : error ? 'N/A' : conditions?.quality} />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '0.5px solid var(--border)',
        }}>
          {[
            { val: loading ? '—' : error ? '—' : `${conditions?.waveHeight}`, unit: 'ft', label: 'Wave height' },
            { val: loading ? '—' : error ? '—' : `${conditions?.period}`,     unit: 's',  label: 'Period'      },
            { val: loading ? '—' : error ? '—' : `${conditions?.wind}`,       unit: 'kt', label: 'Wind'        },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '16px 8px', textAlign: 'center',
              borderRight: i < 2 ? '0.5px solid var(--border)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(20px, 5vw, 36px)', fontWeight: '800',
                color: loading ? 'var(--text-muted)' : 'var(--text)',
                lineHeight: 1, whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}>
                {c.val}
                {!loading && !error && (
                  <span style={{ fontSize: 'clamp(11px, 2.5vw, 14px)', color: 'var(--primary)', marginLeft: '2px', fontFamily: 'var(--font-body)' }}>
                    {c.unit}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div style={{ padding: '10px 16px', fontSize: '11px', color: 'var(--red)', textAlign: 'center', borderTop: '0.5px solid var(--border)' }}>
            Could not load conditions — check your connection
          </div>
        )}

        <div style={{ padding: '8px 16px', fontSize: '10px', color: 'var(--text-muted)', borderTop: '0.5px solid var(--border)', textAlign: 'right' }}>
          Offshore swell data · Open-Meteo Marine
        </div>

        <style>{`
          select option { background: #243447; color: #fff; }
          select:focus { border-color: var(--gold) !important; }
        `}</style>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        {[
          { label: 'Total sessions', val: totalSessions, sub: totalSessions === 0 ? 'Log your first' : `${thisMonth} this month` },
          { label: 'Avg wave height', val: avgWave !== '--' ? `${avgWave}` : '--', sub: avgWave === '--' ? 'No data yet' : 'feet' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--card)', borderRadius: 'var(--radius-lg)',
            border: '0.5px solid var(--border)', padding: '20px 24px',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
              {s.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '44px', fontWeight: '800', color: 'var(--text)', lineHeight: 1,
            }}>
              {s.val}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '8px' }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }
        @media (min-width: 768px) {
          .stat-grid { gap: 16px; }
        }
      `}</style>

      {/* Recent sessions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Recent sessions
        </div>
        <Link to="/history" style={{ fontSize: '13px', color: 'var(--gold)' }}>
          See all →
        </Link>
      </div>

      {recentSessions.length === 0 ? (
        <div style={{
          background: 'var(--card)', borderRadius: 'var(--radius-lg)',
          border: '0.5px dashed var(--border-mid)', padding: '32px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            No sessions logged yet
          </div>
          <Link to="/log" style={{
            display: 'inline-block', padding: '10px 20px',
            background: 'var(--gold)', color: 'var(--bg)',
            borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: '500',
          }}>
            Log your first session
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recentSessions.map(s => (
            <div key={s.id} style={{
              background: 'var(--card)', borderRadius: 'var(--radius-lg)',
              border: '0.5px solid var(--border)', padding: '16px 18px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                  fontSize: '15px', fontWeight: '500', color: 'var(--text)', marginBottom: '4px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {s.spot}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {formatDate(s.date)} · {s.duration} min
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                <div style={{ fontSize: '14px', color: 'var(--primary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                  {s.waveHeight} ft
                </div>
                <StarRating rating={parseInt(s.rating) || 0} size={11} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}