import { Plus, Stethoscope } from "lucide-react";

export default function DoctorHeader({ onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Stethoscope size={18} className="text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Doctors</h1>
          <p className="text-xs text-gray-400">Manage doctors</p>
        </div>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm"
      >
        <Plus size={15} /> Add Doctor
      </button>
    </div>
  );
}