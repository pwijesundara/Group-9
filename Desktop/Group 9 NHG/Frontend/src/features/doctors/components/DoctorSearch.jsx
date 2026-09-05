import { Search } from "lucide-react";

export default function DoctorSearch({ search, setSearch }) {
  return (
    <div className="relative">
      <Search size={15} className="absolute left-3 top-3 text-gray-400" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search doctors..."
        className="w-full border rounded-xl pl-9 pr-4 py-2"
      />
    </div>
  );
}