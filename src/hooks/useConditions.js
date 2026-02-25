useEffect(() => {
  if (!lat || !lng) return
  setLoading(true)

  console.log('API KEY:', import.meta.env.VITE_STORMGLASS_KEY)
  console.log('Fetching conditions for:', lat, lng)
