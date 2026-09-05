import { Plus } from "lucide-react";

/* Lab Admin Header */

export default function LabAdminHeader({ onCreate }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Lab Accounts
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          Laboratory Management
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Register lab users and manage account details through the lab account API.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f6b50] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#19553f]"
      >
        <Plus size={18} /> Register Lab
      </button>
    </div>
  );
}
