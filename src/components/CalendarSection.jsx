import useScrollReveal from '../hooks/useScrollReveal'
import calendarMarker from '../assets/calendar-marker.svg'

function CalendarSection() {
  const ref = useScrollReveal()
  const startOffset = 5
  const totalDays = 30
  const weddingDay = 23

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)

  return (
    <section className="calendar-section">
      <div className="page-inner calendar-inner" ref={ref}>
        <div className="calendar-header">
          <span className="calendar-month">23 Серпня</span>
        </div>

        <div className="calendar-grid">
          {cells.map((day, i) => (
            <div
              key={i}
              className={`calendar-day${day === weddingDay ? ' calendar-day--wedding' : ''}${!day ? ' calendar-day--empty' : ''}`}
            >
              {day === weddingDay ? (
                <span className="calendar-day__marker">
                  <img src={calendarMarker} alt="" aria-hidden="true" className="calendar-day__marker-img" />
                  <span className="calendar-day__marker-num">{day}</span>
                </span>
              ) : (day || '')}
            </div>
          ))}
        </div>

        <p className="calendar-label">Просимо залишити цей день для нас - обіцяємо тепло, щирість та особливу атмосферу!</p>
      </div>
    </section>
  )
}

export default CalendarSection
