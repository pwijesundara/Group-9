import { prefLangs, timeSlots } from "../data/bookAppointmentData";
import { Field, inputBase, SectionHeader } from "./bookAppointmentUi";

export default function ScheduleSection({ form, onChange }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />}
        color={{ bg: "bg-amber-50", icon: "text-amber-600" }}
        title="4. Time-Space Parameters"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field
          label="Target Calendar Date"
          required
          hint="Standard clinics operate Monday through Saturday."
        >
          <input
            type="date"
            value={form.date}
            onChange={onChange("date")}
            min={new Date().toISOString().split("T")[0]}
            required
            className={inputBase}
          />
        </Field>
        <Field label="Preferred Queue Block Slot" required>
          <select
            value={form.time}
            onChange={onChange("time")}
            required
            className={inputBase}
          >
            <option value="">Select target session time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time} hrs
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Primary Consultation Dialect">
        <div className="flex gap-2 flex-wrap mt-1">
          {prefLangs.map((language) => {
            const isActive = form.lang === language;
            return (
              <label
                key={language}
                className={`flex items-center justify-center px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  isActive
                    ? "border-teal-500 bg-teal-50 text-teal-800 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="lang"
                  value={language}
                  checked={isActive}
                  onChange={onChange("lang")}
                  className="sr-only"
                />
                {language}
              </label>
            );
          })}
        </div>
      </Field>
    </div>
  );
}
