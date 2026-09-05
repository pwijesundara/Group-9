import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getLabReportPdf,
  getLabReportsByPatientId,
} from "../services/labService";
import { getAuthData } from "../../../shared/utils/auth";
import { asArray } from "./labUtils";
import PatientLabUploadsList from "./PatientLabUploadsList";

/* Lab Reports */

const getAuthPatientId = (authData) =>
  authData?.patientId || authData?.patientID || authData?.id || authData?.userId || "";

export default function PatientLabReports() {
  const authData = getAuthData();
  const patientId = getAuthPatientId(authData);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const labSentReports = useMemo(
    () => reports.filter((report) => report.reportSource !== "PATIENT"),
    [reports]
  );

  const fetchReports = useCallback(async () => {
    if (!patientId) {
      setReports([]);
      setError("Patient account details are missing from your login session.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getLabReportsByPatientId(patientId);
      setReports(asArray(data));
    } catch (err) {
      setReports([]);
      setError(err.message || "Failed to load lab reports.");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    const timer = setTimeout(fetchReports, 0);
    return () => clearTimeout(timer);
  }, [fetchReports]);

  const downloadPdf = async (report) => {
    try {
      const pdf = await getLabReportPdf(report.id);
      const url = URL.createObjectURL(pdf);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (err) {
      setError(err.message || "Failed to open lab report PDF.");
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Lab Reports
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[#002325]">
          My Lab Reports
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          View PDF reports sent by the laboratory team to your patient account.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <PatientLabUploadsList
        emptyMessage="No lab-sent reports found for your account."
        loading={loading}
        onDownloadPdf={downloadPdf}
        reports={labSentReports}
        title="Lab Sent To Me"
      />
    </div>
  );
}
