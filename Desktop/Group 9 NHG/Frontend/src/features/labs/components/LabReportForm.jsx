import { useEffect, useRef } from "react";
import { Upload } from "lucide-react";
import LabField from "./LabField";

/* Lab Report Form */

export default function LabReportForm({
  error,
  form,
  loading,
  onChange,
  onFileChange,
  onSubmit,
  showPatientPhone = true,
  submitLabel = "Create Report",
  success,
}) {
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!form.report && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [form.report]);

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5"
    >
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Upload Report
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {showPatientPhone && (
          <LabField label="Patient Phone Number">
            <input
              value={form.patientPhoneNumber}
              onChange={(event) => onChange("patientPhoneNumber", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="0771234567"
            />
          </LabField>
        )}

        <div className="md:col-span-2">
          <LabField label="PDF Report">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => onFileChange(event.target.files?.[0] || null)}
              className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-emerald-700"
            />
          </LabField>
        </div>

        <div className="md:col-span-2">
          <LabField label="Description">
            <textarea
              value={form.description}
              onChange={(event) => onChange("description", event.target.value)}
              className="min-h-24 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder="Blood test report"
            />
          </LabField>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f6b50] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#19553f] disabled:opacity-60"
      >
        <Upload size={17} /> {loading ? "Uploading..." : submitLabel}
      </button>
    </form>
  );
}
