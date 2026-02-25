import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🌊 SWELL</div>
      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/log" className={({ isActive }) => isActive ? styles.active : ''}>Log</NavLink>
        <NavLink to="/history" className={({ isActive }) => isActive ? styles.active : ''}>History</NavLink>
        <NavLink to="/progress" className={({ isActive }) => isActive ? styles.active : ''}>Progress</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
