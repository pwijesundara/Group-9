import Navbar from "../../../../shared/components/Navbar";
import Footer from "../../../../shared/components/Footer";

/* Vision, Mission & Values Page */

function Vision() {
  const values = [
    { name: "Excellence",     icon: "⭐", desc: "We pursue the highest standards in clinical care, research, training and patient safety at all times." },
    { name: "Accessibility",  icon: "♿", desc: "Healthcare must be available to all. We support multilingual services, accessible design and equitable care delivery." },
    { name: "Compassion",     icon: "❤️", desc: "Every patient is treated with empathy, dignity and respect — regardless of their background, language or circumstances." },
    { name: "Sustainability", icon: "🌱", desc: "We are committed to environmentally responsible practices and the long-term health of the communities we serve." },
    { name: "Integrity",      icon: "🛡️", desc: "We act with transparency, honesty and accountability in all clinical and administrative decisions." },
    { name: "Teamwork",       icon: "🤝", desc: "Effective patient care is a collaborative effort. We work across disciplines and roles to deliver co-ordinated services." },
  ];

  const objectives = [
    { n: 1, title: "Improve patient access and reduce waiting times",  desc: "Online appointment booking, live queue management and digital registration." },
    { n: 2, title: "Strengthen multilingual service delivery",          desc: "All patient-facing services, signage and digital systems available in English, Sinhala and Tamil." },
    { n: 3, title: "Advance digital health and data management",        desc: "Electronic medical records, patient portals, LIS, PACS and future telemedicine integration." },
    { n: 4, title: "Maintain leadership in teaching and research",      desc: "Support the University of Ruhuna Faculty of Medicine and promote clinical research across all departments." },
  ];

  return (
    <><Navbar/>
    <div className="max-w-5xl mx-auto px-5 py-10">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-5 bg-gray-50 border border-gray-200 rounded-xl px-7 py-6 mb-7">
        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl flex-shrink-0">
          🏥
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Vision, Mission &amp; Values</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            The guiding principles that define how National Hospital Galle delivers care,
            leads healthcare practice, and serves the communities of Southern Sri Lanka.
          </p>
        </div>
      </div>

      {/* ── Vision & Mission ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        {/* Vision */}
        <div className="bg-white border border-gray-200 border-l-4 border-l-green-500 rounded-r-xl px-6 py-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Our Vision</span>
          </div>
          <blockquote className="text-base font-bold text-gray-900 leading-relaxed mb-3">
            "To be the leading centre of excellence in healthcare, education and research
            in Southern Sri Lanka — accessible to all."
          </blockquote>
          <p className="text-sm text-gray-500 leading-relaxed">
            A hospital where every patient — regardless of language, background or means —
            receives world-class, compassionate and dignified care.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white border border-gray-200 border-l-4 border-l-blue-500 rounded-r-xl px-6 py-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Our Mission</span>
          </div>
          <blockquote className="text-base font-bold text-gray-900 leading-relaxed mb-3">
            "To provide equitable, high-quality and culturally sensitive healthcare services
            to the people of the Southern Province and beyond."
          </blockquote>
          <p className="text-sm text-gray-500 leading-relaxed">
            Through skilled professionals, modern facilities, multilingual communication and
            continuous improvement — we commit to putting the patient at the centre of
            everything we do.
          </p>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {values.map((v) => (
          <div
            key={v.name}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex gap-3 items-start hover:shadow-sm transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-lg flex-shrink-0">
              {v.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{v.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Strategic Objectives ── */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Strategic objectives</h2>
      <div className="flex flex-col gap-3">
        {objectives.map((o) => (
          <div
            key={o.n}
            className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex gap-4 items-start hover:border-green-400 transition-colors"
          >
            <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {o.n}
            </span>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{o.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{o.desc}</p>
            </div>
          </div>
        ))}
      </div>
      

    </div>
    <Footer />
    </>
  );
}

export default Vision;