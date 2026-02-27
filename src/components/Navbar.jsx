import { useEffect, useState } from 'react'
import { ministries, navLinks } from '../data/content'
import { withBase } from '../utils/asset'

function Navbar({ forceSolid = false }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSolid, setIsSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const maxTransitionScroll = 260

    const onScroll = () => {
      if (forceSolid) {
        setScrollProgress(1)
        setIsSolid(true)
        return
      }

      const y = window.scrollY
      const progress = Math.min(y / maxTransitionScroll, 1)
      setScrollProgress(progress)
      setIsSolid(y >= maxTransitionScroll)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [forceSolid])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 700) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onHashChange = () => setMenuOpen(false)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const ministryIndex = navLinks.findIndex((link) => link.label === 'Ministerios')
  const linksBeforeMinistries =
    ministryIndex >= 0 ? navLinks.slice(0, ministryIndex) : navLinks
  const linksAfterMinistries = ministryIndex >= 0 ? navLinks.slice(ministryIndex + 1) : []

  return (
    <header
      className={`navbar ${scrollProgress > 0 ? 'navbar--active' : ''} ${isSolid ? 'navbar--solid' : ''}`}
      style={{ '--nav-bg-alpha': scrollProgress }}
    >
      <div className="container navbar__content">
        <a href="#inicio" className="brand" aria-label="Ir al inicio de ICCED">
          <img src={withBase('/logo.webp')} alt="Logo ICCED" className="brand__logo" />
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'menu-toggle--open' : ''}`}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="menu-toggle__line" />
          <span className="menu-toggle__line" />
          <span className="menu-toggle__line" />
        </button>

        <nav
          id="main-nav"
          className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`}
          aria-label="Navegación principal"
        >
          <ul className="nav-list">
            {linksBeforeMinistries.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-item nav-item--has-dropdown">
              <a href="#ministerios" onClick={() => setMenuOpen(false)}>
                Ministerios
              </a>
              <ul className="nav-dropdown">
                {ministries.map((ministry) => (
                  <li key={ministry.slug}>
                    <a href={`#/ministerios/${ministry.slug}`} onClick={() => setMenuOpen(false)}>
                      {ministry.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            {linksAfterMinistries.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
