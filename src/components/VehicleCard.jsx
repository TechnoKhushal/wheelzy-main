import React from "react";

export default function VehicleCard({ vehicle }) {
  const price = Number(vehicle.price || 0);

  return (
    <div className="vehicle-card">
      <div className="vehicle-image-box">
        <img
          src={
            
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80"
          }
          alt={vehicle.name}
          className="vehicle-image"
          loading="lazy"
        />

        <div className="vehicle-category-badge">
          {vehicle.category}
        </div>

        <div className="vehicle-rating-badge">
          <span>★</span> {vehicle.rating || "4.8"}
        </div>
      </div>

      <div className="vehicle-body">
        <h3 className="vehicle-title">
          {vehicle.name}
        </h3>

        <div className="vehicle-specs">
          <div className="spec-pill">
            <span>👥</span>
            {vehicle.seats || 5} Seats
          </div>

          <div className="spec-pill">
            <span>⚙️</span>
            {vehicle.transmission || "Manual"}
          </div>

          <div className="spec-pill">
            <span>⛽</span>
            {vehicle.fuel || "Petrol"}
          </div>
        </div>

        <div className="vehicle-footer">
          <div className="price-box">
            <span className="price-sub">
              Starting from
            </span>

            <div className="price-amount">
              ₹{price.toLocaleString("en-IN")}
              <span>/day</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-rent"
            onClick={() =>
              alert(
                `Selected ${vehicle.name}. Booking portal opening!`
              )
            }
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}