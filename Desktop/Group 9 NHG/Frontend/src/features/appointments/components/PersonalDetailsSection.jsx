import { Field, inputBase, SectionHeader } from "./bookAppointmentUi";

const lockedInputBase = `${inputBase} cursor-not-allowed bg-slate-100 text-slate-600 focus:border-slate-200 focus:bg-slate-100 focus:ring-0`;

export default function PersonalDetailsSection({ form, loading, error, onChange }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />}
        color={{ bg: "bg-teal-50", icon: "text-teal-700" }}
        title="1. Personal Demographic Records"
      />
      {loading && (
        <div className="mb-4 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-xs font-semibold text-teal-700">
          Loading patient details...
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First name" required>
          <input
            type="text"
            value={form.firstName}
            onChange={onChange("firstName")}
            placeholder="Kasun"
            required
            readOnly
            className={lockedInputBase}
          />
        </Field>
        <Field label="Last name" required>
          <input
            type="text"
            value={form.lastName}
            onChange={onChange("lastName")}
            placeholder="Perera"
            required
            readOnly
            className={lockedInputBase}
          />
        </Field>
        <Field label="Date of birth" required>
          <input
            type="date"
            value={form.dob}
            onChange={onChange("dob")}
            required
            readOnly
            className={lockedInputBase}
          />
        </Field>
        <Field label="Gender identity" required>
          <select
            value={form.gender}
            onChange={onChange("gender")}
            required
            disabled
            className={lockedInputBase}
          >
            <option value="">Select gender alignment</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Omit verification parameter</option>
          </select>
        </Field>
        <Field
          label="National ID (NIC) / Passport Reference"
          required
          hint="Used to extract existing electronic history files smoothly from centralized clinical logs."
        >
          <input
            type="text"
            value={form.nic}
            onChange={onChange("nic")}
            placeholder="e.g. 199012345678"
            required
            readOnly
            className={lockedInputBase}
          />
        </Field>
        <Field
          label="Primary Contact Mobile Stream"
          required
          hint="Critical token gate. Session tracking tokens route here."
        >
          <div className="flex gap-2 relative">
            <span className="flex items-center px-3 border border-slate-200 rounded-xl bg-slate-100 text-xs font-bold text-slate-500 select-none shadow-inner">
              +94
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={onChange("phone")}
              placeholder="77 123 4567"
              required
              readOnly
              className={lockedInputBase}
            />
          </div>
        </Field>
        <Field
          label="Electronic Mail (Email)"
          hint="Optional. Alternative diagnostic summary dispatch routing endpoint."
        >
          <input
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="kasun.perera@example.com"
            readOnly
            className={lockedInputBase}
          />
        </Field>
        <Field
          label="Residential Boundary Address"
          hint="District bounds classification matches core scheduling zones."
        >
          <input
            type="text"
            value={form.address}
            onChange={onChange("address")}
            placeholder="Galle, Southern Province"
            readOnly
            className={lockedInputBase}
          />
        </Field>
      </div>
    </div>
  );
}
