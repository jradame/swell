import { useState, useEffect } from 'react'

export function useConditions(lat, lng) {
  const [conditions, setConditions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!lat || !lng) return

    setLoading(true)

    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height,wave_period,wind_speed,water_temperature&length=1`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const hour0 = {
          waveHeight: data.hourly?.wave_height?.[0],
          wavePeriod: data.hourly?.wave_period?.[0],
          windSpeed: data.hourly?.wind_speed?.[0],
          waterTemperature: data.hourly?.water_temperature?.[0]
        }
        setConditions(hour0)
        setLoading(false)
      })
      .catch(err => {
        console.error('open-meteo error', err)
        setError(err)
        setLoading(false)
      })
  }, [lat, lng])

  return { conditions, loading, error }
}
