import { Field, inputBase, SectionHeader } from "./bookAppointmentUi";

export default function MedicalContextSection({ reason, onChange }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8M16 17H8" />}
        color={{ bg: "bg-emerald-50", icon: "text-emerald-700" }}
        title="5. Contextual Medical Indicators"
      />
      <Field
        label="Reason for Session Allocation"
        required
        hint="Provide short outline of symptoms or specific referral indications clearly."
      >
        <textarea
          value={reason}
          onChange={onChange("reason")}
          rows={3}
          required
          placeholder="Describe presentation logs (e.g. Chronic joint stiffness noticed during morning cycles, localized swelling over left knee base)..."
          className={`${inputBase} resize-none leading-relaxed`}
        />
      </Field>
    </div>
  );
}
