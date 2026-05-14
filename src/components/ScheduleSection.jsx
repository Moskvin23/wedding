import { useEffect, useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import flowerLeft from '../assets/flower 9.png'
import flowerRight from '../assets/Flower (2).png'

function ScheduleSection({ schedule }) {
  const ref = useScrollReveal({ outFactor: 2.5 })
  const adaptiveQuery = '(max-width: 1100px)'
  const [isAdaptive, setIsAdaptive] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(adaptiveQuery).matches
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mq = window.matchMedia(adaptiveQuery)
    const handleChange = (event) => setIsAdaptive(event.matches)

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleChange)
      return () => mq.removeEventListener('change', handleChange)
    }

    mq.addListener(handleChange)
    return () => mq.removeListener(handleChange)
  }, [])

  const formatMobileBreaks = (text) => {
    if (typeof text !== 'string') return text
    return text.replaceAll('[br]', isAdaptive ? '\n' : ' ')
  }

  return (
    <section className="schedule-section">
      <img className="schedule-flower schedule-flower--left" src={flowerLeft} alt="" aria-hidden="true" />
      <img className="schedule-flower schedule-flower--right" src={flowerRight} alt="" aria-hidden="true" />
      <div className="page-inner" ref={ref}>
        <h2 className="schedule-title">{schedule.title}</h2>
        {schedule.days.map((day, index) => (
          <div key={day.label} className="schedule-day">
            {index > 0 && (
              <h2 className="schedule-title schedule-day-label">{day.label}</h2>
            )}
            <div className="schedule-list">
              {day.events.map((event) => (
                <article key={`${day.label}-${event.time}-${event.title}`} className="schedule-item">
                  <span>{event.time}</span>
                  <div>
                    <p>{formatMobileBreaks(event.title)}</p>
                    <small>{formatMobileBreaks(event.description)}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ScheduleSection
