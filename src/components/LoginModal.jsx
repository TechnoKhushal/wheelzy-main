import React, { useState } from "react";
import { api } from "../services/api";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Phone OTP remains demo for now
    if (loginMethod === "phone") {
      if (!phone) {
        setError("Please enter your phone number.");
        return;
      }

      if (!otpSent) {
        setOtpSent(true);
        return;
      }

      if (!otp || otp.length !== 4) {
        setError("Please enter a 4-digit OTP.");
        return;
      }

      const userName =
        name || `User (+91 ${phone.slice(-4)})`;

      onLoginSuccess({
        name: userName,
        phone,
        email: "",
      });

      onClose();
      return;
    }

    // Real Email Login/Register
    try {
      setLoading(true);

      let result;

      if (isSignUp) {
        result = await api.register({
          name,
          email,
          password,
        });
      } else {
        result = await api.login({
          email,
          password,
        });
      }

      const userData = result.user || result;

      onLoginSuccess(userData);

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setOtp("");
      setOtpSent(false);

      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (signup) => {
    setIsSignUp(signup);
    setError("");
    setOtpSent(false);
    setOtp("");
  };

  const switchMethod = (method) => {
    setLoginMethod(method);
    setError("");
    setOtpSent(false);
    setOtp("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>

        {/* Header */}
        <div className="modal-header">
          <div
            className="brand-badge-icon"
            style={{
              margin: "0 auto 0.75rem",
              width: 44,
              height: 44,
            }}
          >
            ⚡
          </div>

          <h2 className="modal-title">
            {isSignUp
              ? "Create Your Account"
              : "Welcome Back"}
          </h2>

          <p className="modal-subtitle">
            {isSignUp
              ? "Sign up to rent rides & hire verified chauffeurs"
              : "Log in to manage bookings, rides & invoices"}
          </p>
        </div>

        {/* Phone / Email Tabs */}
        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab ${
              loginMethod === "phone" ? "active" : ""
            }`}
            onClick={() => switchMethod("phone")}
          >
            📱 Mobile OTP
          </button>

          <button
            type="button"
            className={`modal-tab ${
              loginMethod === "email" ? "active" : ""
            }`}
            onClick={() => switchMethod("email")}
          >
            ✉️ Email ID
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="modal-form"
        >
          {/* Name only during signup */}
          {isSignUp && (
            <div className="modal-input-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Dinesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          {/* PHONE LOGIN */}
          {loginMethod === "phone" ? (
            <>
              <div className="modal-input-group">
                <label>Mobile Number</label>

                <div className="phone-input-row">
                  <span className="country-code">
                    +91
                  </span>

                  <input
                    type="tel"
                    placeholder="98765 43210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    required
                  />
                </div>
              </div>

              {otpSent && (
                <div className="modal-input-group">
                  <label>Enter 4-Digit OTP</label>

                  <input
                    type="text"
                    placeholder="• • • •"
                    maxLength={4}
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    required
                    autoFocus
                  />

                  <span className="helper-text">
                    Demo OTP: Enter any 4 digits
                  </span>
                </div>
              )}
            </>
          ) : (
            /* EMAIL LOGIN */
            <>
              <div className="modal-input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="modal-input-group">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
            </>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                color: "#ff6b6b",
                background: "rgba(255, 80, 80, 0.1)",
                border: "1px solid rgba(255, 80, 80, 0.25)",
                padding: "0.75rem",
                borderRadius: "8px",
                fontSize: "0.8rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-modal-primary"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : loginMethod === "phone" && !otpSent
              ? "Send OTP →"
              : isSignUp
              ? "Sign Up & Continue"
              : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <div className="modal-footer">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => switchMode(false)}>
                Log in
              </span>
            </p>
          ) : (
            <p>
              New to Wheelzy?{" "}
              <span onClick={() => switchMode(true)}>
                Create an account
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}