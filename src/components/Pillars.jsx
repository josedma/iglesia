import { pillars } from '../data/content'

function Pillars() {
  return (
    <section id="pilares" className="section section--light">
      <div className="container">
        <h2>Nuestros pilares</h2>
        <p className="section__intro">
          Nuestra identidad se sostiene en el ministerio completo de Jesucristo.
        </p>
        <div className="grid grid--four">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="card card--pillar">
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pillars
