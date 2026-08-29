// import tags
import { useState, useEffect } from "react";
import ClinicQueue from "../ClinicQueue";
import Navbar from "../../../../shared/components/Navbar";
import Footer from "../../../../shared/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../../auth/pages/Login";
import Register from "../../../auth/pages/Register";
import { getAuthData } from "../../../../shared/utils/auth";
import { getAllDoctors } from "../../../doctors/services/doctorService";
import {
  DOCTOR_CARD_COLORS,
  getDoctorId,
  getDoctorInitials,
  getDoctorName,
  LIVE_QUEUES,
  NEWS,
  SPECIALTIES,
  STATS,
  toArray,
} from "./homeConfig";

const SHOW_BOOKING_SECTION = import.meta.env.VITE_SHOW_BOOKING_SECTION === "true";

// ── Icons (Inline SVG Helpers for strict performance) ──────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const PhoneIcon = () => <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />;
const MailIcon = () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />;
const MapPinIcon = () => <Icon d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a1 1 0 100-2 1 1 0 000 2" />;
const ClockIcon = () => <Icon d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />;
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={14} />;
const AlertIcon = () => <Icon d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" size={14} />;


// ── Shared Layout/Card Components ───────────────────────────────────────────
function SectionHeader({ subtitle, title, rightContent }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">{subtitle}</p>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
      </div>
      {rightContent}
    </div>
  );
}

// ── Functional Sub-components ───────────────────────────────────────────────
// if we want to change colors we can change here
function HealthAlert() {
  return (
    <div className="bg-amber-50 border-b border-amber-200/60 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs md:text-sm text-amber-900">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 animate-pulse"><AlertIcon /></span>
          <span><strong>Health Advisory:</strong> Elevated dengue activity in Galle District. Eliminate standing water. Seek immediate OPD care if symptoms emerge.</span>
        </div>
        <a href="#" className="underline font-semibold hover:text-amber-950 transition whitespace-nowrap">Read Advisory →</a>
      </div>
    </div>
  );
}

function AuthModal({ authMode, onClose, onSwitchMode }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-4">
      <div className="max-h-[90vh] overflow-y-auto">
        {authMode === "register" ? (
          <Register
            onClose={onClose}
            onSwitchToLogin={() => onSwitchMode("login")}
            onRegistrationSuccess={() => onSwitchMode("login")}
          />
        ) : (
          <Login
            onClose={onClose}
            onSwitchToRegister={() => onSwitchMode("register")}
          />
        )}
      </div>
    </div>
  );
}

function HeroSection({ onBookAppointment }) {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Headline */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide border border-amber-500/40 text-amber-400 bg-amber-500/5 px-2.5 py-1 rounded-md mb-5">
            Tertiary Teaching Hospital · Est. 1949 · ISO Accredited
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
            Compassionate Care <br />
            for <span className="text-amber-400">Every Life</span> in <br />
            Southern Sri Lanka
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
            National Hospital Galle is the premier tertiary-care institution serving the Southern Province – built with over 1,200 beds, 40+ specialties, automated clinic lines, and multi-language support.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <button
              type="button"
              onClick={onBookAppointment}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 shadow-md shadow-amber-500/10 transition-all"
            >
              Book Appointment
            </button>

            
            <Link className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider border border-slate-700 text-white hover:bg-slate-800/50 active:scale-98 transition-all" to="/doctors">
              Find a Doctor
            </Link>
            {/* <button className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider border border-teal-500/30 text-teal-300 bg-teal-500/5 hover:bg-teal-500/10 flex items-center gap-2 active:scale-98 transition-all">
              <BotIcon /> AI Assistant
            </button> */}
          </div>
        </div>

        {/* Right – Interactive Live Queue Dashboard */}
        <div className="w-full lg:w-80 bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Live Status Dashboard</span>
            </div>
          </div>
          <div className="space-y-3">
            {LIVE_QUEUES.map((q) => (
              <div key={q.id} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-slate-800/40 transition">
                <span className="text-xs font-semibold text-slate-300">{q.label}</span>
                {q.count !== null ? (
                  <span className={`text-base font-extrabold ${q.critical ? "text-rose-400" : "text-emerald-400"}`}>
                    {q.count} <span className="text-[10px] font-medium text-slate-500">waiting</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700/60">
                    Open 24H
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickNav({ onBookAppointment }) {
  const items = [
    { icon: "📅", label: "Book Appointment", sub: "Online scheduling" },
    { icon: "👨‍⚕️", label: "Find a Doctor", sub: "Profiles & specialties" },
    { icon: "🏥", label: "Today's Clinics", sub: "Real-time updates" },
    { icon: "🚑", label: "Emergency Help", sub: "Ambulance response" },
   
  ];
  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto scrollbar-hide divide-x divide-slate-100">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.label === "Book Appointment" ? onBookAppointment : undefined}
            className="flex-1 min-w-[140px] md:min-w-max flex flex-col items-center text-center py-4 px-5 hover:bg-slate-50 transition-all group"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition-colors whitespace-nowrap">{item.label}</span>
            <span className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">{item.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ClinicalSpecialties() {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          subtitle="Departments & Services"
          title="Clinical Specialties"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALTIES.map((s) => (
            <Link key={s.name} to={s.path}>
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer h-full">
                <div className="text-3xl mb-4 bg-slate-50 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-100">
                  {s.icon}
                </div>

                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-teal-700">
                  {s.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


function BookingSection() {
  const [form, setForm] = useState({ dept: "", doc: "", date: "", nic: "" });
  const [loading, setLoading] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    if (!form.dept || !form.nic) return alert("Please fill standard required fields");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Success! Check SMS queue alerts dispatched for your registry reference.`);
    }, 1200);
  };

  const steps = [
    "Select department and specialized consultant",
    "Choose preferred date and session slot",
    "Enter verification parameter (NIC / Passport Number)",
    "Receive transactional SMS gate allocation token pass",
  ];

  return (
    <section className="py-16 px-4 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Info Panel */}
        <div className="flex-1 lg:max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Automated Online Access</p>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Book Your Consultant Consultation in Minutes</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Eliminate traditional waiting windows. Secure appointment passes, track physical attendance queues live, and aggregate treatment schedules seamlessly under unified national healthcare records profiles.
          </p>
          <ol className="space-y-4 mb-8">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-900 text-amber-400 text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                <span className="text-sm font-medium text-slate-700 mt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        
          <div className="border border-slate-200/80 rounded-2xl p-5 bg-slate-50/50">
            <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wide mb-1">Patient Digital Portal Registration</h4>
            <p className="text-xs text-slate-500 mb-4">Sync records across lab operations and prescriptions diagnostics lists automatically via My-NHG accounts.</p>
            <Link to="/book-appointment" className="inline-block text-xs font-bold px-4 py-2 rounded-xl border border-teal-950 text-teal-950 hover:bg-teal-950 hover:text-white transition-all">
            Register Patient Profile
        </Link>
          </div>
          
        </div>

        //  Right – Interactive Scheduling Engine Widget
        <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8">
          <h3 className="font-extrabold text-slate-900 mb-5 text-lg tracking-tight">Quick Session Allocator</h3>
          <form onSubmit={handleBook} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Clinical Department</label>
              <select value={form.dept} onChange={e => setForm({...form, dept: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all">
                <option value="">Select Target Stream</option>
                <option>Cardiology & ICU</option>
                <option>Pediatrics & Neonatology</option>
                <option>Maternity & Gynaecology</option>
                <option>Neurology</option>
                <option>General Surgery</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Consultant Physician</label>
              <select value={form.doc} onChange={e => setForm({...form, doc: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all">
                <option value="">Select Professional Desk</option>
                <option>Dr. S. Karunanayake (Cardiology)</option>
                <option>Dr. R. Pathinge (Pediatrics)</option>
                <option>Dr. H. Wickramasinghe (Neurology)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Window Date</label>
              <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">National ID (NIC) / Mobile Number</label>
              <input type="text" placeholder="Identity reference parameters" value={form.nic} onChange={e => setForm({...form, nic: e.target.value})} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 shadow-md shadow-slate-900/10 transition-all">
              {loading ? "Scanning Desk Logs..." : "Verify Slot Availability"}
            </button>
            <p className="text-[10px] text-slate-400 text-center">SMS token verification pipelines apply standard telecom rates.</p>
          </form>
        </div> 
      </div>
    </section>
  );
}

function SpecialistConsultants() {
  const [activeTab, setActiveTab] = useState("All");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await getAllDoctors();
        setDoctors(toArray(data));
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load doctors.");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(doctors.map((doctor) => doctor.department).filter(Boolean))),
  ];
  
  const filteredDocs = activeTab === "All" 
    ? doctors 
    : doctors.filter(d => d.department === activeTab);

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="Medical Officers Core" 
          title="Specialist Consultants" 
          rightContent={
            <div className="flex flex-wrap gap-1 bg-slate-200/60 p-1 rounded-xl border border-slate-200">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveTab(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === cat ? "bg-white text-teal-950 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
                  {cat}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading && (
            <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Loading doctors from the API...
            </div>
          )}

          {!loading && error && (
            <div className="md:col-span-3 rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && filteredDocs.length === 0 && (
            <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              No doctors available yet.
            </div>
          )}

          {!loading && !error && filteredDocs.map((d, index) => (
            <div key={getDoctorId(d, index)} className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center overflow-hidden text-white font-black text-sm shadow-inner ${DOCTOR_CARD_COLORS[index % DOCTOR_CARD_COLORS.length]}`}>
                    {d.profilePhoto ? (
                      <img src={d.profilePhoto} alt={getDoctorName(d)} className="h-full w-full object-cover" />
                    ) : (
                      getDoctorInitials(d)
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{getDoctorName(d)}</h4>
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/40 mt-1">
                      {d.department || "General Medicine"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium tracking-wide mb-3">
                  {d.qualification || "Qualification not provided"}
                </p>
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-6 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-slate-400"><ClockIcon /></span>
                  <span>{d.specialization || "Specialist consultant"}</span>
                </div>
              </div>
              {/* <button className="w-full py-2 rounded-xl text-xs font-bold border border-teal-800 text-teal-800 hover:bg-teal-50 transition-all">
                Request Profile Channel
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to National Hospital Galle! I can assist you with department directories, appointment workflows, and clinic locations. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const suggested = ["How to book an appointment?", "Where is the pharmacy?", "Cardiology clinic schedule"];

  const triggerBotResponse = async (userQuery) => {
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userQuery,
          instructions: "Reply briefly as a hospital help desk assistant.",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || data?.error || "Chat request failed.");
      }

      const botText =
        data?.reply ||
        "I could not find a response right now. Please contact the hospital help desk for urgent assistance.";

      setMessages(prev => [...prev, { sender: "bot", text: botText }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text:
            err.message ||
            "Sorry, the AI help desk is unavailable right now. Please try again shortly.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (text) => {
    if (!text.trim()) return;
    const userMessage = text.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    triggerBotResponse(userMessage);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Intro Text Block */}
        <div className="flex-1 lg:max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Automated Multi-lingual Router</p>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Instant Guidance Support Desk — Available 24/7</h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Locate localized laboratories desks, parse processing parameters, check specialized diagnostics schedules instantly without manual registry lookups. Support covers English, Sinhala and Tamil dialects.
          </p>
          <div className="flex flex-wrap gap-2">
            {suggested.map((s) => (
              <button key={s} onClick={() => handleSend(s)} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-300 text-slate-600 bg-white hover:border-teal-600 hover:text-teal-700 hover:shadow-sm transition-all">
                {s}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-4 italic">*AI modules provide navigation context only. No diagnostic medical prescriptions advice criteria apply.</p>
        </div>

        {/* Right – Chat Widget UI */}
        <div className="w-full lg:w-[420px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-50 flex flex-col h-[400px]">
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between text-white bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wide">NHG Virtual Triaging Agent</span>
            </div>
            <span className="text-[10px] font-bold bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700/50">Langs: EN/SI/TA</span>
          </div>
          
          {/* Messages Feed */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] whitespace-pre-line text-xs px-3.5 py-2.5 rounded-2xl ${m.sender === "user" ? "bg-teal-700 text-white rounded-br-none" : "bg-slate-100 text-slate-700 rounded-bl-none border border-slate-200/50"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 border border-slate-200/40 text-[10px] px-3 py-1.5 rounded-xl text-slate-400 font-bold animate-pulse">
                  Agent scanning logs...
                </div>
              </div>
            )}
          </div>

          {/* Controller Input Footer */}
          <div className="border-t border-slate-200 p-3 flex gap-2 bg-slate-50">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend(input)}
              placeholder="Type your directory inquiry..."
              className="flex-1 text-xs border border-slate-200 bg-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />
            <button onClick={() => handleSend(input)} className="px-4 py-2 rounded-xl text-white bg-teal-800 text-xs font-bold transition-all hover:bg-teal-900">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="py-12 px-4 text-white bg-slate-950 border-y border-slate-800 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        {STATS.map((s) => (
          <div key={s.label} className="group">
            <div className="text-3xl lg:text-4xl font-black text-amber-400 tracking-tight transition-transform duration-300 group-hover:scale-105">{s.num}</div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          subtitle="Hospital Intelligence" 
          title="News & Public Announcements" 
          rightContent={
            <a href="#" className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1">
              All board publications <ChevronRight />
            </a>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((n) => (
            <div key={n.title} className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="bg-slate-50 border-b border-slate-100 h-36 flex items-center justify-center text-slate-300 text-4xl select-none">
                📰
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${n.tagColor}`}>
                    {n.tag}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm mt-3 mb-2 tracking-tight leading-snug">{n.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">{n.desc}</p>
                </div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-2">{n.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section className="py-12 px-4 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm">
        <div>
          <h3 className="font-extrabold text-slate-900 text-lg mb-1 tracking-tight">Support National Hospital Galle Philanthropy Foundations</h3>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Your generous contributions directly support infrastructure development pipelines, high-precision instrument purchase support programs, and emergency care subsidies supporting economically vulnerable populations.
          </p>
        </div>
        <Link to="/donate" className="flex-shrink-0 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-500/5">
          Contribute Fundings
        </Link>

          
        
      </div>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    { icon: <MapPinIcon />, label: "Geographic Complex", value: "Karapitiya, Galle 80000\nSouthern Province, Sri Lanka" },
    { icon: <PhoneIcon />, label: "Direct Trunks & Central Helpline", value: "Registry Desk: 091-222-2241\nEmergency Service Desk: 1990" },
    { icon: <MailIcon />, label: "Secure Institutional Mailing", value: "nhg@health.gov.lk\ndirector@nhgalle.health.gov.lk" },
    { icon: <ClockIcon />, label: "Operational Windows", value: "OPD: Mon–Fri 8:00 AM – 4:00 PM\nCritical Care Trauma: 24H Emergency" },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Connect Logs</p>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8">Locate Outpatient Desks & Connect With Us</h2>
          <div className="space-y-6">
            {contacts.map((c) => (
              <div key={c.label} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-800 border border-slate-200/40">
                  {c.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                  <p className="text-xs md:text-sm font-semibold text-slate-700 whitespace-pre-line leading-relaxed">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Map Canvas Frame Area Placeholder */}
        <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-inner p-8">
          <div className="text-center">
            <span className="text-slate-300 flex justify-center scale-150 mb-3"><MapPinIcon /></span>
            <p className="text-xs font-bold text-slate-800">Galle Karapitiya Medical Hub Complex</p>
            <p className="text-[11px] text-slate-400 mt-1">Satellite Routing and Street Wayfinding Maps Infrastructure</p>
            <a href="#" className="text-xs font-bold underline mt-3 inline-block text-teal-700 hover:text-teal-800">
              Launch Dynamic Nav Routes →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page Export Layout Controller ──────────────────────────────────────
export default function NationalHospitalGalle() {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authData, setAuthData] = useState(getAuthData);

  const openLoginModal = () => {
    setAuthMode("login");
    setLoginOpen(true);
  };

  const handleBookAppointment = () => {
    const currentAuthData = getAuthData();
    setAuthData(currentAuthData);

    if (currentAuthData) {
      navigate("/book-appointment");
      return;
    }

    openLoginModal();
  };

  useEffect(() => {
    // Scroll management layout initialization logic safely hooks here if needed.
  }, []);

  useEffect(() => {
    const syncAuth = () => setAuthData(getAuthData());
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authDataChanged", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authDataChanged", syncAuth);
    };
  }, []);

  return (
    <div className="font-sans bg-slate-50 text-slate-900 min-h-screen antialiased selection:bg-teal-700 selection:text-white">
      <Navbar />
      <HealthAlert />
      <HeroSection onBookAppointment={handleBookAppointment} />
      <QuickNav onBookAppointment={handleBookAppointment} />
      
      {/* Real-time sync list component provided in module components directory */}
      <div className="bg-white border-b border-slate-100 py-4 shadow-sm">
        <ClinicQueue />
      </div>

      <ClinicalSpecialties />
      {SHOW_BOOKING_SECTION && <BookingSection />}
      <SpecialistConsultants />
      <AIAssistant />
      <StatsBar />
      <NewsSection />
      <DonateSection />
      <ContactSection />
      <Footer />
      {loginOpen && !authData && (
        <AuthModal
          authMode={authMode}
          onClose={() => setLoginOpen(false)}
          onSwitchMode={setAuthMode}
        />
      )}
    </div>
  );
}
