import { useState } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywcZhVj86wKzalrfh1qlLPA1OdZP6vPtvyVlNH8lA-wbheuuUgw1mJE_ry9RS6wL03/exec'

const DRINKS = [
  'Біле вино',
  'Віскі',
  'Червоне вино',
  'Коньяк',
  'Шампанське',
  'Ром',
  'Пиво',
  'Джин',
  'Горілка',
  'Безалкогольні напої',
]

function RSVPSection({ rsvp }) {
  const [form, setForm] = useState({
    name: '',
    attending: 'yes',
    guests: 1,
    drinks: [],
    transport: 'no',
    overnight: 'no',
    secondDay: 'no',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDrinkToggle = (drink) => {
    setForm((prev) => ({
      ...prev,
      drinks: prev.drinks.includes(drink)
        ? prev.drinks.filter((d) => d !== drink)
        : [...prev.drinks, drink],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    } catch (err) {
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

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="rsvp-field rsvp-field--name">
            <label className="rsvp-label">
              Ваше ім'я <span className="rsvp-required">*</span>
            </label>
            <input
              className="rsvp-input"
              type="text"
              required
              placeholder="Введіть ваше повне ім'я"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="rsvp-field rsvp-field--attending">
            <label className="rsvp-label">
              Чи будете присутні? <span className="rsvp-required">*</span>
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
                Так, і радісно буду!
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
              Кількість гостей <span className="rsvp-required">*</span>
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
            <p className="rsvp-guests-hint">Включаючи вас</p>
          </div>

          <div className="rsvp-field rsvp-field--drinks">
            <label className="rsvp-label">
              Які маєте побажання до напоїв? <span className="rsvp-required">*</span>
            </label>
            <p className="rsvp-hint">Можна обрати кілька варіантів</p>
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

          <div className="rsvp-field">
            <label className="rsvp-label">
              Чи потрібно допомогти з добиранням від Львова до локації?{' '}
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
                Так, потрібно
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
              Чи бажаєте залишитись на ніч у локації?{' '}
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

          <div className="rsvp-field">
            <label className="rsvp-label">
              Чи бажаєте провести з нами другий день святкування?{' '}
              <span className="rsvp-required">*</span>
            </label>
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="secondDay"
                  value="yes"
                  checked={form.secondDay === 'yes'}
                  onChange={() => setForm({ ...form, secondDay: 'yes' })}
                />
                Так, хочу залишитись
              </label>
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="secondDay"
                  value="no"
                  checked={form.secondDay === 'no'}
                  onChange={() => setForm({ ...form, secondDay: 'no' })}
                />
                Ні, дякую
              </label>
            </div>
          </div>

          {error && <p className="rsvp-error">{error}</p>}
          <button type="submit" className="rsvp-submit" disabled={loading}>
            {loading ? 'Надсилаємо...' : 'Надіслати'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default RSVPSection
