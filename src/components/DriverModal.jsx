import React, { useState } from "react";

export default function DriverModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "Delhi NCR",
    licenseType: "Commercial (LMV-TR)",
    experience: "3-5 Years",
    vehicleTypes: ["Sedans", "SUVs"]
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container driver-modal-wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>✕</button>

        {!submitted ? (
          <>
            {/* Modal Header */}
            <div className="modal-header">
              <span className="driver-modal-pill">🛡️ VERIFIED CHAUFFEUR PARTNER</span>
              <h2 className="modal-title" style={{ marginTop: "0.5rem" }}>Drive with Wheelzy</h2>
              <p className="modal-subtitle">
                Earn ₹35,000 to ₹50,000/month driving customer vehicles or our luxury fleet. Daily payouts & zero commission for first 30 days!
              </p>
            </div>

            {/* Perks Highlight Banner */}
            <div className="driver-perks-bar">
              <div className="perk-item">
                <span className="perk-icon">💰</span>
                <div>
                  <strong>Daily Payouts</strong>
                  <p>Instant UPI transfer</p>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">⏰</span>
                <div>
                  <strong>Flexible Timings</strong>
                  <p>Part-time or Full-time</p>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">🏥</span>
                <div>
                  <strong>₹5L Insurance</strong>
                  <p>Accidental cover</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-two-col">
                <div className="modal-input-group">
                  <label>Full Name (as on Driving License)</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Singh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-input-group">
                  <label>Mobile Number (for verification)</label>
                  <div className="phone-input-row">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-two-col">
                <div className="modal-input-group">
                  <label>City of Operation</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai & Navi Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chandigarh">Chandigarh / Tri-City</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                </div>

                <div className="modal-input-group">
                  <label>License Type</label>
                  <select
                    value={formData.licenseType}
                    onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                  >
                    <option value="Commercial (LMV-TR)">Commercial LMV (Cars, Taxis)</option>
                    <option value="Private (LMV-NT)">Private LMV (Personal Cars)</option>
                    <option value="Heavy (HMV / Bus)">Heavy Vehicle (HMV / Buses)</option>
                  </select>
                </div>
              </div>

              <div className="modal-input-group">
                <label>Driving Experience</label>
                <div className="radio-pill-group">
                  {["1-2 Years", "3-5 Years", "5-10 Years", "10+ Years"].map((exp) => (
                    <button
                      type="button"
                      key={exp}
                      className={`radio-pill ${formData.experience === exp ? "active" : ""}`}
                      onClick={() => setFormData({ ...formData, experience: exp })}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-modal-primary" style={{ marginTop: "1rem" }}>
                Submit Driver Application →
              </button>
            </form>
          </>
        ) : (
          /* Submission Success State */
          <div className="driver-success-box">
            <div className="success-icon-badge">✓</div>
            <h2>Application Received!</h2>
            <p>
              Thank you, <strong>{formData.fullName || "Partner"}</strong>. Our Driver Onboarding Team will verify your details and call you on <strong>+91 {formData.phone}</strong> within 24 hours.
            </p>
            <div className="success-steps">
              <div className="step-item">
                <span>1</span> Phone Background Verification
              </div>
              <div className="step-item">
                <span>2</span> In-Person Document & Driving Test
              </div>
              <div className="step-item">
                <span>3</span> Start Receiving Bookings & Daily Earnings!
              </div>
            </div>
            <button className="btn-solid-gold" style={{ marginTop: "1.5rem" }} onClick={handleClose}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}