import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

const PediatricsNeonatology = () => {
  return (
    <>
      <Navbar />

      {/* Main container with a subtle green-tinted background matching the corporate brand */}
      <main className="max-w-6xl mx-auto px-6 py-12 min-h-screen bg-[#02342c]/5">
        
        {/* Header Section */}
        <div className="border-b border-[#02342c]/10 pb-6 mb-8">
          <span className="inline-block bg-[#f5a623]/10 text-[#f5a623] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-[#f5a623]/20">
            Specialized Child & Newborn Care
          </span>
          <h1 className="text-4xl font-extrabold text-[#02342c] tracking-tight mb-3">
            Pediatrics & Neonatology Department
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
            National Hospital Galle offers compassionate, specialized medical care for infants, children, and adolescents. Our advanced Neonatal Intensive Care Unit (NICU) provides round-the-clock life-support interventions for critical and premature newborns.
          </p>
        </div>

        {/* Quick Stats / Highlights - Styled precisely like the dashboard grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "NICU & Care Beds", value: "24/7" },
            { label: "Pediatrics OPD", value: "31 waiting", isLiveStatus: true },
            { label: "Senior Pediatricians", value: "10+" },
            { label: "Emergency Response", value: "OPEN 24H", isLive: true }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-[#02342c]/10 shadow-sm text-center flex flex-col justify-center items-center">
              {stat.isLive ? (
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[#02342c] text-[#00e676] rounded-md mb-1">
                  {stat.value}
                </span>
              ) : stat.isLiveStatus ? (
                <span className="block text-2xl font-bold text-[#f5a623]">{stat.value}</span>
              ) : (
                <span className="block text-2xl font-bold text-[#02342c]">{stat.value}</span>
              )}
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Pediatrics Services Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#02342c]/10 p-8 hover:border-[#02342c]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl border border-[#02342c]/10">
                <span className="text-2xl">🧸</span>
              </div>
              <h2 className="text-2xl font-bold text-[#02342c]">Pediatric Medicine</h2>
            </div>
            <p className="text-slate-500 mb-6 text-sm">Comprehensive outpatient and inpatient care targeting development, illness, and acute childhood conditions.</p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>General Pediatrics & Immunization:</strong> Routine check-ups, developmental screening, and national vaccination schedules.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Pediatric Emergency:</strong> 24-hour treatment for acute respiratory distress, severe infections, and high fevers.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Chronic Condition Management:</strong> Dedicated specialty tracking for childhood asthma, allergies, and juvenile diabetes.</div>
              </li>
            </ul>
          </div>

          {/* Neonatology Services Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#02342c]/10 p-8 hover:border-[#02342c]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl border border-[#02342c]/10">
                <span className="text-2xl">👶</span>
              </div>
              <h2 className="text-2xl font-bold text-[#02342c]">Neonatal Care (NICU)</h2>
            </div>
            <p className="text-slate-500 mb-6 text-sm">Level 3 advanced intensive unit providing highly specialized support structures for fragile newborns.</p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Premature Newborn Support:</strong> Incubator care, surfactant therapy, and specialized high-risk nurturing environments.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Advanced Respiratory Care:</strong> Neonatal mechanical ventilation and continuous high-flow oxygen delivery.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Continuous Vitals Monitoring:</strong> Dedicated 1:1 nurse-to-patient hemodynamic and metabolic tracking arrays.</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Banner - Custom Deep Forest Green Background */}
        <div className="mt-10 bg-[#02342c] text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Accent Flow Design Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f5a623]/10 to-transparent rounded-full pointer-events-none"></div>
          
          <div>
            <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest block mb-1">Admissions & Inquiries</span>
            <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Pediatric & NICU Desk</h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Connect directly with our pediatric reception to coordinate immediate neonatal transfers, scheduled clinical visits, or critical care admissions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 w-full md:w-auto z-10">
            <div className="bg-[#f5a623] text-[#02342c] px-4 py-3 rounded-lg text-center font-bold shadow-md hover:bg-[#f5a623]/90 transition-colors">
              <span className="block text-[10px] uppercase tracking-wider opacity-80 font-medium">Direct Hotline</span>
              <a href="tel:+94912232561" className="text-base font-mono whitespace-nowrap">
                📞 +94 91 223 2561
              </a>
            </div>
            <div className="flex flex-col justify-center px-2">
              <span className="block text-[10px] uppercase tracking-wider text-slate-400">Department Email</span>
              <a href="mailto:pediatrics@gallehospital.lk" className="text-sm font-semibold hover:text-[#f5a623] text-white transition-colors">
                pediatrics@gallehospital.lk
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PediatricsNeonatology;
