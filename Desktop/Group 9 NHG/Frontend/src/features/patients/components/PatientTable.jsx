import { Calendar, Home, Mail, Pencil, Phone, Trash2, User } from "lucide-react";

export default function PatientTable({ patients, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {["Patient", "DOB / NIC", "Blood", "Contact", "Address", ""].map(
              (heading) => (
                <th
                  key={heading}
                  className="px-5 py-3.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wide"
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((patient, index) => (
              <tr
                key={patient.id}
                className={`border-b border-slate-100 hover:bg-slate-50 transition ${
                  index === patients.length - 1 ? "border-none" : ""
                }`}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <User size={14} />
                    </div>
                    <span className="font-medium text-slate-700">
                      {patient.firstName} {patient.lastName}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-slate-600 text-xs">
                      <Calendar size={11} /> {patient.dob}
                    </span>
                    <span className="text-slate-400 text-xs">{patient.nic}</span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-50 text-red-500 text-xs font-semibold ring-1 ring-red-100">
                    {patient.bloodGroup || "N/A"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Mail size={11} /> {patient.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Phone size={11} /> {patient.mobile}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-500 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Home size={11} /> {patient.address}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => onEdit(patient)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(patient)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
