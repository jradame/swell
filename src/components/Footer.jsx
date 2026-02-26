// src/components/Footer.jsx

import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
  © {new Date().getFullYear()} Swell. All rights reserved. · Built by Justin Adame
</p>

    </footer>
  )
}

export default Footer
