import { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, Search, Trash2, UserCog, X } from "lucide-react";
import { registerNurseUser } from "../../auth/services/authService";
import {
  deleteNurse,
  getAllNurses,
  getNurseById,
  updateNurse,
} from "../services/staffService";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  nic: "",
  dob: "",
  mobile: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const ROLE_CONFIG = {
  nurse: {
    title: "Nurse",
    pluralTitle: "Nurses",
    register: registerNurseUser,
    getAll: getAllNurses,
    getById: getNurseById,
    update: updateNurse,
    delete: deleteNurse,
    emailPlaceholder: "nurse@gallehospital.com",
  },
};

const getStaffId = (staff) => staff?.id ?? staff?._id ?? staff?.userId;

const asArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.nurses)) return data.nurses;
  return [];
};

const unwrapOne = (data) => data?.data ?? data?.user ?? data;

const validate = (form, mode) => {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!form.nic.trim()) errors.nic = "NIC is required.";
  if (!form.dob) errors.dob = "Date of birth is required.";
  if (!form.mobile.trim()) errors.mobile = "Mobile is required.";
  if (!form.address.trim()) errors.address = "Address is required.";
  if (!form.email.trim()) errors.email = "Email is required.";

  if (mode === "create") {
    if (!form.password) errors.password = "Password is required.";
    if (!form.confirmPassword) errors.confirmPassword = "Confirm password is required.";
    if (form.password && form.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  return errors;
};

const buildCreatePayload = (form) => ({
  firstName: form.firstName.trim(),
  lastName: form.lastName.trim(),
  nic: form.nic.trim(),
  dob: form.dob,
  mobile: form.mobile.trim(),
  address: form.address.trim(),
  email: form.email.trim(),
  password: form.password,
  confirmPassword: form.confirmPassword,
});

const buildUpdatePayload = (form) => ({
  firstName: form.firstName.trim(),
  lastName: form.lastName.trim(),
  nic: form.nic.trim(),
  dob: form.dob,
  mobile: form.mobile.trim(),
  address: form.address.trim(),
  email: form.email.trim(),
});

const toForm = (staff) => ({
  firstName: staff?.firstName || "",
  lastName: staff?.lastName || "",
  nic: staff?.nic || "",
  dob: staff?.dob || "",
  mobile: staff?.mobile || "",
  address: staff?.address || "",
  email: staff?.email || "",
  password: "",
  confirmPassword: "",
});

function StaffModal({
  config,
  errors,
  form,
  formError,
  mode,
  onChange,
  onClose,
  onSubmit,
  selected,
}) {
  const isDelete = mode === "delete";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {config.title} Account
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#002325]">
              {mode === "create"
                ? `Register ${config.title}`
                : mode === "edit"
                  ? `Edit ${config.title}`
                  : `Delete ${config.title}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close staff form"
          >
            <X size={20} />
          </button>
        </div>

        {formError && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {formError}
          </div>
        )}

        {isDelete ? (
          <p className="text-sm leading-6 text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">
              {[selected?.firstName, selected?.lastName].filter(Boolean).join(" ") ||
                selected?.email ||
                `this ${config.title.toLowerCase()}`}
            </span>
            ?
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["firstName", "First Name", "Sunil"],
              ["lastName", "Last Name", "Perera"],
              ["nic", "NIC", "801234567V"],
              ["dob", "Date of Birth", ""],
              ["mobile", "Mobile", "0771112222"],
              ["email", "Email", config.emailPlaceholder],
              ["address", "Address", "Galle"],
            ].map(([field, label, placeholder]) => (
              <div key={field} className={field === "address" ? "md:col-span-2" : ""}>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </label>
                <input
                  type={field === "dob" ? "date" : field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(event) => onChange(field, event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  placeholder={placeholder}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-600">{errors[field]}</p>
                )}
              </div>
            ))}

            {mode === "create" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => onChange("password", event.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="password123"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      onChange("confirmPassword", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    placeholder="password123"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
              isDelete
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#1f6b50] hover:bg-[#19553f]"
            }`}
          >
            {isDelete ? "Delete" : mode === "create" ? "Register" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StaffCrudSection({ type }) {
  const config = ROLE_CONFIG[type];
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [pageError, setPageError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      const data = await config.getAll();
      setStaff(asArray(data));
      setPageError("");
    } catch (error) {
      setStaff([]);
      setPageError(error.message || `Failed to load ${config.pluralTitle.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    const timer = setTimeout(fetchStaff, 0);
    return () => clearTimeout(timer);
  }, [fetchStaff]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return staff.filter(
      (person) =>
        person.firstName?.toLowerCase().includes(query) ||
        person.lastName?.toLowerCase().includes(query) ||
        person.nic?.toLowerCase().includes(query) ||
        person.mobile?.toLowerCase().includes(query) ||
        person.email?.toLowerCase().includes(query)
    );
  }, [staff, search]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setSelected(null);
    setErrors({});
    setFormError("");
    setModal("create");
  };

  const openEdit = async (person) => {
    try {
      setPageError("");
      setFormError("");
      const latest = unwrapOne(await config.getById(getStaffId(person)));
      setSelected(latest);
      setForm(toForm(latest));
      setErrors({});
      setModal("edit");
    } catch (error) {
      setPageError(error.message || `Failed to load ${config.title.toLowerCase()}.`);
    }
  };

  const openDelete = (person) => {
    setSelected(person);
    setErrors({});
    setFormError("");
    setModal("delete");
  };

  const closeModal = () => {
    setModal(null);
    setSelected(null);
    setErrors({});
    setFormError("");
  };

  const change = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    if (errors[field]) {
      setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
    }
  };

  const save = async () => {
    if (modal !== "delete") {
      const nextErrors = validate(form, modal);
      if (Object.keys(nextErrors).length) {
        setErrors(nextErrors);
        setFormError("");
        return;
      }
    }

    try {
      setFormError("");
      if (modal === "create") {
        await config.register(buildCreatePayload(form));
      } else if (modal === "edit") {
        await config.update(getStaffId(selected), buildUpdatePayload(form));
      } else {
        await config.delete(getStaffId(selected));
      }
      await fetchStaff();
      closeModal();
    } catch (error) {
      setFormError(error.message || `Failed to ${modal} ${config.title.toLowerCase()}.`);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {config.title} Accounts
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#002325]">
            {config.pluralTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f6b50] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#19553f]"
        >
          <UserCog size={18} /> Register {config.title}
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              placeholder={`Search ${config.pluralTitle.toLowerCase()}...`}
            />
          </div>
          <p className="text-sm text-slate-500">{filtered.length} records shown</p>
        </div>

        {pageError && (
          <div className="m-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {pageError}
          </div>
        )}

        {loading ? (
          <div className="px-5 py-12 text-center text-sm text-slate-400">
            Loading {config.pluralTitle.toLowerCase()}...
          </div>
        ) : filtered.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">NIC</th>
                  <th className="px-5 py-3">DOB</th>
                  <th className="px-5 py-3">Mobile</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((person) => (
                  <tr key={getStaffId(person)} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {[person.firstName, person.lastName].filter(Boolean).join(" ") ||
                          "-"}
                      </p>
                      {person.email && (
                        <p className="mt-1 text-xs text-slate-500">{person.email}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{person.nic || "-"}</td>
                    <td className="px-5 py-4 text-slate-600">{person.dob || "-"}</td>
                    <td className="px-5 py-4 text-slate-600">{person.mobile || "-"}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(person)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                          aria-label={`Edit ${config.title}`}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDelete(person)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete ${config.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-sm text-slate-500">
            No {config.pluralTitle.toLowerCase()} found.
          </div>
        )}
      </div>

      {modal && (
        <StaffModal
          config={config}
          errors={errors}
          form={form}
          formError={formError}
          mode={modal}
          onChange={change}
          onClose={closeModal}
          onSubmit={save}
          selected={selected}
        />
      )}
    </section>
  );
}

export default function StaffAccountsPage() {
  return (
    <div className="space-y-8 text-slate-800">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Admin Only
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          Staff Account Management
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Register, update, and remove nurse accounts.
        </p>
      </div>

      <StaffCrudSection type="nurse" />
    </div>
  );
}
