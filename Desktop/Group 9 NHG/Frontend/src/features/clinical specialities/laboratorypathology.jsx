import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

const LaboratoryPathology = () => {
  return (
    <>
      <Navbar />

      {/* Main container with clean branding-compatible layout */}
      <main className="max-w-6xl mx-auto px-6 py-12 min-h-screen bg-slate-50/50">
        
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <span className="inline-block bg-[#f5a623]/10 text-[#f5a623] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-[#f5a623]/20">
            Diagnostic & Research Facilities
          </span>
          <h1 className="text-4xl font-extrabold text-[#02342c] tracking-tight mb-3">
            Laboratory & Pathology Department
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            National Hospital Galle provides comprehensive diagnostic testing using automated analysis tracks. Our NABL-compliant facilities deliver high-precision results essential for accurate clinical decisions.
          </p>
        </div>

        {/* Quick Stats / Highlights - Matching Dashboard Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Routine Processing", value: "24/7" },
            { label: "Daily Test Capacity", value: "5000+" },
            { label: "Pathologists & Staff", value: "45+" },
            { label: "Lab Operations", value: "OPEN 24H", isLive: true }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
              {stat.isLive ? (
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[#02342c] text-[#00e676] rounded-md mb-1">
                  {stat.value}
                </span>
              ) : (
                <span className="block text-2xl font-bold text-[#02342c]">{stat.value}</span>
              )}
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Laboratory Services Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl text-[#02342c]">🧪</span>
              </div>
              <h2 className="text-2xl font-bold text-[#02342c]">Clinical Laboratory Services</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">Automated high-throughput screening covering all routine biochemical evaluations.</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Biochemistry & Hematology:</strong> CBC, metabolic panels, and full lipid profiles.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Microbiology & Serology:</strong> Microbial cultures, antibiotic sensitivity testing, and viral loads.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Molecular Diagnostics:</strong> Advanced PCR panels for infectious disease identification.</div>
              </li>
            </ul>
          </div>

          {/* Pathology Services Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl text-[#02342c]">🔬</span>
              </div>
              <h2 className="text-2xl font-bold text-[#02342c]">Pathology Services</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">Specialized cellular and tissue investigations conducted by expert histopathologists.</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Histopathology:</strong> Biopsy tissue processing, surgical resections, and tumor staging.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Cytopathology:</strong> FNAC (Fine Needle Aspiration Cytology) and Pap smear analysis.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Immunohistochemistry (IHC):</strong> Specific cellular markers identification for cancer typing.</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Banner - Custom Deep Forest Green Background */}
        <div className="mt-10 bg-[#02342c] text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Accent Flow Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f5a623]/10 to-transparent rounded-full pointer-events-none"></div>
          
          <div>
            <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest block mb-1">Reports & Inquiries</span>
            <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Laboratory Desk</h3>
            <p className="text-gray-300 text-sm max-w-xl">
              Contact the central laboratory sample reception line directly for test schedules, home collections, or report updates.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 w-full md:w-auto">
            <div className="bg-[#f5a623] text-[#02342c] px-4 py-3 rounded-lg text-center font-bold shadow-md">
              <span className="block text-[10px] uppercase tracking-wider opacity-80 font-medium">Lab Extension</span>
              <a href="tel:+94912232561" className="text-base font-mono whitespace-nowrap">
                📞 +94 91 223 2561
              </a>
            </div>
            <div className="flex flex-col justify-center px-2">
              <span className="block text-[10px] uppercase tracking-wider text-gray-400">Department Email</span>
              <a href="mailto:pathology@gallehospital.lk" className="text-sm font-semibold hover:text-[#f5a623] transition-colors">
                pathology@gallehospital.lk
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default LaboratoryPathology;
