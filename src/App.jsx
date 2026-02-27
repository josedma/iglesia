import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import Schedule from './components/Schedule'
import Ministries from './components/Ministries'
import MinistryDetail from './components/MinistryDetail'
import Cta from './components/Cta'
import Footer from './components/Footer'
import { ministries } from './data/content'
import { withBase } from './utils/asset'

const heroSlides = ['/1.webp', '/2.webp', '/3.webp'].map(withBase)

function getRouteFromHash() {
  const hash = window.location.hash || '#inicio'
  const ministryMatch = hash.match(/^#\/ministerios\/([a-z0-9-]+)$/i)

  if (ministryMatch) {
    return { type: 'ministry', slug: ministryMatch[1].toLowerCase() }
  }

  return { type: 'home' }
}

function App() {
  const [route, setRoute] = useState(() => getRouteFromHash())
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const selectedMinistry = useMemo(() => {
    if (route.type !== 'ministry') {
      return null
    }

    return ministries.find((ministry) => ministry.slug === route.slug) || null
  }, [route])

  const isMinistryPage = Boolean(selectedMinistry)

  const goToHeroSlide = (index) => {
    setActiveHeroSlide((index + heroSlides.length) % heroSlides.length)
  }

  const goToPreviousHeroSlide = () => {
    setActiveHeroSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToNextHeroSlide = () => {
    setActiveHeroSlide((current) => (current + 1) % heroSlides.length)
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (route.type !== 'ministry') {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [route])

  return (
    <>
      <section className="top-hero">
        <div className="top-hero__carousel" aria-hidden="true">
          {heroSlides.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={`top-hero__slide ${
                index === activeHeroSlide ? 'top-hero__slide--active' : ''
              }`}
            />
          ))}
        </div>
        {!isMinistryPage && (
          <div className="top-hero__controls">
            <button
              type="button"
              className="top-hero__control-btn"
              onClick={goToPreviousHeroSlide}
              aria-label="Imagen anterior"
            >
              {'<'}
            </button>
            <div className="top-hero__dots">
              {heroSlides.map((_, index) => (
                <button
                  key={`hero-dot-${index}`}
                  type="button"
                  className={`top-hero__dot ${index === activeHeroSlide ? 'top-hero__dot--active' : ''}`}
                  onClick={() => goToHeroSlide(index)}
                  aria-label={`Ir a la imagen ${index + 1}`}
                  aria-current={index === activeHeroSlide ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              className="top-hero__control-btn"
              onClick={goToNextHeroSlide}
              aria-label="Imagen siguiente"
            >
              {'>'}
            </button>
          </div>
        )}
        <Navbar forceSolid={isMinistryPage} />
        {!isMinistryPage && <Hero />}
      </section>
      <main>
        {isMinistryPage ? (
          <>
            <MinistryDetail ministry={selectedMinistry} />
            <Cta />
          </>
        ) : (
          <>
            <Pillars />
            <Schedule />
            <Ministries />
            <Cta />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
