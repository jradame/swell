// src/components/Navbar.jsx

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen(prev => !prev)
  const handleClose = () => setOpen(false)

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🌊</span>
          <span className={styles.logoText}>Swell</span>
        </div>

        <button
          className={styles.menuButton}
          onClick={handleToggle}
          aria-label="Toggle navigation"
        >
          <span className={open ? styles.barOpen : styles.bar} />
          <span className={open ? styles.barOpen : styles.bar} />
          <span className={open ? styles.barOpen : styles.bar} />
        </button>

        <nav className={`${styles.navLinks} ${open ? styles.navOpen : ''}`}>
          <NavLink
            to="/"
            end
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/log"
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Log Session
          </NavLink>
          <NavLink
            to="/history"
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            History
          </NavLink>
          <NavLink
            to="/progress"
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Progress
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
