function LocationSection({ location }) {
  return (
    <section className="location-section">
      <div className="page-inner location-inner">
        <div className="location-copy">
          <h2 className="location-title">{location.title}</h2>
          <p className="location-venue location-venue--desktop">{location.venue}</p>
          <p className="location-venue location-venue--mobile">
            {location.venueMobile || location.venue}
          </p>
          {location.accommodationNote && (
            <p className="location-venue location-accommodation">{location.accommodationNote}</p>
          )}
          <a className="location-map-btn location-map-btn--desktop" href={location.mapUrl} target="_blank" rel="noreferrer">
            {location.mapLabel}
          </a>
        </div>
        <div className="location-map">
          <iframe
            title="Явір Резорт на карті"
            src="https://maps.google.com/maps?q=Явір+Резорт,+Стариці,+Львівська+область&z=10&hl=uk&output=embed"
            width="100%"
            height="320px"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="location-venue">{location.address}</p>
          <a className="location-map-btn location-map-btn--mobile" href={location.mapUrl} target="_blank" rel="noreferrer">
            {location.mapLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
