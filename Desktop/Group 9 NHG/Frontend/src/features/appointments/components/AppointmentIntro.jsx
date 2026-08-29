import { IconWrapper } from "./bookAppointmentUi";

export default function AppointmentIntro() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-4 bg-gradient-to-br from-slate-900 to-teal-950 border border-slate-800 rounded-2xl p-6 mb-6 shadow-lg text-white">
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400">
          <IconWrapper size={22}>
            <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" />
          </IconWrapper>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-widest text-teal-400 uppercase mb-1">
            National Tertiary Teaching Complex
          </p>
          <h1 className="text-xl font-black tracking-tight mb-2">
            Outpatient & Specialist Scheduling Engine
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed font-medium">
            Populate target metrics to access professional medical streams.
            Registry operators process transactions systematically against
            real-time queue caps within one business window.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-3 mb-8 shadow-sm">
        <span className="text-amber-500 flex-shrink-0 mt-0.5">
          <IconWrapper size={16}>
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01" />
          </IconWrapper>
        </span>
        <p className="text-xs font-semibold text-amber-900 leading-relaxed">
          Critical Triage Gate: If facing localized chest discomfort, acute
          respiratory restrictions, or profound trauma paths, do NOT log
          electronic queue files. Divert immediately to the Trauma Unit complex
          floor or initiate <strong>1990 Emergency response lines</strong>.
        </p>
      </div>
    </>
  );
}
