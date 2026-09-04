import { useEffect, useMemo, useState } from "react";
import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";
import { getAllDoctors } from "../services/doctorService";

const departmentStyles = [
  {
    icon: "ti-stethoscope",
    color: {
      bg: "bg-teal-50",
      icon: "text-teal-700",
      badge: "bg-teal-50 text-teal-700 border-teal-100",
    },
  },
  {
    icon: "ti-heart-rate-monitor",
    color: {
      bg: "bg-pink-50",
      icon: "text-pink-700",
      badge: "bg-pink-50 text-pink-700 border-pink-100",
    },
  },
  {
    icon: "ti-brain",
    color: {
      bg: "bg-purple-50",
      icon: "text-purple-700",
      badge: "bg-purple-50 text-purple-700 border-purple-100",
    },
  },
  {
    icon: "ti-scalpel",
    color: {
      bg: "bg-blue-50",
      icon: "text-blue-700",
      badge: "bg-blue-50 text-blue-700 border-blue-100",
    },
  },
  {
    icon: "ti-urgent",
    color: {
      bg: "bg-red-50",
      icon: "text-red-600",
      badge: "bg-red-50 text-red-700 border-red-100",
    },
  },
  {
    icon: "ti-scan",
    color: {
      bg: "bg-slate-50",
      icon: "text-slate-600",
      badge: "bg-slate-50 text-slate-600 border-slate-200",
    },
  },
];

const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.doctors)) return data.doctors;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
};

const getDoctorId = (doctor, index) =>
  doctor?.id ?? doctor?.doctorId ?? doctor?.userId ?? doctor?.email ?? index;

const getDoctorName = (doctor) =>
  [doctor?.title, doctor?.firstName, doctor?.lastName].filter(Boolean).join(" ") ||
  doctor?.name ||
  doctor?.email ||
  "Doctor";

const normalizeDepartment = (department) => department?.trim() || "General Medicine";

const groupDoctorsByDepartment = (doctors) => {
  const groups = doctors.reduce((acc, doctor) => {
    const label = normalizeDepartment(doctor.department);
    if (!acc[label]) acc[label] = [];
    acc[label].push(doctor);
    return acc;
  }, {});

  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, items], index) => ({
      label,
      doctors: items,
      ...departmentStyles[index % departmentStyles.length],
    }));
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await getAllDoctors();
        setDoctors(toArray(data));
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load doctors");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const departments = useMemo(() => groupDoctorsByDepartment(doctors), [doctors]);

  const highlights = useMemo(() => {
    const specialties = new Set(
      doctors.map((doctor) => doctor.specialization).filter(Boolean)
    );

    return [
      {
        value: doctors.length,
        label: "Consultants",
        icon: "ti-user-check",
        color: "text-teal-700",
        bg: "hover:bg-teal-50/50",
      },
      {
        value: specialties.size,
        label: "Specialties",
        icon: "ti-award",
        color: "text-blue-700",
        bg: "hover:bg-blue-50/50",
      },
      {
        value: departments.length,
        label: "Departments",
        icon: "ti-building-hospital",
        color: "text-purple-700",
        bg: "hover:bg-purple-50/50",
      },
      {
        value: loading ? "..." : "Live",
        label: "",
        icon: "ti-cloud-check",
        color: "text-amber-600",
        bg: "hover:bg-amber-50/50",
      },
    ];
  }, [departments.length, doctors, loading]);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 py-12 antialiased">
        {loading && (
          <div className="mb-6 rounded-2xl bg-white border border-gray-200 p-4 text-sm text-gray-600">
            Loading doctors from the API...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            Failed to load doctors: {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start gap-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 ring-4 ring-teal-50/50">
            <i className="ti ti-users text-2xl text-teal-700" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
              National Hospital Galle
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              Our Doctors
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
              Browse the current doctor profiles registered in the hospital system. The list below is loaded directly from the doctors API.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {highlights.map((h) => (
            <div
              key={h.label}
              className={`bg-white border border-gray-200 rounded-2xl px-4 py-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-300 ${h.bg}`}
            >
              <div className="p-2 rounded-full mb-1">
                <i className={`ti ${h.icon} text-xl ${h.color}`} aria-hidden="true" />
              </div>
              <span className={`text-2xl font-bold tracking-tight ${h.color}`}>
                {h.value}
              </span>
              <span className="text-xs font-medium text-gray-400 mt-1">{h.label}</span>
            </div>
          ))}
        </div>

        {!loading && !error && departments.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center text-sm text-gray-500">
            No doctors are available yet.
          </div>
        )}

        <div className="flex flex-col gap-10">
          {departments.map((dept) => (
            <div key={dept.label} className="group/dept">
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-100 group-hover/dept:border-gray-200 transition-colors duration-300">
                <div className={`w-8 h-8 rounded-xl ${dept.color.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/dept:scale-105`}>
                  <i className={`ti ${dept.icon} text-base ${dept.color.icon}`} aria-hidden="true" />
                </div>
                <p className="text-base font-bold text-gray-800 tracking-tight">{dept.label}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dept.doctors.map((doc, index) => (
                  <div
                    key={getDoctorId(doc, index)}
                    className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gray-300 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-md border ${dept.color.badge} whitespace-nowrap`}
                      >
                        {doc.specialization || dept.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-full ${dept.color.bg} flex items-center justify-center flex-shrink-0 overflow-hidden transition-transform duration-300 group-hover/card:scale-105`}>
                        {doc.profilePhoto ? (
                          <img
                            src={doc.profilePhoto}
                            alt={getDoctorName(doc)}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <i className={`ti ti-user text-lg ${dept.color.icon}`} aria-hidden="true" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-snug tracking-tight">
                          {getDoctorName(doc)}
                        </p>
                        <p className="text-[11px] font-medium text-gray-400 mt-0.5 leading-none">
                          {doc.qualification || "Qualification not provided"}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
                      {doc.specialization || "Specialization not provided"}
                    </p>

                    <div className="flex items-center gap-2 mt-auto pt-2.5 border-t border-gray-100">
                      <i className="ti ti-id text-[12px] text-gray-400" aria-hidden="true" />
                      <span className="text-[11px] font-medium text-gray-500">
                        License: {doc.licenseNumber || "Not provided"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 text-[11px] font-medium text-gray-500">
                      {doc.email && (
                        <span className="flex items-center gap-2">
                          <i className="ti ti-mail text-[12px] text-gray-400" aria-hidden="true" />
                          {doc.email}
                        </span>
                      )}
                      {doc.mobile && (
                        <span className="flex items-center gap-2">
                          <i className="ti ti-phone text-[12px] text-gray-400" aria-hidden="true" />
                          {doc.mobile}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-1 tracking-tight">
              Book a consultant appointment
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Visit the OPD registration desk or call our helpline to confirm clinic availability.
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-teal-700 bg-teal-50 border border-teal-100/50 px-4 py-2 rounded-xl flex-shrink-0 transition-all duration-300 hover:bg-teal-100/60">
            <i className="ti ti-calendar-event text-base" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wide uppercase">
              OPD appointments
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
