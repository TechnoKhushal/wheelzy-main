import React from "react";

export default function Navbar({ onOpenLogin, onOpenDriverModal, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo with Image on Left */}
        <a href="#home" className="brand-logo">
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
        </a>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li><a href="#home" className="nav-link active">Home</a></li>
            <li><a href="#fleet" className="nav-link">Vehicles</a></li>
            <li><a href="#drivers" className="nav-link">Drivers</a></li>
            <li><a href="#why-wheelzy" className="nav-link">Why Us</a></li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {/* Become a Driver Button */}
          <button className="btn-ghost-gold" onClick={onOpenDriverModal}>
            <span>🛡️</span>
            Become a Driver
          </button>

          {/* Login / User Profile Button */}
          {user ? (
            <div className="user-profile-badge">
              <span className="user-avatar-circle">👤</span>
              <span className="user-name-text">{user.name}</span>
              <button className="btn-logout" onClick={onLogout} title="Log out">
                ✕
              </button>
            </div>
          ) : (
            <button className="btn-solid-gold" onClick={onOpenLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}