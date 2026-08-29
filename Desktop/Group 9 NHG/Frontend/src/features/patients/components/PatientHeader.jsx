import { HeartPulse, Plus } from "lucide-react";

export default function PatientHeader({ totalPatients, onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
          <HeartPulse size={18} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Patients</h1>
          <p className="text-xs text-slate-400">{totalPatients} registered</p>
        </div>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
      >
        <Plus size={15} /> Add Patient
      </button>
    </div>
  );
}
