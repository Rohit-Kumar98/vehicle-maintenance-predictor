import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  BatteryCharging,
  BellRing,
  BarChart3,
  CalendarClock,
  Car,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Facebook,
  Fuel,
  Gauge,
  History,
  Instagram,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Twitter,
  Wrench,
  Zap
} from "lucide-react";
import "./styles.css";

const navItems = ["Home", "Features", "Predictor", "Contact"];
const API_URL = "http://127.0.0.1:8000/api/predict/";

const initialVehicleData = {
  Vehicle_Model: "",
  Maintenance_History: "",
  Reported_Issues: "",
  Vehicle_Age: "",
  Odometer_Reading: "",
  Days_Since_Last_Service: "",
  Service_History: "",
  Accident_History: "",
  Fuel_Efficiency: "",
  Tire_Condition: "",
  Brake_Condition: "",
  Battery_Status: ""
};

const formFields = [
  { name: "Vehicle_Model", label: "Vehicle Model", type: "select", placeholder: "Select model", options: ["Car", "SUV", "Truck", "Van", "Bus", "Motorcycle"] },
  { name: "Maintenance_History", label: "Maintenance History", type: "select", placeholder: "Select history", options: ["Good", "Average", "Poor"] },
  { name: "Reported_Issues", label: "Reported Issues", type: "number", min: "0", max: "5" },
  { name: "Vehicle_Age", label: "Vehicle Age", type: "number", min: "0", suffix: "years" },
  { name: "Odometer_Reading", label: "Odometer Reading", type: "number", min: "0", suffix: "km" },
  { name: "Days_Since_Last_Service", label: "Days Since Last Service", type: "number", min: "0", suffix: "days" },
  { name: "Service_History", label: "Service History Score", type: "number", min: "0", max: "10" },
  { name: "Accident_History", label: "Accident History", type: "number", min: "0", max: "5" },
  { name: "Fuel_Efficiency", label: "Fuel Efficiency", type: "number", min: "0", step: "0.1", suffix: "km/l" },
  { name: "Tire_Condition", label: "Tire Condition", type: "select", placeholder: "Select tire status", options: ["New", "Good", "Worn Out"] },
  { name: "Brake_Condition", label: "Brake Condition", type: "select", placeholder: "Select brake status", options: ["New", "Good", "Worn Out"] },
  { name: "Battery_Status", label: "Battery Status", type: "select", placeholder: "Select battery status", options: ["New", "Good", "Weak"] }
];

const features = [
  { icon: Sparkles, title: "AI Maintenance Prediction", text: "Forecast component wear using mileage, age, service data, and condition signals." },
  { icon: Car, title: "Multi-Vehicle Support", text: "Manage daily drivers, fleet cars, vans, and EVs in one polished workspace." }
];

const dataFeatures = [
  { icon: Car, title: "Vehicle Model", text: "Model-specific service schedules and component wear profiles." },
  { icon: History, title: "Maintenance History", text: "Past service events and repair records inform future predictions." },
  { icon: BellRing, title: "Reported Issues", text: "Driver-reported faults and warning signs feed the predictive model." },
  { icon: Clock3, title: "Vehicle Age", text: "Vehicle age helps calculate expected wear and replacement timelines." },
  { icon: Gauge, title: "Odometer Reading", text: "Mileage trends enhance accuracy for engine and chassis maintenance." },
  { icon: CalendarClock, title: "Days Since Last Service", text: "Service intervals show the remaining useful life of key systems." },
  { icon: History, title: "Service History", text: "Verified record completeness improves predictive confidence." },
  { icon: ShieldCheck, title: "Accident History", text: "Impact and repair history affect safety-critical maintenance alerts." },
  { icon: Fuel, title: "Fuel Efficiency", text: "Efficiency drops can signal engine, drivetrain, or tire issues." },
  { icon: Wrench, title: "Tire Condition", text: "Tire health is monitored to avoid handling or alignment failures." },
  { icon: CheckCircle2, title: "Brake Condition", text: "Brake system status is tracked for safety and service timing." },
  { icon: BatteryCharging, title: "Battery Status", text: "Battery health is used to predict electrical system maintenance." }
];

function App() {
  return (
    <main className="site-shell">
      <Navigation />
      <Hero />
      <Features />
      <Predictor />
      <Footer />
    </main>
  );
}

function Navigation() {
  return (
    <header className="nav-wrap">
      <a className="brand" href="#home" aria-label="AutoCare AI home">
        <span className="brand-mark"><Zap size={18} /></span>
        AutoCare AI
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-button menu-button" aria-label="Open menu"><Menu size={20} /></button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-pad">
      <div className="hero-copy reveal">
        <p className="eyebrow"><Sparkles size={16} /> AI vehicle intelligence platform</p>
        <h1>Predict Vehicle Maintenance Before Problems Happen</h1>
        <p className="hero-subtitle">
          AI-powered vehicle health prediction using service history, mileage,
          fuel efficiency, and maintenance records.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#predictor">Predict Now <ChevronRight size={18} /></a>
          <a className="btn btn-outline" href="#features">Learn More</a>
        </div>
        <div className="hero-metrics glass">
          <div><strong>97%</strong><span>prediction confidence</span></div>
          <div><strong>24/7</strong><span>health monitoring</span></div>
          <div><strong>38%</strong><span>lower surprise repairs</span></div>
        </div>
      </div>
      <div className="hero-visual reveal delay-1" aria-label="Futuristic 3D electric car illustration">
        <div className="orbital-ring ring-one" />
        <div className="orbital-ring ring-two" />
        <div className="car-stage">
          <div className="scan-line" />
          <div className="car-illustration">
            <div className="car-roof" />
            <div className="car-body" />
            <div className="car-light light-left" />
            <div className="car-light light-right" />
            <div className="wheel wheel-left"><span /></div>
            <div className="wheel wheel-right"><span /></div>
            <div className="car-shadow" />
          </div>
          <div className="floating-chip chip-a"><Gauge size={18} /> 92%</div>
          <div className="floating-chip chip-b"><BatteryCharging size={18} /> Stable</div>
          <div className="floating-chip chip-c"><Wrench size={18} /> 18 days</div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="section-pad">
      <SectionHeading
        eyebrow="Predictive ownership"
        title="Everything a modern service platform should know"
        text="AutoCare AI transforms scattered vehicle signals into clear, timely maintenance decisions."
      />
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, text }, index) => (
          <article className="feature-card glass reveal" style={{ "--delay": `${index * 70}ms` }} key={title}>
            <Icon className="feature-icon" size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="section-heading reveal">
        <p className="eyebrow">Model inputs</p>
        <h2>All predictor data included</h2>
        <p>Every vehicle signal used by the maintenance model is surfaced in this feature overview.</p>
      </div>
      <div className="feature-grid">
        {dataFeatures.map(({ icon: Icon, title, text }, index) => (
          <article className="feature-card glass reveal" style={{ "--delay": `${index * 70}ms` }} key={title}>
            <Icon className="feature-icon" size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Predictor() {
  const [formData, setFormData] = useState(initialVehicleData);
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const healthScore = useMemo(() => {
    if (!prediction) return null;
    return Math.max(0, Math.round(100 - Number(prediction.Risk_Score || 0)));
  }, [prediction]);

  function updateField(name, value) {
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Prediction failed. Check the backend server and try again.");
      }

      setPrediction(data);
      setStatus("success");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <section id="predictor" className="section-pad predictor-layout">
      <div className="form-card glass reveal">
        <div className="card-header">
          <p className="eyebrow"><Activity size={15} /> Live Predictor</p>
          <h2>Vehicle Maintenance Predictor</h2>
        </div>
        <form className="predictor-form" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <Field
              key={field.name}
              {...field}
              value={formData[field.name]}
              onChange={updateField}
            />
          ))}
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary form-submit" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Predicting..." : "Predict Maintenance"} <ChevronRight size={18} />
          </button>
        </form>
      </div>
      <PredictionCard prediction={prediction} status={status} healthScore={healthScore} />
    </section>
  );
}

function Field({ label, name, type = "text", options = [], value, onChange, suffix, ...inputProps }) {
  return (
    <label className="field">
      <span>{label}</span>
      {type === "select" ? (
        <select value={value} onChange={(event) => onChange(name, event.target.value)}>
          {inputProps.placeholder && <option value="" disabled hidden>{inputProps.placeholder}</option>}
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <div className="input-wrap">
          <input
            type={type}
            value={value}
            onChange={(event) => onChange(name, event.target.value)}
            required
            {...inputProps}
          />
          {suffix && <em>{suffix}</em>}
        </div>
      )}
    </label>
  );
}

function PredictionCard({ prediction, status, healthScore }) {
  const riskScore = prediction ? Math.round(Number(prediction.Risk_Score || 0)) : null;
  const needsMaintenance = prediction ? prediction.Need_Maintenance : null;
  const faults = prediction?.Faults_Detected?.length ? prediction.Faults_Detected : ["No live prediction yet"];
  const chartStyle = { "--risk": `${riskScore ?? 0}%` };
  const readinessValue = prediction ? Math.max(10, 100 - riskScore) : null;

  return (
    <aside className="result-card glass reveal delay-1">
      <div className="card-header">
        <p className="eyebrow"><CheckCircle2 size={15} /> Prediction Result</p>
        <h2>{status === "success" ? "Live API Output" : status === "loading" ? "Predicting..." : "Ready for Prediction"}</h2>
      </div>
      <div className={`status-pill ${needsMaintenance === null ? "neutral" : needsMaintenance ? "warning" : "healthy"}`}>
        Need Maintenance: {needsMaintenance === null ? "Pending" : needsMaintenance ? "Yes" : "No"}
      </div>
      <div className="risk-row">
        <span>Risk Score</span>
        <strong>{riskScore === null ? "--" : `${riskScore}%`}</strong>
      </div>
      <div className="circular-chart" style={chartStyle} aria-label={riskScore === null ? "Risk score pending" : `${riskScore} percent vehicle risk score`}>
        <span>{riskScore === null ? "--" : `${riskScore}%`}</span>
      </div>
      <div className="days-card">
        <Clock3 size={20} />
        <div>
          <span>Vehicle health after model review</span>
          <strong>{healthScore === null ? "--" : `${healthScore}%`}</strong>
        </div>
      </div>
      <div className="progress-stack">
        <Progress label="Model Risk" value={riskScore} danger={riskScore >= 60} />
        <Progress label="Health Score" value={healthScore} />
        <Progress label="Service Readiness" value={readinessValue} />
      </div>
      <div className="recommendations">
        <h3>Faults Detected</h3>
        <ul className="fault-list">
          {faults.map((fault) => <li key={fault}>{fault}</li>)}
        </ul>
      </div>
    </aside>
  );
}

function Progress({ label, value, danger }) {
  const percent = typeof value === "number" ? `${value}%` : "";

  return (
    <div className="progress-item">
      <div><span>{label}</span><strong>{percent || "--"}</strong></div>
      <div className="progress-track"><span className={danger ? "danger" : ""} style={{ width: value === null ? 0 : percent }} /></div>
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer section-pad">
      <div className="footer-grid">
        <div>
          <a className="brand" href="#home"><span className="brand-mark"><Zap size={18} /></span>AutoCare AI</a>
          <p>Premium AI-powered predictive maintenance for connected drivers, workshops, and modern fleets.</p>
          <div className="socials">
            <a aria-label="Twitter" href="#"><Twitter size={18} /></a>
            <a aria-label="LinkedIn" href="#"><Linkedin size={18} /></a>
            <a aria-label="Instagram" href="#"><Instagram size={18} /></a>
            <a aria-label="Facebook" href="#"><Facebook size={18} /></a>
          </div>
        </div>
        <div>
          <h3>Quick Links</h3>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
        </div>
        <div>
          <h3>Contact Information</h3>
          <p><Mail size={16} /> hello@autocare.ai</p>
          <p><MapPin size={16} /> Bengaluru, India</p>
          <p><LockKeyhole size={16} /> Enterprise-grade data protection</p>
        </div>
      </div>
      <div className="copyright">Copyright 2026 AutoCare AI. All rights reserved.</div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
