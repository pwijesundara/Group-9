import { ChevronDown, X } from "lucide-react";

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ModalShell({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const inputCls = (error) =>
  `w-full bg-white border rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 transition ${
    error
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-200 focus:ring-emerald-200 focus:border-emerald-400"
  }`;

export default function PatientModal({
  modal,
  selected,
  form,
  errors,
  bloodGroups,
  onChange,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}) {
  if (modal === "delete" && selected) {
    return (
      <ModalShell title="Remove Patient" onClose={onClose}>
        <div className="p-6">
          <p className="text-slate-500 text-sm">
            Are you sure you want to remove{" "}
            <span className="text-slate-700 font-medium">
              {selected.firstName} {selected.lastName}
            </span>
            ?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm transition bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
          >
            Remove
          </button>
        </div>
      </ModalShell>
    );
  }

  if (modal !== "create" && modal !== "edit") return null;

  return (
    <ModalShell title={modal === "create" ? "Add Patient" : "Edit Patient"} onClose={onClose}>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name" error={errors.firstName}>
            <input
              className={inputCls(errors.firstName)}
              placeholder="Kamal"
              value={form.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
            />
          </Field>

          <Field label="Last Name" error={errors.lastName}>
            <input
              className={inputCls(errors.lastName)}
              placeholder="Perera"
              value={form.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="NIC" error={errors.nic}>
            <input
              className={inputCls(errors.nic)}
              placeholder="9090909090"
              value={form.nic}
              onChange={(e) => onChange("nic", e.target.value)}
            />
          </Field>

          <Field label="Date of Birth" error={errors.dob}>
            <input
              className={inputCls(errors.dob)}
              type="date"
              value={form.dob}
              onChange={(e) => onChange("dob", e.target.value)}
            />
          </Field>

          <Field label="Blood Group" error={errors.bloodGroup}>
            <div className="relative">
              <select
                className={`${inputCls(errors.bloodGroup)} appearance-none pr-8`}
                value={form.bloodGroup || ""}
                onChange={(e) => onChange("bloodGroup", e.target.value)}
              >
                <option value="">Select</option>
                {bloodGroups.map((blood) => (
                  <option key={blood} value={blood}>
                    {blood}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" error={errors.email}>
            <input
              className={inputCls(errors.email)}
              placeholder="patient@gmail.com"
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </Field>

          <Field label="Mobile" error={errors.mobile}>
            <input
              className={inputCls(errors.mobile)}
              placeholder="0775389172"
              value={form.mobile}
              onChange={(e) => onChange("mobile", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Address" error={errors.address}>
            <input
              className={inputCls(errors.address)}
              placeholder="Galle"
              value={form.address}
              onChange={(e) => onChange("address", e.target.value)}
            />
          </Field>

          <Field label="Emergency Contact">
            <input
              className={inputCls()}
              placeholder="0770000000"
              value={form.emergencyContact || ""}
              onChange={(e) => onChange("emergencyContact", e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Height" error={errors.height}>
            <input
              className={inputCls(errors.height)}
              placeholder="170"
              type="number"
              min="1"
              value={form.height || ""}
              onChange={(e) => onChange("height", e.target.value)}
            />
          </Field>

          <Field label="Weight" error={errors.weight}>
            <input
              className={inputCls(errors.weight)}
              placeholder="65"
              type="number"
              min="1"
              value={form.weight || ""}
              onChange={(e) => onChange("weight", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Allergies">
          <textarea
            className={inputCls()}
            placeholder="Penicillin, peanuts, or leave empty"
            rows={2}
            value={form.allergies || ""}
            onChange={(e) => onChange("allergies", e.target.value)}
          />
        </Field>

        <Field label="Medical History">
          <textarea
            className={inputCls()}
            placeholder="Previous surgeries, chronic conditions, or leave empty"
            rows={3}
            value={form.medicalHistory || ""}
            onChange={(e) => onChange("medicalHistory", e.target.value)}
          />
        </Field>
      </div>

      <div className="flex gap-3 px-6 pb-6">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm transition bg-white"
        >
          Cancel
        </button>
        <button
          onClick={modal === "create" ? onCreate : onUpdate}
          className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
        >
          {modal === "create" ? "Add Patient" : "Save Changes"}
        </button>
      </div>
    </ModalShell>
  );
}