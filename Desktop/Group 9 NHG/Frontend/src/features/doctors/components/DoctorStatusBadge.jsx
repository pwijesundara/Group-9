export default function DoctorStatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded ${
        status === "Active"
          ? "bg-green-100 text-green-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      {status}
    </span>
  );
}