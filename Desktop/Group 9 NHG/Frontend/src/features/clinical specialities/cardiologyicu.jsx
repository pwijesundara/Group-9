import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

const CardiologyICU = () => {
  return (
    <>
      <Navbar />

      {/* Main container with a clean white/off-white content area */}
      <main className="max-w-6xl mx-auto px-6 py-12 min-h-screen bg-slate-50/50">
        
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <span className="inline-block bg-[#f5a623]/10 text-[#f5a623] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-[#f5a623]/20">
            Specialized Tertiary Care
          </span>
          <h1 className="text-4xl font-extrabold text-[#02342c] tracking-tight mb-3">
            Cardiology & Intensive Care Unit (ICU)
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            National Hospital Galle offers premier critical care infrastructure. Our unit combines state-of-the-art diagnostic machinery with 24/7 dedicated medical monitoring for rapid recovery.
          </p>
        </div>

        {/* Quick Stats / Highlights - Matching Dashboard Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Critical Care Beds", value: "24/7" },
            { label: "Response Time", value: "< 5 Mins" },
            { label: "Specialist Doctors", value: "12+" },
            { label: "ICU Status", value: "OPEN 24H", isLive: true }
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
          
          {/* Cardiology Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl text-[#02342c]">❤️</span>
              </div>
              <h2 className="text-2xl font-bold text-[#02342c]">Cardiology Services</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">Comprehensive non-invasive and interventional heart care structures.</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Advanced Imaging:</strong> 3D Echocardiography and strain imaging.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Angioplasty & PCI:</strong> 24-hour emergency interventional access.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Arrhythmia Center:</strong> Pacemaker checks and electrophysiology.</div>
              </li>
            </ul>
          </div>

          {/* ICU Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:border-[#02342c]/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#02342c]/5 rounded-xl">
                <span className="text-2xl text-[#02342c]">🩺</span>
              </div>
              <h2 className="text-2xl font-bold text-[#02342c]">Critical Care (ICU)</h2>
            </div>
            <p className="text-gray-500 mb-6 text-sm">Level 3 intensive treatment facility equipped for full life-support requirements.</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Ventilator Support:</strong> High-end respiratory failure management.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Continuous Monitoring:</strong> Real-time hemodynamic vitals tracking.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00e676] font-bold mt-0.5">✔</span> 
                <div><strong>Trauma Response:</strong> Immediate dedicated surgical support workflows.</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Banner - Custom Deep Forest Green Background */}
        <div className="mt-10 bg-[#02342c] text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          {/* Subtle design element matching the background gradient flow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f5a623]/10 to-transparent rounded-full pointer-events-none"></div>
          
          <div>
            <span className="text-[#f5a623] text-xs font-bold uppercase tracking-widest block mb-1">Emergency Lines</span>
            <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Direct Department Admissions</h3>
            <p className="text-gray-300 text-sm max-w-xl">
              Connect immediately with our on-duty triage officer for emergency transfers or urgent clinic scheduling.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 w-full md:w-auto">
            <div className="bg-[#f5a623] text-[#02342c] px-4 py-3 rounded-lg text-center font-bold shadow-md">
              <span className="block text-[10px] uppercase tracking-wider opacity-80 font-medium">Call Hotline</span>
              <a href="tel:+94912232561" className="text-base font-mono whitespace-nowrap">
                📞 +94 91 223 2561
              </a>
            </div>
            <div className="flex flex-col justify-center px-2">
              <span className="block text-[10px] uppercase tracking-wider text-gray-400">Department Email</span>
              <a href="mailto:cardiology@gallehospital.lk" className="text-sm font-semibold hover:text-[#f5a623] transition-colors">
                cardiology@gallehospital.lk
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CardiologyICU;
