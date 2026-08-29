import { Search } from "lucide-react";

export default function PatientSearch({ search, setSearch }) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition shadow-sm"
      />
    </div>
  );
}