import Navbar from "../../../../shared/components/Navbar";
import Footer from "../../../../shared/components/Footer";

/* Overview Page */

const stats = [
  { value: "1,200+", label: "Hospital beds",       color: "text-teal-700" },
  { value: "40+",    label: "Medical specialties",  color: "text-blue-700" },
  { value: "850+",   label: "Medical staff",        color: "text-amber-700" },
  { value: "500K+",  label: "Patients per year",    color: "text-red-600" },
];

const meta = [
  { label: "Established", value: "1987 · Karapitiya, Galle" },
  { label: "Type",         value: "Tertiary Teaching Hospital" },
  { label: "Under",        value: "Ministry of Health, Sri Lanka" },
];

const languages = [
  { label: "English", bg: "bg-blue-50",   text: "text-blue-800"  },
  { label: "සිංහල",  bg: "bg-amber-50",  text: "text-amber-800" },
  { label: "தமிழ்",  bg: "bg-purple-50", text: "text-purple-800" },
];

const features = [
  {
    icon: "ti-flask",
    title: "Laboratory",
    desc: "Automated haematology, biochemistry, microbiology with LIS and online report access.",
  },
  {
    icon: "ti-scan",
    title: "Imaging centre",
    desc: "3T MRI, CT scan, ultrasound and PACS-integrated digital radiology.",
  },
  {
    icon: "ti-activity-heartbeat",
    title: "Emergency unit",
    desc: "24-hour emergency and trauma care with dedicated resuscitation facilities.",
  },
  {
    icon: "ti-heart-rate-monitor",
    title: "Intensive care",
    desc: "Multi-specialty ICU with advanced monitoring and ventilator support.",
  },
  {
    icon: "ti-baby-carriage",
    title: "Maternity & NICU",
    desc: "Labour suites, antenatal clinics and neonatal intensive care for high-risk births.",
  },
  {
    icon: "ti-scalpel",
    title: "Operating theatres",
    desc: "Modern OT complex with laparoscopic, orthopaedic and general surgical capability.",
  },
];

export default function OverviewPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl px-6 py-6 mb-6">
          <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 text-2xl">
            🏥
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-xl font-semibold text-gray-900 mb-1.5">
              Hospital Overview
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              The largest tertiary care teaching hospital in Sri Lanka's Southern Province — serving
              communities across Galle, Matara, Hambantota and beyond since 1987.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl px-4 py-5 flex flex-col items-center text-center"
            >
              <span className={`text-2xl font-semibold tracking-tight ${s.color}`}>{s.value}</span>
              <span className="text-xs text-gray-400 mt-1">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── About + Meta ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* About text */}
          <div className="bg-white border border-gray-200 rounded-xl px-5 py-5">
            <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
              About the hospital
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              National Hospital Galle (NHG) is the premier tertiary care institution for Southern
              Sri Lanka, providing critical healthcare services to communities across Galle, Matara,
              Hambantota and beyond.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Operating under the Ministry of Health, NHG serves as both a major treatment centre
              and an affiliated teaching hospital for the Faculty of Medicine, University of Ruhuna.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Services span emergency care, surgical suites, maternity, paediatrics, intensive care,
              oncology, cardiology, radiology, laboratory and pharmacy — all in a multilingual
              environment supporting patients in English, Sinhala and Tamil.
            </p>
          </div>

          {/* Meta info */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {meta.map((m) => (
              <div key={m.label} className="px-5 py-4 border-b border-gray-100">
                <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
                  {m.label}
                </p>
                <p className="text-sm font-medium text-gray-900">{m.value}</p>
              </div>
            ))}

            {/* Languages */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
                Languages
              </p>
              <div className="flex gap-2 flex-wrap">
                {languages.map((l) => (
                  <span
                    key={l.label}
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${l.bg} ${l.text}`}
                  >
                    {l.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Emergency hotline */}
            <div className="px-5 py-4">
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
                Emergency hotline
              </p>
              <div className="flex items-center gap-2 text-red-600">
                <i className="ti ti-phone text-base" aria-hidden="true" />
                <span className="text-sm font-semibold">1990 · Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Key features ── */}
        <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
          Key features
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-start hover:border-gray-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                <i className={`ti ${f.icon} text-lg text-teal-700`} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">{f.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
}