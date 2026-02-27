function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__gradient" aria-hidden="true" />
      <div className="container hero__content">
        <p className="eyebrow">Iglesia Cristiana Cuadrangular Edmundo López</p>
        <h1>Una iglesia para toda la familia.</h1>
        <p className="hero__copy">
          En ICCED queremos acompañarte en tu camino de fe a través de adoración, discipulado y servicio. Eres bienvenido.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#horarios">
            Ver horarios
          </a>
          <a className="btn btn--ghost" href="#contacto">
            Solicitar visita
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
