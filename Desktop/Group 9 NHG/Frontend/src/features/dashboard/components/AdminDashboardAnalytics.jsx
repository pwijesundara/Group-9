import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  CalendarDays,
  ClipboardList,
  Microscope,
  Stethoscope,
  UserCog,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";//dfgtgh
import { getAllAppointmentRequests } from "../../appointments/services/appointmentService";
import { getAllClinicSessions, getAllClinics } from "../../clinics/services/clinicService";
import { getClinicDoctorIds, getEntityId } from "../../clinics/components/clinicUtils";
import { getAllDoctors } from "../../doctors/services/doctorService";
import { getAllLabReports, getAllLabs } from "../../labs/services/labService";
import { getAllPatients } from "../../patients/services/patientService";
import { getAllNurses } from "../../staff/services/staffService";

const EMPTY_DATA = {
  appointments: [],
  clinics: [],
  doctors: [],
  labReports: [],
  labs: [],
  nurses: [],
  patients: [],
  sessions: [],
};

const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const isToday = (value) => {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const isUpcoming = (value) => {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

const formatTime = (value) => (value ? String(value).slice(0, 5) : "--:--");

const getStatusCount = (appointments, status) =>
  appointments.filter((request) => request.status === status).length;

const getReportCount = (reports, source) =>
  reports.filter((report) => report.reportSource === source).length;

const getClinicName = (session, clinicById) =>
  clinicById[String(session.clinicId ?? getEntityId(session.clinic))]?.clinicName ||
  session.clinic?.clinicName ||
  session.clinicName ||
  "Clinic";

const makeRecentActivity = ({ appointments, labReports, sessions }) => {
  const appointmentItems = appointments.slice(0, 4).map((item) => ({
    id: `appointment-${item.id}`,
    title: `${item.status || "PENDING"} appointment`,
    detail: `${item.patientName || "Patient"} - ${item.clinicName || "Clinic"}`,
    when: item.acceptedAt || item.requestedAt,
  }));

  const labItems = labReports.slice(0, 4).map((item) => ({
    id: `lab-${item.id}`,
    title: item.reportSource === "PATIENT" ? "Patient sent lab report" : "Lab sent report",
    detail: item.fileName || item.description || "Lab report",
    when: item.submittedAt,
  }));

  const sessionItems = sessions.slice(0, 3).map((item) => ({
    id: `session-${getEntityId(item)}`,
    title: "Clinic session scheduled",
    detail: `${item.clinicDate || "No date"} at ${item.location || "No location"}`,
    when: item.clinicDate,
  }));

  return [...appointmentItems, ...labItems, ...sessionItems]
    .sort((a, b) => new Date(b.when || 0) - new Date(a.when || 0))
    .slice(0, 8);
};

function StatCard({ icon: Icon, label, tone = "emerald", value }) {
  const toneClass = {
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-sky-50 text-sky-700",
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700",
  }[tone];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-[#002325]">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneClass}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function StatusBar({ count, label, total, tone }) {
  const percent = total ? Math.round((count / total) * 100) : 0;
  const toneClass = {
    amber: "bg-amber-500",
    emerald: "bg-emerald-600",
    rose: "bg-rose-500",
  }[tone];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{count}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${toneClass}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function AdminDashboardAnalytics() {
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const results = await Promise.allSettled([
        getAllPatients(),
        getAllDoctors(),
        getAllNurses(),
        getAllLabs(),
        getAllClinics(),
        getAllClinicSessions(),
        getAllAppointmentRequests(),
        getAllLabReports(),
      ]);

      const nextData = {
        patients: asArray(results[0].value),
        doctors: asArray(results[1].value),
        nurses: asArray(results[2].value),
        labs: asArray(results[3].value),
        clinics: asArray(results[4].value),
        sessions: asArray(results[5].value),
        appointments: asArray(results[6].value),
        labReports: asArray(results[7].value),
      };

      const failed = results.find((result) => result.status === "rejected");
      if (failed) {
        setError(failed.reason?.message || "Some analytics data could not be loaded.");
      }
      setData(nextData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchAnalytics, 0);
    return () => clearTimeout(timer);
  }, [fetchAnalytics]);

  const analytics = useMemo(() => {
    const clinicById = data.clinics.reduce((map, clinic) => {
      map[String(getEntityId(clinic))] = clinic;
      return map;
    }, {});

    const doctorWorkload = data.doctors
      .map((doctor) => {
        const doctorId = String(getEntityId(doctor));
        const assignedClinics = data.clinics.filter((clinic) =>
          getClinicDoctorIds(clinic).map(String).includes(doctorId)
        );
        const acceptedPatients = data.appointments.filter(
          (request) =>
            request.status === "ACCEPTED" &&
            assignedClinics.some((clinic) => String(getEntityId(clinic)) === String(request.clinicId))
        ).length;

        return {
          id: doctorId,
          acceptedPatients,
          assignedClinics: assignedClinics.length,
          name:
            [doctor.title, doctor.firstName, doctor.lastName].filter(Boolean).join(" ") ||
            doctor.name ||
            doctor.email ||
            "Doctor",
        };
      })
      .sort((a, b) => b.acceptedPatients - a.acceptedPatients || b.assignedClinics - a.assignedClinics)
      .slice(0, 5);

    const upcomingSessions = data.sessions
      .filter((session) => isUpcoming(session.clinicDate))
      .sort((a, b) => new Date(a.clinicDate || 0) - new Date(b.clinicDate || 0))
      .slice(0, 5);

    return {
      accepted: getStatusCount(data.appointments, "ACCEPTED"),
      clinicById,
      doctorWorkload,
      labSent: getReportCount(data.labReports, "LAB"),
      patientSent: getReportCount(data.labReports, "PATIENT"),
      pending: getStatusCount(data.appointments, "PENDING"),
      recentActivity: makeRecentActivity(data),
      removed: getStatusCount(data.appointments, "REMOVED"),
      todaySessions: data.sessions.filter((session) => isToday(session.clinicDate)).length,
      upcomingSessions,
    };
  }, [data]);

  const totalAppointments = data.appointments.length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Admin Overview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#002325]">
              Hospital Operations Dashboard
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Live view of patients, staff, appointments, sessions, and lab report activity.
            </p>
          </div>
          <Link
            to="/dashboard/patients"
            className="inline-flex w-fit items-center justify-center rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
          >
            View Patients
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertCircle size={17} className="mt-0.5" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-400">
          Loading dashboard analytics...
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Users} label="Patients" value={data.patients.length} />
            <StatCard icon={Stethoscope} label="Doctors" tone="blue" value={data.doctors.length} />
            <StatCard icon={UserCog} label="Staff" tone="slate" value={data.nurses.length + data.labs.length} />
            <StatCard icon={CalendarDays} label="Today Sessions" tone="amber" value={analytics.todaySessions} />
            <StatCard icon={ClipboardList} label="Pending Requests" tone="amber" value={analytics.pending} />
            <StatCard icon={Activity} label="Accepted Requests" value={analytics.accepted} />
            <StatCard icon={Microscope} label="Lab Reports" tone="blue" value={data.labReports.length} />
            <StatCard icon={ClipboardList} label="Clinics" tone="rose" value={data.clinics.length} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h3 className="font-bold text-[#002325]">Appointment Status</h3>
                <p className="mt-1 text-sm text-slate-500">{totalAppointments} total requests</p>
              </div>
              <div className="space-y-4">
                <StatusBar count={analytics.pending} label="Pending" total={totalAppointments} tone="amber" />
                <StatusBar count={analytics.accepted} label="Accepted" total={totalAppointments} tone="emerald" />
                <StatusBar count={analytics.removed} label="Removed" total={totalAppointments} tone="rose" />
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h3 className="font-bold text-[#002325]">Lab Report Flow</h3>
                <p className="mt-1 text-sm text-slate-500">Separated by sender type</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-emerald-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Lab Sent</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-900">{analytics.labSent}</p>
                </div>
                <div className="rounded-lg bg-sky-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Patient Sent</p>
                  <p className="mt-2 text-3xl font-bold text-sky-900">{analytics.patientSent}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-bold text-[#002325]">Upcoming Sessions</h3>
                <span className="text-xs font-semibold text-slate-400">{data.sessions.length} total</span>
              </div>
              <div className="divide-y divide-slate-100">
                {analytics.upcomingSessions.length ? (
                  analytics.upcomingSessions.map((session) => (
                    <div key={getEntityId(session)} className="grid gap-3 py-3 md:grid-cols-[1fr_auto]">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {getClinicName(session, analytics.clinicById)}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {session.location || "No location"} - {session.description || "No description"}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-slate-600 md:text-right">
                        <p>{session.clinicDate || "No date"}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-slate-400">No upcoming sessions.</p>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <h3 className="font-bold text-[#002325]">Doctor Workload</h3>
                <p className="mt-1 text-sm text-slate-500">Accepted patients and assigned clinics</p>
              </div>
              <div className="space-y-3">
                {analytics.doctorWorkload.length ? (
                  analytics.doctorWorkload.map((doctor) => (
                    <div key={doctor.id} className="rounded-lg border border-slate-100 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-800">{doctor.name}</p>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          {doctor.acceptedPatients} patients
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {doctor.assignedClinics} assigned clinic(s)
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-sm text-slate-400">No doctor workload data.</p>
                )}
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="font-bold text-[#002325]">Recent Activity</h3>
              <p className="mt-1 text-sm text-slate-500">Latest appointment, lab, and session updates</p>
            </div>
            <div className="divide-y divide-slate-100">
              {analytics.recentActivity.length ? (
                analytics.recentActivity.map((item) => (
                  <div key={item.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.detail}</p>
                    </div>
                    <p className="text-xs text-slate-400">
                      {item.when ? new Date(item.when).toLocaleString() : "-"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-slate-400">No recent activity.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
