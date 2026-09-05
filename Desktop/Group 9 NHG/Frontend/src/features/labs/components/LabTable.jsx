import { Edit2, Search, Trash2 } from "lucide-react";
import { getLabId } from "./labUtils";

/* Lab Table */

const getLabName = (lab) =>
  [lab.firstName, lab.lastName].filter(Boolean).join(" ") || "Lab account";

export default function LabTable({
  apiError,
  filteredLabs,
  loading,
  onDelete,
  onEdit,
  onSearch,
  search,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            placeholder="Search name, NIC, mobile, or email..."
          />
        </div>
        <p className="text-sm text-slate-500">
          {filteredLabs.length} accounts shown
        </p>
      </div>

      {apiError && (
        <div className="m-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {apiError}
        </div>
      )}

      {loading ? (
        <div className="px-5 py-12 text-center text-sm text-slate-400">
          Loading lab accounts...
        </div>
      ) : filteredLabs.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Lab</th>
                <th className="px-5 py-3">NIC</th>
                <th className="px-5 py-3">DOB</th>
                <th className="px-5 py-3">Mobile</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLabs.map((lab) => (
                <tr key={getLabId(lab)} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">
                      {getLabName(lab)}
                    </p>
                    {lab.email && (
                      <p className="mt-1 max-w-sm truncate text-xs text-slate-500">
                        {lab.email}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {lab.nic || "-"}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {lab.dob || "-"}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {lab.mobile || "-"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {lab.role || "LAB"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(lab)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        aria-label={`Edit ${getLabName(lab)}`}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(lab)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${getLabName(lab)}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-5 py-12 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No lab accounts found.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Register a lab account to start managing laboratory access.
          </p>
        </div>
      )}
    </div>
  );
}
