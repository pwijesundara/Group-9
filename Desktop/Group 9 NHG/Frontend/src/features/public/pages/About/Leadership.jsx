import Navbar from "../../../../shared/components/Navbar";
import Footer from "../../../../shared/components/Footer";

/* Leadership Page */

const executives = [
  {
    initials: "DR",
    name: "Dr. (Name Withheld)",
    role: "Director / Medical Superintendent",
    credentials: "MBBS, MD, FRCP · Ministry of Health appointment",
    dept: "Overall administration & clinical governance",
    color: "bg-slate-200 text-slate-700",
  },
  {
    initials: "DD",
    name: "Dr. (Deputy Director)",
    role: "Deputy Director — Medical Services",
    credentials: "MBBS, MD · Senior Medical Officer",
    dept: "Clinical operations and specialist services",
    color: "bg-amber-200 text-amber-800",
  },
];

const clinicalHeads = [
  { initials: "RP", name: "Dr. R. Pathirage",      role: "Head, Paediatrics",  credentials: "MD, DCH, FRCPCH",       dept: "Paediatrics & Neonatology", color: "bg-green-200 text-green-800" },
  { initials: "NW", name: "Dr. N. Wickramasinghe", role: "Head, Neurology",    credentials: "MD, DM Neurology",       dept: "Neurology",                 color: "bg-purple-200 text-purple-800" },
  { initials: "DS", name: "Dr. D. Silva",           role: "Head, Surgery",      credentials: "MBBS, MS, FRCS",         dept: "General Surgery",            color: "bg-blue-200 text-blue-800" },
  { initials: "SK", name: "Dr. S. Karunanayake",   role: "Head, Cardiology",   credentials: "MD, MRCP (UK), FESC",    dept: "Cardiology & ICU",           color: "bg-orange-200 text-orange-800" },
  { initials: "AP", name: "Dr. A. Perera",          role: "Head, OBG",          credentials: "MBBS, MD (OBG)",         dept: "Maternity & Gynaecology",    color: "bg-pink-200 text-pink-800" },
  { initials: "LF", name: "Dr. L. Fernando",        role: "Head, Radiology",    credentials: "MBBS, MD Radiology",     dept: "Radiology & Imaging",        color: "bg-teal-200 text-teal-800" },
];
// this is admin details
const adminLeads = [
  { initials: "IT", name: "Mr. I. Tissera",      role: "RTI Officer",               credentials: "LLB, Administration",        dept: "Right to information & compliance", color: "bg-slate-200 text-slate-700" },
  { initials: "CN", name: "Ms. C. Nanayakkara",  role: "Chief Nursing Officer",      credentials: "BSc Nursing, MSc",            dept: "Nursing services & patient care",   color: "bg-green-200 text-green-800" },
  { initials: "HM", name: "Mr. H. Marasinghe",   role: "Chief Administrative Officer", credentials: "BSc Public Administration, MBA", dept: "Finance, HR & administration",  color: "bg-amber-200 text-amber-800" },
  { initials: "PK", name: "Mr. P. Kumara",        role: "IT / Systems Manager",       credentials: "BSc Computer Science",        dept: "Digital systems & hospital IT",     color: "bg-cyan-200 text-cyan-800" },
];

function Avatar({ initials, color }) {
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

function PersonCard({ person }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2.5 hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar initials={person.initials} color={person.color} />
        <div>
          <p className="text-sm font-medium text-gray-900 leading-tight">{person.name}</p>
          <p className="text-xs text-teal-700 font-medium leading-tight mt-0.5">{person.role}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{person.credentials}</p>
      <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-0.5 w-fit">
        {person.dept}
      </span>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
      {text}
    </p>
  );
}

export default function Leadership() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl px-6 py-6 mb-6">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-2xl">
            🏛️
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-xl font-semibold text-gray-900 mb-1.5">
              Leadership &amp; Administration
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              The senior management and clinical leadership team responsible for the governance,
              operations and strategic direction of National Hospital Galle.
            </p>
          </div>
        </div>

        {/* ── Executive management ── */}
        <section className="mb-8">
          <SectionLabel text="Executive management" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {executives.map((p) => (
              <PersonCard key={p.initials} person={p} />
            ))}
          </div>
        </section>

        {/* ── Clinical department heads ── */}
        <section className="mb-8">
          <SectionLabel text="Department heads — clinical" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {clinicalHeads.map((p) => (
              <PersonCard key={p.initials} person={p} />
            ))}
          </div>
        </section>

        {/* ── Administrative & support leads ── */}
        <section>
          <SectionLabel text="Administrative & support leads" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {adminLeads.map((p) => (
              <PersonCard key={p.initials} person={p} />
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}