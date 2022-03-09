import TourCard from "../TourCard/TourCard"

const TourSection = () => {
  return (
    <section id="tour" className="tour-dates-section">
      <div className="tour-dates-wrapper container py-5">
        <h2>TOUR DATES</h2>
        <em className="text-muted mt-3">Jangan lupa saksikan kami live</em>
        <div className="tour-cards-container mt-3">
          <TourCard />
          <TourCard />
          <TourCard />
        </div>
      </div>
    </section>
  )
}

export default TourSection