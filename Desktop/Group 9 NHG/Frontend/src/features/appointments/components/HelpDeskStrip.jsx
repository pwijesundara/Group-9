import { IconWrapper } from "./bookAppointmentUi";

export default function HelpDeskStrip() {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
      <div>
        <p className="text-xs font-black tracking-tight mb-0.5">
          Experiencing parameter mapping friction?
        </p>
        <p className="text-[11px] font-medium text-slate-400">
          Connect with local administrative line operators directly.
          Multi-lingual operations enabled.
        </p>
      </div>
      <div className="flex items-center gap-2 border border-slate-800 bg-slate-950 px-4 py-2 rounded-xl text-teal-400 font-mono text-xs font-bold shadow-inner">
        <IconWrapper size={14}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </IconWrapper>
        091 222 2261 - Desk Ext. 1
      </div>
    </div>
  );
}
