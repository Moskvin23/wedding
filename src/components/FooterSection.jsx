import { useState, useEffect } from 'react'
import flowerLeft from '../assets/flower-left.svg'
import flowerRight from '../assets/flower-right.svg'

const WEDDING_DATE = new Date('2026-08-23T00:00:00')

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft())

  function calcTimeLeft() {
    const diff = WEDDING_DATE - new Date()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

function plural(n, one, few, many) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 19) return many
  if (mod10 === 1) return one
  if (mod10 >= 2 && mod10 <= 4) return few
  return many
}

function FooterSection({ footer }) {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <footer className="site-footer">
      <img className="footer-flower footer-flower--left" src={flowerLeft} alt="" aria-hidden="true" />
      <img className="footer-flower footer-flower--right" src={flowerRight} alt="" aria-hidden="true" />
      <div className="page-inner footer-inner">
        <p className="footer-heading">Чекаємо на вас через</p>
        <div className="footer-countdown">
          <div className="footer-countdown-item">
            <span className="footer-countdown-num">{days}</span>
            <span className="footer-countdown-label">{plural(days, 'день', 'дні', 'днів')}</span>
          </div>
          <div className="footer-countdown-item">
            <span className="footer-countdown-num">{hours}</span>
            <span className="footer-countdown-label">{plural(hours, 'година', 'години', 'годин')}</span>
          </div>
          <div className="footer-countdown-item">
            <span className="footer-countdown-num">{minutes}</span>
            <span className="footer-countdown-label">{plural(minutes, 'хвилина', 'хвилини', 'хвилин')}</span>
          </div>
          <div className="footer-countdown-item">
            <span className="footer-countdown-num">{seconds}</span>
            <span className="footer-countdown-label">{plural(seconds, 'секунда', 'секунди', 'секунд')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
