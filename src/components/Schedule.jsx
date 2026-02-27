import { schedule } from '../data/content'

function Schedule() {
  return (
    <section id="horarios" className="section">
      <div className="container">
        <h2>Horarios de reunión</h2>
        <p className="section__intro">Te esperamos durante la semana para crecer juntos.</p>
        <div className="schedule">
          {schedule.map((item) => (
            <article key={`${item.day}-${item.event}`} className="card card--schedule">
              <p className="schedule__day">{item.day}</p>
              <p className="schedule__time">{item.time}</p>
              <p>{item.event}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Schedule
