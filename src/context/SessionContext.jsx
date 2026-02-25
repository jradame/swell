import { createContext, useContext, useState, useEffect } from 'react'

const SessionContext = createContext()

export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState(() => {
    const stored = localStorage.getItem('swell-sessions')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('swell-sessions', JSON.stringify(sessions))
  }, [sessions])

  const addSession = (session) => {
    setSessions(prev => [{ ...session, id: Date.now() }, ...prev])
  }

  const deleteSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id))
  }

  return (
    <SessionContext.Provider value={{ sessions, addSession, deleteSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSessions() {
  return useContext(SessionContext)
}
