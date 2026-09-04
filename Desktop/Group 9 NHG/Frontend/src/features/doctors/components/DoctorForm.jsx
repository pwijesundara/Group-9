import { Mail, Phone, MapPin, Award, Shield, FileText, Lock } from "lucide-react";

const EMPTY = {
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

const TITLES = ["DR", "PROF", "MR", "MRS", "MISS"];

export default function DoctorForm({ form, setForm, onSubmit, editingDoctor }) {
  const local = form || EMPTY;

  const change = (key, value) => {
    const updated = { ...local, [key]: value };
    setForm(updated);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit({ ...local });
    }
  };

  return (
    <div className="bg-white rounded-xl w-full max-w-5xl mx-auto p-8 shadow-sm max-h-[85vh] overflow-y-auto space-y-10 scrollbar-thin">
      
      {/* RECTANGLE BLOCK 1: Personal Information */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
          Personal Information
        </h3>
        
        {/* Row 1: Title, First Name, Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Title</label>
            <select
              value={local.title}
              onChange={(e) => change("title", e.target.value)}
              className="border border-slate-200 h-13 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
            >
              {TITLES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">First Name</label>
            <input
              placeholder="Kamal"
              value={local.firstName}
              onChange={(e) => change("firstName", e.target.value)}
              className="border border-slate-200 h-13 px-5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
            />
          </div>

          <div className="md:col-span-5 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Last Name</label>
            <input
              placeholder="Perera"
              value={local.lastName}
              onChange={(e) => change("lastName", e.target.value)}
              className="border border-slate-200 h-13 px-5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
            />
          </div>
        </div>

        {/* Row 2: NIC and Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">NIC Number</label>
            <input
              placeholder="199512345678"
              value={local.nic}
              onChange={(e) => change("nic", e.target.value)}
              className="border border-slate-200 h-13 px-5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Date of Birth</label>
            <input
              type="date"
              value={local.dob}
              onChange={(e) => change("dob", e.target.value)}
              className="border border-slate-200 h-13 px-5 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
            />
          </div>
        </div>
      </div>

      {/* RECTANGLE BLOCK 2: Contact Details */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
          Contact Details
        </h3>
        
        {/* Row 1: Email and Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-[18px] text-slate-400" size={16} />
              <input
                type="email"
                placeholder="doctor@hospital.com"
                value={local.email}
                onChange={(e) => change("email", e.target.value)}
                className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Mobile Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-[18px] text-slate-400" size={16} />
              <input
                type="tel"
                placeholder="0771234567"
                value={local.mobile}
                onChange={(e) => change("mobile", e.target.value)}
                className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Full-width Residential Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700">Residential Address</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-[18px] text-slate-400" size={16} />
            <input
              placeholder="No 12, Galle Road, Colombo"
              value={local.address}
              onChange={(e) => change("address", e.target.value)}
              className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* RECTANGLE BLOCK 3: Professional Credentials */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
          Professional Credentials
        </h3>
        
        {/* Row 1: Specialization and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Specialization</label>
            <div className="relative">
              <Award className="absolute left-4 top-[18px] text-slate-400" size={16} />
              <input
                placeholder="Cardiologist"
                value={local.specialization}
                onChange={(e) => change("specialization", e.target.value)}
                className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Department</label>
            <input
              placeholder="Cardiology Unit"
              value={local.department}
              onChange={(e) => change("department", e.target.value)}
              className="border border-slate-200 h-13 px-5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
            />
          </div>
        </div>

        {/* Row 2: License and Qualifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">License Number</label>
            <div className="relative">
              <Shield className="absolute left-4 top-[18px] text-slate-400" size={16} />
              <input
                placeholder="SLMC-12345"
                value={local.licenseNumber}
                onChange={(e) => change("licenseNumber", e.target.value)}
                className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700">Qualifications</label>
            <div className="relative">
              <FileText className="absolute left-4 top-[18px] text-slate-400" size={16} />
              <input
                placeholder="MBBS, MD"
                value={local.qualification}
                onChange={(e) => change("qualification", e.target.value)}
                className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Full-width Profile Photo Link */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700">Profile Photo URL</label>
          <input
            placeholder="https://example.com/photo.jpg"
            value={local.profilePhoto}
            onChange={(e) => change("profilePhoto", e.target.value)}
            className="border border-slate-200 h-13 px-5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-full"
          />
        </div>
      </div>

      {/* RECTANGLE BLOCK 4: Security (Only visible during signup) */}
      {!editingDoctor && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
            Security Credentials
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-[18px] text-slate-400" size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={local.password}
                  onChange={(e) => change("password", e.target.value)}
                  className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-[18px] text-slate-400" size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={local.confirmPassword}
                  onChange={(e) => change("confirmPassword", e.target.value)}
                  className="border border-slate-200 h-13 pl-11 pr-5 rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECTANGLE BASE FORM ACTION CONTROLS */}
      <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
        <button
          onClick={handleSubmit}
          className="bg-[#009661] hover:bg-[#008052] active:scale-[0.995] text-white h-12 rounded-xl font-semibold text-sm w-full transition-all shadow-sm"
        >
          {editingDoctor ? "Update Doctor Profile" : "Register Doctor"}
        </button>
      </div>

    </div>
  );
}
