// Doctor Management Page
import { useCallback, useEffect, useState } from "react";
import DoctorHeader from "../components/DoctorHeader";
import DoctorSearch from "../components/DoctorSearch";
import DoctorTable from "../components/DoctorTable";
import DoctorModal from "../components/DoctorModal";

import {
  getAllDoctors,
  registerDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";

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
  title: "DR",
  profilePhoto: "",
  specialization: "",
  licenseNumber: "",
  department: "",
  qualification: "",
};

export default function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchDoctors = useCallback(async () => {
    const data = await getAllDoctors();
    setDoctors(data);
  }, []);

  // LOAD
  useEffect(() => {
    const timer = setTimeout(fetchDoctors, 0);
    return () => clearTimeout(timer);
  }, [fetchDoctors]);

  // FILTER
  const filtered = doctors.filter((d) =>
    `${d.firstName} ${d.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // CREATE
  const createDoctor = async (payload) => {
    await registerDoctor(payload);
    await fetchDoctors();
    setModal(null);
  };

  // UPDATE
  const update = async (payload) => {
    await updateDoctor(selected.id, payload);
    await fetchDoctors();
    setModal(null);
  };

  // DELETE
  const remove = async () => {
    await deleteDoctor(selected.id);
    await fetchDoctors();
    setModal(null);
  };

  return (
    <div className="p-6 space-y-6">

      <DoctorHeader
        onAdd={() => {
          setForm(EMPTY_FORM);
          setModal("create");
        }}
      />

      <DoctorSearch search={search} setSearch={setSearch} />

      <DoctorTable
        data={filtered}
        onEdit={(doc) => {
          setSelected(doc);
          setForm(doc);
          setModal("edit");
        }}
        onDelete={(doc) => {
          setSelected(doc);
          setModal("delete");
        }}
      />

      {modal && (
        <DoctorModal
          modal={modal}
          form={form}
          setForm={setForm}
          onClose={() => setModal(null)}
          onCreate={createDoctor}
          onUpdate={update}
          onDelete={remove}
        />
      )}

    </div>
  );
}
