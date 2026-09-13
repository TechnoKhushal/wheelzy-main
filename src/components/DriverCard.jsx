import React from "react";

export default function DriverCard({ driver }) {
  const driverImage =
    driver.image ||
    driver.avatar ||
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80";

  const rating = driver.rating || "4.8";
  const experience = driver.experience || "3+ Years";
  const trips = driver.trips || 500;
  const rate = Number(driver.price || driver.rate || 1200);

  return (
    <div className="driver-card">

      <div className="driver-avatar-wrapper">
        <img
          src={driverImage}
          alt={driver.name || "Wheelzy Driver"}
          className="driver-avatar"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80";
          }}
        />

        <div className="verified-badge-mini">
          ✓
        </div>
      </div>

      <h4 className="driver-name">
        {driver.name || "Wheelzy Driver"}
      </h4>

      <div className="driver-status-badge">
        <span>●</span> Government Verified
      </div>

      <div className="driver-meta">

        <div className="meta-item">
          <span className="meta-label">
            Experience
          </span>

          <span className="meta-val">
            {experience}
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-label">
            Rating
          </span>

          <span className="meta-val">
            ★ {rating}
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-label">
            Trips
          </span>

          <span className="meta-val">
            {trips}+
          </span>
        </div>

      </div>

      <p
        style={{
          fontSize: "0.8rem",
          color: "#94a3b8",
          marginBottom: "0.85rem",
        }}
      >
        {driver.speciality ||
          "Professional & verified chauffeur"}
      </p>

      <button
        type="button"
        className="btn-hire-driver"
        onClick={() =>
          alert(
            `Driver ${driver.name} requested! A confirmation SMS will be sent.`
          )
        }
      >
        Book Driver (₹{rate.toLocaleString("en-IN")}/day)
      </button>

    </div>
  );
}