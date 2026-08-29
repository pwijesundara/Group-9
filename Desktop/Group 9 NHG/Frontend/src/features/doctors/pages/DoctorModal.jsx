import DoctorForm from "./DoctorForm";

export default function DoctorModal({
  modal,
  form,
  setForm,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}) {
  if (!modal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl w-[520px]">

        {modal === "delete" ? (
          <>
            <p className="mb-4">Are you sure you want to delete this doctor?</p>

            <div className="flex gap-3">
              <button onClick={onClose} className="px-4 py-2 border">
                Cancel
              </button>
              <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white">
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <DoctorForm
              form={form}
              setForm={setForm}
              editingDoctor={modal === "edit"}
              onSubmit={modal === "create" ? onCreate : onUpdate}
            />

            <button
              onClick={onClose}
              className="mt-3 w-full border px-4 py-2"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}