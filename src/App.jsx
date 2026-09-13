import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginModal from "./components/LoginModal";
import DriverModal from "./components/DriverModal";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [user, setUser] = useState(null); // stores { name, phone, email } when logged in

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenDriverModal={() => setIsDriverModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Home Page */}
      <Home onOpenDriverModal={() => setIsDriverModalOpen(true)} />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <DriverModal
        isOpen={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <div className="brand-logo" style={{ marginBottom: "1rem" }}>
              <div className="brand-logo-img-wrapper">
                <img
                  src="/wheelzy-logo.png"
                  alt="Wheelzy Logo"
                  className="brand-logo-img"
                />
              </div>
              <div className="brand-text">
                <div className="brand-title">WHEELZY</div>
                <div className="brand-subtitle">YOUR JOURNEY PARTNER</div>
              </div>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", maxWidth: "300px" }}>
              India's premier all-in-one vehicle rental and verified chauffeur network.
            </p>
          </div>

          <div className="footer-col">
            <h5>Vehicles</h5>
            <ul className="footer-links">
              <li><a href="#fleet">Self Drive Sedans</a></li>
              <li><a href="#fleet">7-Seater SUVs</a></li>
              <li><a href="#fleet">Force Travellers</a></li>
              <li><a href="#fleet">Luxury Buses</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Drivers</h5>
            <ul className="footer-links">
              <li><a href="#drivers">Hire Personal Driver</a></li>
              <li><a href="#drivers">Outstation Chauffeurs</a></li>
              <li><button onClick={() => setIsDriverModalOpen(true)} style={{ background: "none", border: "none", color: "#f59e0b", cursor: "pointer", font: "inherit", padding: 0 }}>Apply as a Driver</button></li>
              <li><a href="#drivers">Verification Process</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contact & Support</h5>
            <ul className="footer-links">
              <li><a href="#">24x7 Roadside Assistance</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">support@wheelzy.in</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Wheelzy Inc. All rights reserved.</div>
          <div>Crafted for seamless road journeys.</div>
        </div>
      </footer>
    </div>
  );
}