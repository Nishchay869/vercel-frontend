import React from "react";
import "./Her03D.css";

export default function Hero3D() {
  return (
    <section className="hero-section">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Stars/Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <div className="cross-icon">
          <svg viewBox="0 0 100 120" className="cross-svg">
            <path
              d="M50 10 L50 110 M15 40 L85 40"
              stroke="url(#crossGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="crossGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F4DE97" />
                <stop offset="100%" stopColor="#D49B00" />
              </linearGradient>
            </defs>
          </svg>
          <div className="cross-glow"></div>
        </div>

        <h1 className="hero-title">
          The Horeb Telugu Assembly <span class="text-gold-200">Church</span>
        </h1>

        <p className="hero-subtitle">"Where Faith Meets Family"</p>

        <div className="hero-buttons">
          <button className="btn btn-primary pointer-events-none">
            <span>Join Us This Sunday</span>
          </button>
        </div>

        {/* Service Times */}
        <div className="service-times">
          <div className="time-card">
            <span className="time-icon">⛪</span>
            <span className="time-label">Sunday Service</span>
            <span className="time-value">9:00 AM & 11:00 AM</span>
          </div>
          <div className="time-card">
            <span className="time-icon">📖</span>
            <span className="time-label">Bible Study</span>
            <span className="time-value">Wednesday 7:00 PM</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
