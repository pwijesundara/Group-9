import Navbar from "../../../../shared/components/Navbar";
import Footer from "../../../../shared/components/Footer";

const milestones = [
  {
    id: 1,
    era: "Pre-independence era",
    title: "Origins as Galle District General Hospital",
    desc: "The hospital served as the main district-level facility for the Galle region, providing general medical, surgical and maternity services to the Southern Province.",
  },
  {
    id: 2,
    era: "1987",
    title: "Upgraded to Teaching Hospital status",
    desc: "Formally designated as a teaching hospital in association with the Faculty of Medicine, University of Ruhuna, marking the beginning of structured medical education and specialist training.",
  },
  {
    id: 3,
    era: "1990s",
    title: "Expansion of specialties and wards",
    desc: "New clinical departments were established, including cardiology, neurology and dedicated paediatric wards. Bed capacity expanded significantly to serve the growing Southern Province population.",
  },
  {
    id: 4,
    era: "2000s",
    title: "ICU and surgical modernisation",
    desc: "A dedicated multi-specialty intensive care unit was opened, along with a modernised operating theatre complex supporting laparoscopic and orthopaedic procedures.",
  },
  {
    id: 5,
    era: "2010s",
    title: "Radiology and digital health advances",
    desc: "Introduction of CT scanning, digital radiology and PACS systems. The LIS-integrated laboratory was expanded and a barcode-based pharmacy dispensing system was introduced.",
  },
  {
    id: 6,
    era: "2024",
    title: "3T MRI unit inaugurated",
    desc: "A state-of-the-art 3 Tesla MRI machine was installed in the radiology department, significantly advancing diagnostic imaging capability for neurological and musculoskeletal conditions.",
  },
  {
    id: 7,
    era: "2026",
    title: "Official digital platform launched",
    desc: "Launch of the official NHG multilingual website with online appointment booking, patient portal, role-based modules and AI-assisted patient guidance — a major step in digital health transformation.",
  },
];

const significance = [
  "NHG has long functioned as the tertiary referral point for the entire Southern Province — accepting complex cases from Matara, Hambantota and Ratnapura that cannot be managed at district-level facilities.",
  "Its dual role as a clinical institution and teaching hospital means that generations of doctors, nurses and allied health professionals have been trained within its wards and departments.",
];

function HistoryPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl px-6 py-6 mb-6">
          <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">⚕</span>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-xl font-semibold text-gray-900 mb-1.5">
              History of National Hospital Galle
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              From a colonial-era district hospital to the leading tertiary care centre of Southern Sri Lanka —
              a journey of nearly four decades of healthcare excellence.
            </p>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

          {/* Left — Milestones timeline */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
              Institutional milestones
            </p>
            <div className="flex flex-col gap-0">
              {milestones.map((m, idx) => (
                <div key={m.id} className="flex gap-4">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center flex-shrink-0 w-8">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-600 border-2 border-white ring-1 ring-teal-600 mt-1 flex-shrink-0 z-10" />
                    {idx < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200 my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-5 flex-1 ${idx === milestones.length - 1 ? "pb-0" : ""}`}>
                    <span className="inline-block text-[10px] font-semibold tracking-widest text-teal-700 uppercase bg-teal-50 border border-teal-100 rounded px-2 py-0.5 mb-1.5">
                      {m.era}
                    </span>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{m.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="flex flex-col gap-4">

            {/* Historical significance */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
                Historical significance
              </p>
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-5">
                {significance.map((s, i) => (
                  <p
                    key={i}
                    className={`text-xs text-gray-500 leading-relaxed ${i < significance.length - 1 ? "mb-3" : ""}`}
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>

            {/* University affiliation */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
                University of Ruhuna affiliation
              </p>
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-5 flex gap-3 items-start">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-lg">
                  🎓
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The hospital serves as the primary clinical training site for the Faculty of Medicine,
                  University of Ruhuna, Matara. Undergraduate and postgraduate medical students receive
                  hands-on training across all major departments.
                </p>
              </div>
            </div>

            {/* Catchment stats */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
                Southern Province catchment
              </p>
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-5 grid grid-cols-2 divide-x divide-gray-200">
                <div className="flex flex-col items-center gap-1 pr-4">
                  <span className="text-2xl font-semibold text-gray-900">3</span>
                  <span className="text-[10px] text-gray-400 text-center leading-tight">Districts served</span>
                </div>
                <div className="flex flex-col items-center gap-1 pl-4">
                  <span className="text-2xl font-semibold text-gray-900">~2.5M</span>
                  <span className="text-[10px] text-gray-400 text-center leading-tight">Population catchment</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HistoryPage;// madhuka