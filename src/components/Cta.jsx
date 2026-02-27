import { useEffect, useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  address: '',
  phone: '',
  request: ''
}

const formSubmitEndpoint = 'https://formsubmit.co/ajax/sistemas3.delfos@gmail.com'

function Cta() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' })

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const handleChange = (event) => {
    const field = event.target.dataset.field
    const { value } = event.target

    setFormData((current) => ({
      ...current,
      [field]: value
    }))
  }

  const handleClose = () => {
    setIsOpen(false)
    setSubmitState({ status: 'idle', message: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitState({ status: 'submitting', message: 'Enviando solicitud...' })

    const payload = new FormData()
    payload.append('nombre', formData.name)
    payload.append('email', formData.email)
    payload.append('direccion', formData.address)
    payload.append('celular', formData.phone)
    payload.append('peticion', formData.request)
    payload.append('_subject', 'Nuevo contacto desde ICCED')
    payload.append('_template', 'table')
    payload.append('_captcha', 'false')
    payload.append('_honey', '')

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: payload
      })

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.')
      }

      setFormData(initialForm)
      setSubmitState({
        status: 'success',
        message: 'Solicitud enviada. Te contactaremos pronto.'
      })
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: 'No pudimos enviar tu solicitud. Intenta nuevamente.'
      })
    }
  }

  return (
    <section id="contacto" className="section cta">
      <div className="container cta__content">
        <h2>Queremos conocerte</h2>
        <p>
          Si deseas oracion, consejeria o informacion de nuestras reuniones, escribenos y te
          responderemos pronto.
        </p>
        <button
          type="button"
          className="btn btn--primary cta__trigger"
          onClick={() => setIsOpen(true)}
        >
          Contactarnos
        </button>
      </div>

      {isOpen && (
        <div
          className="contact-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <button
            type="button"
            className="contact-modal__backdrop"
            aria-label="Cerrar formulario"
            onClick={handleClose}
          />
          <div className="contact-modal__panel">
            <div className="contact-modal__header">
              <div className="contact-modal__heading">
                <p className="eyebrow">Contacto</p>
                <h3 id="contact-modal-title">Datos</h3>
                <p className="contact-modal__subtitle">
                  Comparte tus datos y tu peticion. Te responderemos lo antes posible.
                </p>
              </div>
              <button
                type="button"
                className="contact-modal__close"
                onClick={handleClose}
                aria-label="Cerrar"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M18.3 5.71a1 1 0 0 1 0 1.41L13.41 12l4.89 4.89a1 1 0 0 1-1.41 1.41L12 13.41l-4.89 4.89a1 1 0 0 1-1.41-1.41L10.59 12 5.7 7.11A1 1 0 0 1 7.11 5.7L12 10.59l4.89-4.89a1 1 0 0 1 1.41.01Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className="contact-modal__body">
              {submitState.status === 'success' ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <div className="contact-success__icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M9.55 18.2 4.9 13.55a1 1 0 1 1 1.41-1.41l3.24 3.24 8.14-8.14a1 1 0 0 1 1.41 1.41L10.96 18.2a1 1 0 0 1-1.41 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h4>Envio exitoso</h4>
                  <p>{submitState.message}</p>
                  <button type="button" className="btn btn--primary" onClick={handleClose}>
                    Cerrar
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="_honey"
                    className="contact-form__honey"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <label className="contact-form__field">
                    <span>Nombre</span>
                    <input
                      name="nombre"
                      data-field="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Escribe tu nombre completo"
                      required
                    />
                  </label>

                  <label className="contact-form__field">
                    <span>Correo</span>
                    <input
                      name="email"
                      data-field="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tucorreo@ejemplo.com"
                      required
                    />
                  </label>

                  <label className="contact-form__field">
                    <span>Direccion</span>
                    <input
                      name="direccion"
                      data-field="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Barrio, calle o referencia"
                      required
                    />
                  </label>

                  <label className="contact-form__field">
                    <span>Celular</span>
                    <input
                      name="celular"
                      data-field="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Tu numero de contacto"
                      required
                    />
                  </label>

                  <label className="contact-form__field">
                    <span>Peticion</span>
                    <textarea
                      name="peticion"
                      data-field="request"
                      rows="5"
                      value={formData.request}
                      onChange={handleChange}
                      placeholder="Cuentanos en que podemos ayudarte"
                      required
                    />
                  </label>

                  <div className="contact-form__actions">
                    <button type="button" className="btn btn--ghost" onClick={handleClose}>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn--primary"
                      disabled={submitState.status === 'submitting'}
                    >
                      {submitState.status === 'submitting' ? 'Enviando...' : 'Enviar'}
                    </button>
                  </div>

                  {submitState.status !== 'idle' && (
                    <p
                      className={`contact-form__message ${
                        submitState.status === 'error' ? 'contact-form__message--error' : ''
                      }`}
                    >
                      {submitState.message}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cta
