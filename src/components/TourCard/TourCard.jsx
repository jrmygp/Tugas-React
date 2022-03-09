import newyork from './newyork.jpeg'

const city = "New York"

const TourCard = () => {
  return (
    <div className="tour-card">
      <div className="tour-card-image">
        <img src={newyork} alt="" />
      </div>
      <div className="tour-card-content">
        <p className="city mb-3">{city}</p>
        <p className="date mb-3">Fri 27 Nov 2016</p>
        <p className="description">Praesent tincidunt sed tellus ut rutrum sed
          vitae justo.
        </p>
        <button>Buy Tickets</button>
      </div>
    </div>
  )
}

export default TourCard;