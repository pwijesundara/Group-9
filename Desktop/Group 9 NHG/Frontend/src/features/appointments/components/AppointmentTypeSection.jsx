import { useEffect, useState } from "react";
import { getAllClinicSessions, getAllClinics } from "../../clinics/services/clinicService";
import {
  asArray,
  getEntityId,
  getSessionClinicId,
  normalizeTime,
} from "../../clinics/components/clinicUtils";
import { IconWrapper, SectionHeader } from "./bookAppointmentUi";

export default function AppointmentTypeSection({ selectedType, onChange }) {
  const [sessions, setSessions] = useState([]);
  const [clinicById, setClinicById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchClinicSessions = async () => {
      try {
        setLoading(true);
        setError("");
        const [sessionData, clinicData] = await Promise.all([
          getAllClinicSessions(),
          getAllClinics(),
        ]);
        if (!ignore) {
          setSessions(asArray(sessionData));
          setClinicById(
            asArray(clinicData).reduce((map, clinic) => {
              map[String(getEntityId(clinic))] = clinic;
              return map;
            }, {})
          );
        }
      } catch (err) {
        if (!ignore) {
          setSessions([]);
          setClinicById({});
          setError(err.message || "Failed to load clinic sessions.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchClinicSessions();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <SectionHeader
        icon={<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 01-2-2h5l2 3h9a2 2 0 012 2z" />}
        color={{ bg: "bg-blue-50", icon: "text-blue-700" }}
        title="2. Allocation Target Matrix"
      />
      {loading && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-700">
          Loading clinic sessions...
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}
      {!loading && !error && sessions.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-xs font-semibold text-slate-400">
          No clinic sessions available.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((session) => {
          const sessionId = String(getEntityId(session));
          const clinic =
            clinicById[String(getSessionClinicId(session))] || session.clinic;
          const isSelected = String(selectedType) === sessionId;
          return (
            <label
              key={sessionId}
              className={`flex items-start gap-3.5 border rounded-xl p-4 cursor-pointer transition-all hover:shadow-sm hover:-translate-y-0.5 ${
                isSelected
                  ? "border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/10"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="appt-type"
                value={sessionId}
                checked={isSelected}
                onChange={onChange("type")}
                className="mt-1 accent-teal-700 w-4 h-4 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <IconWrapper
                    className={isSelected ? "text-teal-700" : "text-slate-400"}
                    size={14}
                  >
                    <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </IconWrapper>
                  <p className="text-xs font-bold text-slate-900">
                    {clinic?.clinicName || session.clinicName || "Unknown clinic"}
                  </p>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-1 leading-normal">
                  {session.clinicDate || "No date"} at{" "}
                  {normalizeTime(session.startTime) || "--:--"} -{" "}
                  {normalizeTime(session.endTime) || "--:--"}
                </p>
                <p className="text-[11px] font-medium text-slate-400 mt-1 leading-normal">
                  {session.location || "No location"} | Capacity:{" "}
                  {session.maximumPatients ?? "-"}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
