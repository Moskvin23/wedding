import HeroSection from './components/HeroSection'
import WelcomeSection from './components/WelcomeSection'
import LocationSection from './components/LocationSection'
import VenuePhotosSection from './components/VenuePhotosSection'
import CalendarSection from './components/CalendarSection'
import ScheduleSection from './components/ScheduleSection'
import DressCodeSection from './components/DressCodeSection'
import RSVPSection from './components/RSVPSection'
import FooterSection from './components/FooterSection'
import { invitationData } from './data/weddingData'
import useFormFocusLock from './hooks/useFormFocusLock'
import './App.css'

function App() {
  useFormFocusLock()

  const { welcome, location, schedule, dressCode, rsvp, footer } = invitationData

  return (
    <main className="invitation-app">
      <HeroSection />
      <WelcomeSection welcome={welcome} />
      <LocationSection location={location} />
      <VenuePhotosSection />
      <CalendarSection />
      <ScheduleSection schedule={schedule} />
      <DressCodeSection dressCode={dressCode} />
      <RSVPSection rsvp={rsvp} />
      <FooterSection footer={footer} />
    </main>
  )
}

export default App
