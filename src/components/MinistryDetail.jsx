import { useEffect, useState } from 'react'

const eventBlocksByMinistry = {
  ninos: [
    {
      id: 'servicios',
      title: 'Servicios',
      description:
        'Mensualmente el Ministerio Kindoms Kids tenemos un espacio para integrar a nuestros ninos y compartir con ellos la palabra de Dios de una manera ludica e interactiva.',
      images: ['/ministries/ninos/servicios/1.webp']
    },
    {
      id: 'campamentos',
      title: 'Campamentos',
      description:
        'Anualmente se realiza un campamento con los ninos para que pasen tiempo divertido y de crecimiento espiritual, con el objetivo de integrarlos y que conozcan mas de la palabra de Dios.',
      images: ['/ministries/ninos/campamentos/1.webp']
    },
    {
      id: 'proximos-eventos',
      title: 'Proximos eventos',
      description:
        'Suspendisse potenti. Phasellus feugiat, lectus non commodo mattis, lacus massa bibendum tortor, vitae suscipit erat lorem ac nibh.',
      events: [
        {
          image: '/ministries/ninos/proximos-eventos/1.webp',
          description:
            'Academia Danza: Jornada especial con dinamicas, alabanza y una palabra enfocada en ninos y familias.'
        },
        {
          image: '/ministries/ninos/proximos-eventos/2.webp',
          description:
            'Campamento ninos 2026: Encuentro de integracion con actividades recreativas y acompanamiento espiritual.'
        }
      ]
    }
  ],
  juventud: [
    {
      id: 'servicios',
      title: 'Servicios',
      description:
        'Espacios para fortalecer la fe de los jovenes con adoracion, ensenanza biblica y tiempos de integracion.',
      images: [
        '/ministries/juventud/servicios/1.webp',
        '/ministries/juventud/servicios/2.webp',
        '/ministries/juventud/servicios/3.webp'
      ]
    },
    {
      id: 'campamentos',
      title: 'Campamentos',
      description:
        'Encuentros especiales para crecer espiritualmente, fortalecer amistades sanas y vivir experiencias con proposito.',
      images: ['/ministries/juventud/campamentos/1.webp', '/ministries/juventud/campamentos/2.webp']
    },
    {
      id: 'proximos-eventos',
      title: 'Proximos servicios',
      description: 'Actividades y reuniones para seguir creciendo como juventud.',
      events: [
        {
          image: '/ministries/juventud/proximos-servicios/1.webp',
          description:
            'Tarde de Pelicula, este 7 de marzo a las 5:30 PM contacta a tu lider para mas información.'
        }
      ]
    }
  ]
}

function buildInitialCarousels(eventBlocks) {
  return Object.fromEntries(
    eventBlocks.map((block) => [block.id, { slide: 1, transition: true, touchStartX: null }])
  )
}

function MinistryDetail({ ministry }) {
  const eventBlocks = eventBlocksByMinistry[ministry.slug] || eventBlocksByMinistry.ninos
  const [openEvent, setOpenEvent] = useState(null)
  const [carousels, setCarousels] = useState(() => buildInitialCarousels(eventBlocks))

  useEffect(() => {
    setOpenEvent(null)
    setCarousels(buildInitialCarousels(eventBlocks))
  }, [ministry.slug])

  const updateCarousel = (blockId, updater) => {
    setCarousels((current) => ({
      ...current,
      [blockId]: updater(current[blockId])
    }))
  }

  const goToPreviousSlide = (blockId) => {
    updateCarousel(blockId, (state) => ({
      ...state,
      transition: true,
      slide: state.slide - 1
    }))
  }

  const goToNextSlide = (blockId) => {
    updateCarousel(blockId, (state) => ({
      ...state,
      transition: true,
      slide: state.slide + 1
    }))
  }

  const handleCarouselTransitionEnd = (blockId, imagesLength) => {
    let didSnap = false

    setCarousels((current) => {
      const state = current[blockId]

      if (state.slide === imagesLength + 1) {
        didSnap = true
        return {
          ...current,
          [blockId]: {
            ...state,
            transition: false,
            slide: 1
          }
        }
      }

      if (state.slide === 0) {
        didSnap = true
        return {
          ...current,
          [blockId]: {
            ...state,
            transition: false,
            slide: imagesLength
          }
        }
      }

      return current
    })

    if (!didSnap) {
      return
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCarousels((current) => ({
          ...current,
          [blockId]: {
            ...current[blockId],
            transition: true
          }
        }))
      })
    })
  }

  return (
    <section className="section section--light ministry-detail">
      <div className="container">
        <p className="eyebrow">Ministerio</p>
        <h2>{ministry.name}</h2>
        <p className="section__intro">{ministry.description}</p>

        <article className="card">
          <p>{ministry.details}</p>
        </article>

        <section className="ministry-events">
          <h3 className="ministry-events__title">Eventos</h3>
          <div className="grid grid--three">
            {eventBlocks.map((block) => {
              const isOpen = openEvent === block.id
              const toggleEvent = () => setOpenEvent(isOpen ? null : block.id)
              const carousel = carousels[block.id]
              const blockImages = block.events?.map((event) => event.image) || block.images
              const loopImages = [
                blockImages[blockImages.length - 1],
                ...blockImages,
                blockImages[0]
              ]
              const realIndex = (carousel.slide - 1 + blockImages.length) % blockImages.length
              const activeDescription =
                block.events?.[realIndex]?.description || block.description

              return (
                <article key={block.id} className="card ministry-event-card">
                  <div
                    className="ministry-event-card__trigger"
                    role="button"
                    tabIndex={0}
                    onClick={toggleEvent}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        toggleEvent()
                      }
                    }}
                    aria-expanded={isOpen}
                  >
                    <div
                      className="ministry-carousel"
                      onTouchStart={(event) => {
                        const startX = event.touches[0].clientX
                        updateCarousel(block.id, (state) => ({
                          ...state,
                          touchStartX: startX
                        }))
                      }}
                      onTouchEnd={(event) => {
                        if (carousel.touchStartX === null) {
                          return
                        }

                        const touchEndX = event.changedTouches[0].clientX
                        const deltaX = carousel.touchStartX - touchEndX

                        if (deltaX > 40) {
                          goToNextSlide(block.id)
                        } else if (deltaX < -40) {
                          goToPreviousSlide(block.id)
                        }

                        updateCarousel(block.id, (state) => ({
                          ...state,
                          touchStartX: null
                        }))
                      }}
                    >
                      <div
                        className="ministry-carousel__track"
                        style={{
                          transform: `translateX(-${carousel.slide * 100}%)`,
                          transition: carousel.transition ? 'transform 320ms ease' : 'none'
                        }}
                        onTransitionEnd={() =>
                          handleCarouselTransitionEnd(block.id, blockImages.length)
                        }
                      >
                        {loopImages.map((imageSrc, index) => (
                          <div key={`${block.id}-${imageSrc}-${index}`} className="ministry-carousel__slide">
                            <img src={imageSrc} alt={`${block.title} ${index + 1}`} />
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="ministry-carousel__control ministry-carousel__control--prev"
                        onClick={(event) => {
                          event.stopPropagation()
                          goToPreviousSlide(block.id)
                        }}
                        aria-label={`Imagen anterior de ${block.title}`}
                      >
                        {'<'}
                      </button>
                      <button
                        type="button"
                        className="ministry-carousel__control ministry-carousel__control--next"
                        onClick={(event) => {
                          event.stopPropagation()
                          goToNextSlide(block.id)
                        }}
                        aria-label={`Imagen siguiente de ${block.title}`}
                      >
                        {'>'}
                      </button>

                      <div className="ministry-carousel__dots">
                        {blockImages.map((_, index) => (
                          <span
                            key={`${block.id}-dot-${index}`}
                            className={`ministry-carousel__dot ${
                              realIndex === index ? 'ministry-carousel__dot--active' : ''
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <h4>{block.title}</h4>
                  </div>
                  <div
                    className={`ministry-event-card__content ${
                      isOpen ? 'ministry-event-card__content--open' : ''
                    }`}
                  >
                    <p
                      key={`${block.id}-${realIndex}`}
                      className="ministry-event-card__description ministry-event-card__description--animated"
                    >
                      {activeDescription}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <div className="hero__actions ministry-detail__actions">
          <a className="btn btn--ghost" href="#ministerios">
            Volver a ministerios
          </a>
          <a className="btn btn--primary" href="#contacto">
            Solicitar informacion
          </a>
        </div>
      </div>
    </section>
  )
}

export default MinistryDetail
