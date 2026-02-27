import { navLinks } from '../data/content'
import { withBase } from '../utils/asset'

const socialLinks = [
  { label: 'Facebook', href: '#', icon: '/social/facebook.svg' },
  { label: 'Instagram', href: '#', icon: '/social/instagram.svg' }
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <section className="footer__col">
            <h3 className="footer__title">Links</h3>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer__col">
            <h3 className="footer__title">Contacto</h3>
            <div className="footer-contact">
              <p>Tu numero aqui</p>
              <p>Tu correo aqui</p>
              <p>Tu direccion aqui</p>
            </div>
            <a className="btn btn--primary footer__btn" href="#contacto">
              Enviar un mensaje
            </a>
          </section>

          <section className="footer__col">
            <h3 className="footer__title">Escribenos</h3>
            <p className="footer-copy">
              Estamos aqui para ti. Escribenos y con gusto te responderemos.
            </p>
            <a className="btn btn--primary footer__btn" href="#">
              Abrir WhatsApp
            </a>
          </section>

          <section className="footer__col footer__brand-col">
            <div className="footer-logo-frame">
              <img src={withBase('/logo.webp')} alt="Logo ICCED" className="footer-logo" />
            </div>
            <div className="footer-socials">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="footer-social"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={withBase(item.icon)} alt={item.label} className="footer-social__icon" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="footer__legal">
          Iglesia Cristiana Cuadrangular Edmundo López &copy; 2026. All Rights Reserved. | Created by JoséD Murillo A
        </div>
      </div>
    </footer>
  )
}

export default Footer
