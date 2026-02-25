import { useState, useEffect } from 'react'

export function useConditions(lat, lng) {
  const [conditions, setConditions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!lat || !lng) return

    setLoading(true)
    setError(null)

    // Marine API: waves + water temp
    const marineUrl =
      `https://marine-api.open-meteo.com/v1/marine` +
      `?latitude=${lat}` +
      `&longitude=${lng}` +
      `&hourly=wave_height,wave_period,sea_surface_temperature` +
      `&forecast_days=1` +
      `&timezone=auto`

    // Weather API: wind at 10m
    const windUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lng}` +
      `&hourly=wind_speed_10m` +
      `&forecast_days=1` +
      `&timezone=auto`

    Promise.all([
      fetch(marineUrl).then(r => r.json()),
      fetch(windUrl).then(r => r.json())
    ])
      .then(([marine, wind]) => {
        console.log('marine raw:', marine)
        console.log('wind raw:', wind)

        if (marine.error) {
          throw new Error(marine.reason || 'Marine API error')
        }
        if (wind.error) {
          throw new Error(wind.reason || 'Wind API error')
        }
        if (!marine.hourly || !wind.hourly) {
          throw new Error('Missing hourly data')
        }

        const waveHeight = marine.hourly.wave_height?.[0] ?? null
        const wavePeriod = marine.hourly.wave_period?.[0] ?? null
        const waterTemperature =
          marine.hourly.sea_surface_temperature?.[0] ?? null
        const windSpeed = wind.hourly.wind_speed_10m?.[0] ?? null

        setConditions({
          waveHeight,
          wavePeriod,
          windSpeed,
          waterTemperature
        })
        setLoading(false)
      })
      .catch(err => {
        console.error('conditions error:', err)
        setError(err)
        setLoading(false)
      })
  }, [lat, lng])

  return { conditions, loading, error }
}
