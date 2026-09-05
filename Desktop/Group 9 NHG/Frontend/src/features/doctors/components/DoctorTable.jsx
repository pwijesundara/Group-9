import { Pencil, Trash2, User, Mail, Phone } from "lucide-react";

export default function DoctorTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full text-sm">

        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3">Doctor</th>
            <th>Specialization</th>
            <th>Contact</th>
            <th>Details</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d.id} className="border-t hover:bg-gray-50">

              {/* DOCTOR NAME */}
              <td className="p-3">
                <div className="flex items-center gap-2 font-medium">
                  <User size={14} />
                  {d.title} {d.firstName} {d.lastName}
                </div>
                <div className="text-xs text-gray-500">
                  NIC: {d.nic}
                </div>
              </td>

              {/* SPECIALIZATION */}
              <td className="p-3">
                <div className="font-medium">{d.specialization}</div>
                <div className="text-xs text-gray-500">
                  {d.department}
                </div>
              </td>

              {/* CONTACT */}
              <td className="p-3 text-xs space-y-1">
                <div className="flex items-center gap-1">
                  <Mail size={12} /> {d.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={12} /> {d.mobile}
                </div>
              </td>

              {/* EXTRA DETAILS */}
              <td className="p-3 text-xs text-gray-600 space-y-1">
                <div>DOB: {d.dob}</div>
                <div>License: {d.licenseNumber}</div>
                <div>Role: {d.role}</div>
              </td>

              {/* ACTIONS */}
              <td className="p-3 text-right">
                <button
                  onClick={() => onEdit(d)}
                  className="mr-2 text-blue-500"
                >
                  <Pencil size={14} />
                </button>

                <button
                  onClick={() => onDelete(d)}
                  className="text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
