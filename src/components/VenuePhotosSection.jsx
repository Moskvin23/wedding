import venueForest from '../assets/venue-forest.png'
import venueLake from '../assets/venue-lake.png'
import venueEvening from '../assets/venue-evening.png'
import venueTable from '../assets/venue-table.png'

const photos = [
  { src: venueLake, alt: 'Явір Резорт — озеро' },
  { src: venueTable, alt: 'Явір Резорт — святковий стіл' },
  { src: venueForest, alt: 'Явір Резорт — ліс' },
  { src: venueEvening, alt: 'Явір Резорт — вечірня шатра' },
]

function VenuePhotosSection() {
  return (
    <section className="venue-photos-section">
      <div className="venue-photos-grid">
        {photos.map((photo, i) => (
          <div key={i} className="venue-photo-wrap">
            <img className="venue-photo" src={photo.src} alt={photo.alt} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default VenuePhotosSection
