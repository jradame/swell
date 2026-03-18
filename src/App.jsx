import './styles/global.css'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { SessionProvider } from './context/SessionContext'
import Home from './pages/Home'
import LogSession from './pages/LogSession'
import History from './pages/History'
import Progress from './pages/Progress'

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M8 20V13h6v7"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    to: '/log',
    label: 'Log',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.7"/>
        <path d="M11 7v8M7 11h8"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/history',
    label: 'History',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 6h16M3 11h16M3 16h10"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    to: '/progress',
    label: 'Progress',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17l4.5-5.5 4 3 4.5-7 3-2"
          stroke={active ? 'var(--primary)' : 'var(--text-muted)'}
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function NavItem({ item }) {
  const location = useLocation()
  const isActive = item.to === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(item.to)

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      style={({ isActive: ia }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '8px 20px',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        transition: 'background 0.15s',
        background: isActive ? 'var(--primary-dim)' : 'transparent',
      })}
    >
      {item.icon(isActive)}
      <span style={{
        fontSize: '10px',
        fontWeight: '500',
        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {item.label}
      </span>
    </NavLink>
  )
}

function SidebarNavItem({ item }) {
  const location = useLocation()
  const isActive = item.to === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(item.to)

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        background: isActive ? 'var(--primary-dim)' : 'transparent',
        transition: 'background 0.15s',
        border: isActive ? '0.5px solid var(--border-mid)' : '0.5px solid transparent',
      }}
    >
      {item.icon(isActive)}
      <span style={{
        fontSize: '14px',
        fontWeight: '500',
        color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
      }}>
        {item.label}
      </span>
    </NavLink>
  )
}

export default function App() {
  return (
    <SessionProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Sidebar — desktop only */}
        <aside style={{
          width: 'var(--sidebar-w)',
          background: 'var(--surface)',
          borderRight: '0.5px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 12px',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 100,
        }} className="sidebar-desktop">
          <div style={{ padding: '0 8px 28px' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: '800',
              letterSpacing: '0.04em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}>
              Swell
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Surf session tracker
            </div>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map(item => (
              <SidebarNavItem key={item.to} item={item} />
            ))}
          </nav>
          <div style={{ marginTop: 'auto', padding: '0 8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Built by Justin Adame
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflowX: 'hidden',
        }} className="main-content">
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/log"      element={<LogSession />} />
              <Route path="/history"  element={<History />} />
              <Route path="/progress" element={<Progress />} />
            </Routes>
          </div>

          {/* Bottom nav — mobile only */}
          <nav style={{
            height: 'var(--nav-h)',
            background: 'var(--surface)',
            borderTop: '0.5px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'sticky',
            bottom: 0,
            zIndex: 100,
          }} className="bottom-nav-mobile">
            {NAV_ITEMS.map(item => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>
        </main>
      </div>

      <style>{`
        .sidebar-desktop { display: none !important; }
        .bottom-nav-mobile { display: flex; }
        .main-content { margin-left: 0; }

        @media (min-width: 768px) {
          .sidebar-desktop { display: flex !important; }
          .bottom-nav-mobile { display: none !important; }
          .main-content { margin-left: var(--sidebar-w); }
        }
      `}</style>
    </SessionProvider>
  )
}