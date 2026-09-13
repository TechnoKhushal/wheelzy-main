import React, { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import VehicleCard from "../components/VehicleCard";
import DriverCard from "../components/DriverCard";
import { api } from "../services/api";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMode, setActiveMode] = useState("self");

  const [pickupLocation, setPickupLocation] = useState("Delhi NCR, India");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Database data
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Loading / error states
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD DATA FROM BACKEND
  // =========================
  useEffect(() => {
    const loadData = async () => {
      try {
        setError("");

        const [vehicleData, driverData] = await Promise.all([
          api.getVehicles(),
          api.getDrivers(),
        ]);

        setVehicles(
          Array.isArray(vehicleData)
            ? vehicleData
            : vehicleData.vehicles || []
        );

        setDrivers(
          Array.isArray(driverData)
            ? driverData
            : driverData.drivers || []
        );
      } catch (err) {
        console.error("Failed to load Wheelzy data:", err);
        setError(err.message || "Failed to load data from server.");
      } finally {
        setLoadingVehicles(false);
        setLoadingDrivers(false);
      }
    };

    loadData();
  }, []);

  // =========================
  // FILTER VEHICLES
  // =========================
  const filteredVehicles =
    activeCategory === "all"
      ? vehicles
      : vehicles.filter((vehicle) =>
          vehicle.category
            ?.toLowerCase()
            .includes(activeCategory.toLowerCase())
        );

  // =========================
  // SEARCH
  // =========================
  const handleSearch = () => {
    alert(
      `Searching ${activeMode.toUpperCase()} rides in ${pickupLocation} from ${
        pickupDate || "today"
      } to ${returnDate || "tomorrow"}!`
    );
  };

  return (
    <main>
      {/* Category Pills Bar */}
      <CategoryBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section" id="home">
        <div className="hero-pill-badge">
          <span>🚗</span> WHEELZY • YOUR JOURNEY PARTNER
        </div>

        <h1 className="hero-title">
          RENT YOUR <br />
          <span className="highlight">PERFECT RIDE</span>
        </h1>

        <p className="hero-subtitle">
          From compact cars and luxury SUVs to Force Travellers and private
          buses — rent with or without a background-verified chauffeur.
        </p>

        {/* Floating Search Bar */}
        <div className="search-card">
          <div className="search-grid">
            <div className="search-field">
              <span className="search-field-icon">📍</span>

              <div className="search-field-content">
                <span className="search-field-label">
                  Pick-up Location
                </span>

                <input
                  type="text"
                  className="search-field-input"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="City or Airport"
                />
              </div>
            </div>

            <div className="search-field">
              <span className="search-field-icon">📅</span>

              <div className="search-field-content">
                <span className="search-field-label">
                  Pick-up Date
                </span>

                <input
                  type="date"
                  className="search-field-input"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
            </div>

            <div className="search-field">
              <span className="search-field-icon">🗓️</span>

              <div className="search-field-content">
                <span className="search-field-label">
                  Return Date
                </span>

                <input
                  type="date"
                  className="search-field-input"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>

            <button className="btn-search" onClick={handleSearch}>
              <span>🔍</span> SEARCH
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="modes-row">
          <div
            className={`mode-card ${
              activeMode === "self" ? "active" : ""
            }`}
            onClick={() => setActiveMode("self")}
          >
            <div className="mode-icon-circle">🚗</div>

            <div className="mode-info">
              <h4>Self Drive</h4>
              <p>Unlimited kms & freedom</p>
            </div>
          </div>

          <div
            className={`mode-card ${
              activeMode === "with-driver" ? "active" : ""
            }`}
            onClick={() => setActiveMode("with-driver")}
          >
            <div className="mode-icon-circle">👔</div>

            <div className="mode-info">
              <h4>With Chauffeur</h4>
              <p>Vehicle + Expert Driver</p>
            </div>
          </div>

          <div
            className={`mode-card ${
              activeMode === "hire-driver" ? "active" : ""
            }`}
            onClick={() => setActiveMode("hire-driver")}
          >
            <div className="mode-icon-circle">🛡️</div>

            <div className="mode-info">
              <h4>Hire Driver Only</h4>
              <p>For your personal vehicle</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          STATS
      ========================= */}
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-val">
            500<span>+</span>
          </div>
          <div className="stat-label">Active Vehicles</div>
        </div>

        <div className="stat-item">
          <div className="stat-val">
            1,500<span>+</span>
          </div>
          <div className="stat-label">Verified Drivers</div>
        </div>

        <div className="stat-item">
          <div className="stat-val">
            50,000<span>+</span>
          </div>
          <div className="stat-label">Trips Completed</div>
        </div>

        <div className="stat-item">
          <div className="stat-val">
            4.9<span>★</span>
          </div>
          <div className="stat-label">Customer Rating</div>
        </div>
      </div>

      {/* =========================
          FLEET SECTION
      ========================= */}
      <section className="section" id="fleet">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">
              EXPLORE OUR FLEET
            </div>

            <h2 className="section-title">
              Choose Your Ride
            </h2>
          </div>

          <a href="#fleet" className="view-all-link">
            View All Fleet <span>→</span>
          </a>
        </div>

        {loadingVehicles ? (
          <div className="loading-message">
            Loading vehicles...
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="loading-message">
            No vehicles found.
          </div>
        ) : (
          <div className="vehicle-grid">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================
          DRIVER SECTION
      ========================= */}
      <section className="section" id="drivers">
        <div className="driver-banner-box">
          <div className="driver-banner-content">
            <div className="section-eyebrow">
              NEED A DRIVER?
            </div>

            <h3>Your Vehicle. Our Verified Driver.</h3>

            <p>
              Don't want to drive through hectic traffic or long
              highway stretches? Hire a vetted, licensed, and insured
              professional driver for your personal car, SUV, or
              tempo traveller.
            </p>

            <div className="driver-checklist">
              <div className="check-item">
                <div className="check-badge-icon">✓</div>
                <span>
                  Government ID & Police Background Verified
                </span>
              </div>

              <div className="check-item">
                <div className="check-badge-icon">✓</div>
                <span>
                  Commercial & Heavy Vehicle Licensed
                </span>
              </div>

              <div className="check-item">
                <div className="check-badge-icon">✓</div>
                <span>
                  On-Demand Booking (Hourly & Daily Fares)
                </span>
              </div>
            </div>

            <button
              className="btn-solid-gold"
              onClick={() =>
                alert(
                  "Chauffeur matching system is ready. Select a driver below!"
                )
              }
            >
              Hire a Driver Now →
            </button>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "rgba(10, 13, 20, 0.7)",
                border:
                  "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "16px",
                padding: "2rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "0.5rem",
                }}
              >
                👨‍✈️
              </div>

              <h4
                style={{
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                }}
              >
                1,500+ Active Drivers
              </h4>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                }}
              >
                Available 24/7 across Delhi NCR, Mumbai,
                Bangalore, and all major highways.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Drivers */}
        {loadingDrivers ? (
          <div className="loading-message">
            Loading drivers...
          </div>
        ) : drivers.length === 0 ? (
          <div className="loading-message">
            No drivers found.
          </div>
        ) : (
          <div className="driver-grid">
            {drivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================
          WHY WHEELZY
      ========================= */}
      <section className="section" id="why-wheelzy">
        <div
          className="section-header"
          style={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div>
            <div className="section-eyebrow">
              WHY WHEELZY?
            </div>

            <h2 className="section-title">
              Travel Smarter & Safer
            </h2>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-circle">💎</div>

            <h4 className="feature-title">
              Transparent Pricing
            </h4>

            <p className="feature-desc">
              Zero hidden surge charges. Fuel and tolls clearly
              calculated upfront with zero surprises.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-circle">🛡️</div>

            <h4 className="feature-title">
              100% Verified Fleet
            </h4>

            <p className="feature-desc">
              Every car and bus undergoes regular 50-point safety
              and sanitization inspections.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-circle">⚡</div>

            <h4 className="feature-title">
              Instant Confirmation
            </h4>

            <p className="feature-desc">
              Book in under 60 seconds with instant doorstep
              delivery and 24/7 roadside assistance.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-circle">🔄</div>

            <h4 className="feature-title">
              Flexible Cancellation
            </h4>

            <p className="feature-desc">
              Plans change. Enjoy hassle-free 100% refunds up
              to 6 hours prior to pickup.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}