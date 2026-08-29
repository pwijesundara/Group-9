import Footer from "../../../shared/components/Footer";
import Navbar from "../../../shared/components/Navbar";
import { departments } from "../data/bookAppointmentData";
import { IconWrapper } from "./bookAppointmentUi";

export default function AppointmentSuccess({ form, refNo, onReset }) {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 flex flex-col justify-between">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12 w-full flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white border border-slate-200/80 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center mb-4 text-emerald-600 shadow-sm">
            <IconWrapper size={28}>
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />
            </IconWrapper>
          </div>

          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase mb-1 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md inline-block">
              Request Logged Successfully
            </p>
            <h2 className="text-xl font-black tracking-tight text-slate-900 mt-2 mb-1.5">
              Confirmation Awaiting Review
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Your parameters match standard submission paths. A secure
              validation SMS dispatch is scheduled for{" "}
              <strong>+94 {form.phone}</strong> following administrative desk
              lookups.
            </p>
          </div>

          <div className="w-full bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-left space-y-2.5 mb-6 shadow-inner">
            <div className="flex justify-between text-xs pb-2 border-b border-slate-200/40">
              <span className="text-slate-400 font-medium">
                Registry Tracking reference
              </span>
              <span className="font-mono font-bold text-slate-900 tracking-wider">
                {refNo}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Target Stream</span>
              <span className="font-semibold text-slate-800">
                {departments.find((d) => d.value === form.department)?.label ||
                  "-"}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">
                Assigned Windows
              </span>
              <span className="font-semibold text-slate-800">
                {form.date || "-"} @ {form.time || "-"}
              </span>
            </div>
          </div>

          <p className="text-[10px] font-medium text-slate-400 mb-6 flex items-center gap-1.5">
            <IconWrapper size={12} className="text-slate-300">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </IconWrapper>
            Central Verification Line Desk: 091 222 2261
          </p>

          <button
            onClick={onReset}
            className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 shadow-md transition-all active:scale-98"
          >
            Allocate New Session Record
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
