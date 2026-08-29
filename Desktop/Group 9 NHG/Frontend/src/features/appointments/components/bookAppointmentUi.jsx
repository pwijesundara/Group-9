import AppointmentIntro from "./AppointmentIntro";
import AppointmentTypeSection from "./AppointmentTypeSection";
import HelpDeskStrip from "./HelpDeskStrip";
import MedicalContextSection from "./MedicalContextSection";
import PersonalDetailsSection from "./PersonalDetailsSection";
import ScheduleSection from "./ScheduleSection";
import SubmitSection from "./SubmitSection";

export default function BookAppointmentForm({
  form,
  patientDetailsError,
  patientDetailsLoading,
  submitError,
  submitLoading,
  onChange,
  onSubmit,
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <AppointmentIntro />

      <form onSubmit={onSubmit} className="space-y-6">
        <PersonalDetailsSection
          form={form}
          loading={patientDetailsLoading}
          error={patientDetailsError}
          onChange={onChange}
        />
        <AppointmentTypeSection selectedType={form.type} onChange={onChange} />
        <ScheduleSection form={form} onChange={onChange} />
        <MedicalContextSection reason={form.reason} onChange={onChange} />
        <SubmitSection
          consent={form.consent}
          error={submitError}
          loading={submitLoading}
          onChange={onChange}
        />
        <HelpDeskStrip />
      </form>
    </div>
  );
}
