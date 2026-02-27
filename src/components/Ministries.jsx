import { ministries } from '../data/content'

function Ministries() {
  return (
    <section id="ministerios" className="section section--light">
      <div className="container">
        <h2>Ministerios</h2>
        <p className="section__intro">
          Espacios diseñados para cada etapa de la vida y crecimiento espiritual.
        </p>
        <div className="grid grid--two">
          {ministries.map((ministry) => (
            <a key={ministry.slug} href={`#/ministerios/${ministry.slug}`} className="card card--link">
              <article>
                <h3>{ministry.name}</h3>
                <p>{ministry.description}</p>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Ministries
