import React from "react";
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

const navItems = ["Home", "Features", "Predictor", "Dashboard", "Contact"];

const features = [
  { icon: Sparkles, title: "AI Maintenance Prediction", text: "Forecast component wear using mileage, age, service data, and condition signals." },
  { icon: BellRing, title: "Smart Alerts", text: "Get precise reminders before a small service item becomes expensive downtime." },
  { icon: CircleDollarSign, title: "Expense Tracking", text: "Monitor service costs, compare trends, and plan upcoming maintenance budgets." },
  { icon: Fuel, title: "Fuel Monitoring", text: "Spot efficiency drops that can reveal tire, oil, engine, or driving-pattern issues." },
  { icon: History, title: "Service History Management", text: "Keep vehicle records structured, searchable, and ready for resale or audits." },
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

const stats = [
  { label: "Health Score", value: "92%", icon: ShieldCheck, tone: "cyan" },
  { label: "Avg. MPG", value: "34.8", icon: Fuel, tone: "green" },
  { label: "Monthly Cost", value: "₹12,300", icon: CircleDollarSign, tone: "violet" },
  { label: "Next Service", value: "18d", icon: CalendarClock, tone: "amber" }
];

function App() {
  return (
    <main className="site-shell">
      <Navigation />
      <Hero />
      <Features />
      <Predictor />
      <Dashboard />
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
        <button className="btn btn-ghost">Login</button>
        <button className="btn btn-small">Sign Up</button>
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
  return (
    <section id="predictor" className="section-pad predictor-layout">
      <div className="form-card glass reveal">
        <div className="card-header">
          <p className="eyebrow"><Activity size={15} /> Live Predictor</p>
          <h2>Vehicle Maintenance Predictor</h2>
        </div>
        <form className="predictor-form">
          <Field label="Vehicle Model" type="select" options={["Sedan LX", "SUV Pro", "Truck Max", "EV Prime", "Hybrid Touring"]} />
          <Field label="Maintenance History" type="select" options={["Excellent", "Regular", "Irregular", "Poor"]} />
          <Field label="Reported Issues" type="select" options={["None", "Minor Noise", "Warning Light", "Performance Drop", "Multiple Issues"]} />
          <Field label="Vehicle Age" placeholder="5 years" />
          <Field label="Odometer Reading" placeholder="64,250 km" />
          <Field label="Days Since Last Service" placeholder="92 days" />
          <Field label="Service History" type="select" options={["Complete", "Partial", "Missing", "Dealer Verified"]} />
          <Field label="Accident History" type="select" options={["No Accidents", "Minor Accident", "Major Accident", "Repaired"]} />
          <Field label="Fuel Efficiency" placeholder="34.8 mpg" />
          <Field label="Tire Condition" type="select" options={["New", "Good", "Moderate Wear", "Replace Soon"]} />
          <Field label="Brake Condition" type="select" options={["Excellent", "Good", "Worn", "Critical"]} />
          <Field label="Battery Status" type="select" options={["Excellent", "Healthy", "Weak", "Critical"]} />
          <button className="btn btn-primary form-submit" type="button">Predict Maintenance <ChevronRight size={18} /></button>
        </form>
      </div>
      <PredictionCard />
    </section>
  );
}

function Field({ label, type = "text", options = [], placeholder }) {
  return (
    <label className="field">
      <span>{label}</span>
      {type === "select" ? (
        <select defaultValue={options[0]}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} />
      )}
    </label>
  );
}

function PredictionCard() {
  return (
    <aside className="result-card glass reveal delay-1">
      <div className="card-header">
        <p className="eyebrow"><CheckCircle2 size={15} /> Prediction Result</p>
        <h2>API Prediction Output</h2>
      </div>
      <div className="status-pill">Need_Maintenance: Yes</div>
      <div className="risk-row">
        <span>Risk_Score</span>
        <strong>68%</strong>
      </div>
      <div className="circular-chart" aria-label="68 percent vehicle risk score">
        <span>68%</span>
      </div>
      <div className="days-card">
        <Clock3 size={20} />
        <div>
          <span>Estimated days until next service</span>
          <strong>18 days</strong>
        </div>
      </div>
      <div className="progress-stack">
        <Progress label="Maintenance History" value="74%" />
        <Progress label="Reported Issues" value="62%" />
        <Progress label="Tires" value="58%" />
        <Progress label="Brakes" value="51%" danger />
        <Progress label="Battery" value="86%" />
      </div>
      <div className="recommendations">
        <h3>Faults_Detected</h3>
        <p>Tire wear, brake inspection required, and irregular service interval detected from the submitted vehicle data.</p>
      </div>
    </aside>
  );
}

function Progress({ label, value, danger }) {
  return (
    <div className="progress-item">
      <div><span>{label}</span><strong>{value}</strong></div>
      <div className="progress-track"><span className={danger ? "danger" : ""} style={{ width: value }} /></div>
    </div>
  );
}

function Dashboard() {
  return (
    <section id="dashboard" className="section-pad dashboard-section">
      <SectionHeading
        eyebrow="Command center"
        title="Premium dashboard for every service decision"
        text="Track vehicle health, cost signals, efficiency trends, and alerts from a single high-visibility interface."
      />
      <div className="stats-grid">
        {stats.map(({ icon: Icon, label, value, tone }) => (
          <article className={`stat-card glass ${tone}`} key={label}>
            <Icon size={24} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
      <div className="dashboard-grid">
        <article className="panel glass command-panel">
          <div>
            <div className="panel-title"><Sparkles size={20} /> AI Diagnostic Overview</div>
            <h3>Predictive model is monitoring 12 service signals in real time.</h3>
            <p>Engine vibration, oil quality, battery voltage, tire wear, fuel efficiency, and service intervals are trending inside the healthy operating range.</p>
          </div>
          <div className="diagnostic-rail">
            <span className="active"></span>
            <span></span>
            <span className="active"></span>
            <span></span>
            <span className="active"></span>
          </div>
        </article>
        <article className="panel glass health-panel">
          <div className="panel-title"><Gauge size={20} /> Vehicle Health Score</div>
          <div className="health-meter"><span>92</span><em>Excellent</em></div>
          <div className="health-breakdown">
            <span>Powertrain <strong>94%</strong></span>
            <span>Electrical <strong>89%</strong></span>
            <span>Safety <strong>96%</strong></span>
          </div>
        </article>
        <article className="panel glass">
          <div className="panel-title"><History size={20} /> Service History Timeline</div>
          <ol className="timeline">
            <li><strong>Jun 2026</strong><span>Oil quality inspection completed</span><em>Optimal</em></li>
            <li><strong>Mar 2026</strong><span>Brake pads replaced</span><em>Closed</em></li>
            <li><strong>Dec 2025</strong><span>Battery health scan passed</span><em>Stable</em></li>
          </ol>
        </article>
        <article className="panel glass chart-panel">
          <div className="panel-title"><BarChart3 size={20} /> Maintenance Cost Analysis</div>
          <div className="chart-kpi"><strong>₹12,300</strong><span>avg. monthly cost</span></div>
          <div className="bar-chart">
            {[48, 68, 36, 82, 54, 74].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
          </div>
          <p>Projected cost trend remains below fleet average.</p>
        </article>
        <article className="panel glass chart-panel">
          <div className="panel-title"><Fuel size={20} /> Fuel Efficiency Graph</div>
          <svg className="line-chart" viewBox="0 0 320 150" role="img" aria-label="Fuel efficiency trend graph">
            <defs>
              <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#20e7ff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#20e7ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M18 120 C58 94, 76 86, 112 92 C154 100, 168 38, 210 52 C248 66, 266 34, 304 24" fill="none" stroke="#20e7ff" strokeWidth="5" strokeLinecap="round" />
            <path d="M18 120 C58 94, 76 86, 112 92 C154 100, 168 38, 210 52 C248 66, 266 34, 304 24 L304 150 L18 150 Z" fill="url(#lineFill)" />
          </svg>
        </article>
        <article className="panel glass alerts-panel">
          <div className="panel-title"><BellRing size={20} /> Upcoming Service Alerts</div>
          <div className="alert-item priority"><Gauge size={18} /><span><strong>Tire rotation</strong> due in 9 days</span><em>Medium</em></div>
          <div className="alert-item"><Wrench size={18} /><span><strong>Oil replacement</strong> due in 18 days</span><em>Planned</em></div>
          <div className="alert-item"><BatteryCharging size={18} /><span><strong>Battery check</strong> due in 31 days</span><em>Low</em></div>
        </article>
        <article className="panel glass service-panel">
          <div className="panel-title"><CalendarClock size={20} /> Service Readiness</div>
          <div className="readiness-score">18<span>days</span></div>
          <p>Best appointment window: Jul 12 to Jul 16. Parts availability is high.</p>
        </article>
      </div>
    </section>
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
