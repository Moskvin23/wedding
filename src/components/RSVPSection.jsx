import { useRef, useState } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJrRcDh-KPSYcr8YRCpNx5B1yihk9h4FytGkSP5Cr6cxB2WVsdOl3mhTtUfumeENP4/exec'

const DRINKS = [
  'Безалкогольні напої',
  'Пиво',
  'Вино (біле/червоне/ігристе)',
  'Міцний алкоголь (віскі/джин/ром/інше)',
]

function RSVPSection({ rsvp }) {
  const [form, setForm] = useState({
    name: '',
    attending: 'yes',
    guests: 1,
    drinks: [],
    menuPreferences: '',
    transport: 'no',
    overnight: 'no',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nameRef = useRef(null)

  const resizeNameField = () => {
    const field = nameRef.current
    if (!field) return
    field.style.height = 'auto'
    field.style.height = `${field.scrollHeight}px`
  }

  const handleDrinkToggle = (drink) => {
    setForm((prev) => ({
      ...prev,
      drinks: prev.drinks.includes(drink)
        ? prev.drinks.filter((d) => d !== drink)
        : [...prev.drinks, drink],
    }))
  }

  const preventEnterSubmit = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault()
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      setError('Щось пішло не так. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section className="rsvp-section">
        <div className="page-inner rsvp-inner">
          <h2 className="rsvp-title">{rsvp.title}</h2>
          <div className="rsvp-success">
            <p>Дякуємо! Ваша відповідь надіслана 🎉</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rsvp-section">
      <div className="page-inner rsvp-inner">
        <h2 className="rsvp-title">{rsvp.title}</h2>
        <p className="rsvp-text">{rsvp.text}</p>

        <form
          className="rsvp-form"
          onSubmit={(e) => e.preventDefault()}
          onKeyDown={preventEnterSubmit}
        >
          <div className="rsvp-field rsvp-field--attending">
            <label className="rsvp-label">
              Чи будете ви присутні? <span className="rsvp-required">*</span>
            </label>
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={form.attending === 'yes'}
                  onChange={() => setForm({ ...form, attending: 'yes' })}
                />
               Так, з радістю буду
              </label>
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={form.attending === 'no'}
                  onChange={() => setForm({ ...form, attending: 'no' })}
                />
                На жаль, не зможу
              </label>
            </div>
          </div>

          <div className="rsvp-field rsvp-field--compact">
            <label className="rsvp-label">
            Кількість гостей (включаючи вас)  <span className="rsvp-required">*</span>
            </label>
            <input
              className="rsvp-input rsvp-input--number"
              type="number"
              min="1"
              max="10"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              onBlur={(e) => {
                const val = parseInt(e.target.value, 10)
                setForm({ ...form, guests: isNaN(val) || val < 1 ? 1 : val > 10 ? 10 : val })
              }}
            />
          </div>

          <div className="rsvp-field rsvp-field--name">
            <label className="rsvp-label">
              Ім’я та прізвище <span className="rsvp-required">*</span>
            </label>
            <textarea
              ref={nameRef}
              className="rsvp-input rsvp-input--multiline"
              required
              rows={1}
              placeholder="Ведіть повні імена всіх гостей"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value })
                resizeNameField()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  requestAnimationFrame(resizeNameField)
                }
              }}
            />
          </div>

          <div className="rsvp-field rsvp-field--drinks">
            <label className="rsvp-label">
              Які ваші вподобання до напоїв? <span className="rsvp-required">*</span>
            </label>
            <p className="rsvp-hint">Можна обрати декілька варіантів</p>
            <div className="rsvp-drinks-grid">
              {DRINKS.map((drink) => (
                <label key={drink} className="rsvp-check-label">
                  <input
                    type="checkbox"
                    checked={form.drinks.includes(drink)}
                    onChange={() => handleDrinkToggle(drink)}
                  />
                  {drink}
                </label>
              ))}
            </div>
          </div>

          <div className="rsvp-field rsvp-field--compact">
            <label className="rsvp-label">
              Чи є у вас особливі побажання щодо меню?
            </label>
            <textarea
              className="rsvp-input rsvp-input--menu"
              rows={3}
              placeholder="Алергії, дієтичні обмеження або продукти, які ви не вживаєте"
              value={form.menuPreferences}
              onChange={(e) => setForm({ ...form, menuPreferences: e.target.value })}
            />
          </div>

          <div className="rsvp-field">
            <label className="rsvp-label">
              Чи потрібна допомога з добиранням зі Львова до локації?{' '}
              <span className="rsvp-required">*</span>
            </label>
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="transport"
                  value="yes"
                  checked={form.transport === 'yes'}
                  onChange={() => setForm({ ...form, transport: 'yes' })}
                />
                Так, потрібна
              </label>
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="transport"
                  value="no"
                  checked={form.transport === 'no'}
                  onChange={() => setForm({ ...form, transport: 'no' })}
                />
                Ні, дістануся самостійно
              </label>
            </div>
          </div>

          <div className="rsvp-field">
            <label className="rsvp-label">
              Чи бажаєте залишитися на ніч у локації?{' '}
              <span className="rsvp-required">*</span>
            </label>
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="overnight"
                  value="yes"
                  checked={form.overnight === 'yes'}
                  onChange={() => setForm({ ...form, overnight: 'yes' })}
                />
                Так, хочу залишитись
              </label>
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="overnight"
                  value="no"
                  checked={form.overnight === 'no'}
                  onChange={() => setForm({ ...form, overnight: 'no' })}
                />
                Ні, дякую
              </label>
            </div>
          </div>

          {error && <p className="rsvp-error">{error}</p>}
          <button type="button" className="rsvp-submit" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Надсилаємо...' : 'Надіслати'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default RSVPSection
