import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getReports } from "../services/reportService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { updateReportStatus } from "../services/municipalityService";

function MunicipalityDashboard() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports(token);
      setReports(data.reports);
    } catch (err) {
      toast.error("Unable to load reports");
    }
  };

  const handleStatus = async (id, status) => {
  try {
    await updateReportStatus(
      id,
      status,
      `${status} by Municipality`,
      token
    );

    toast.success(`Report ${status}`);

    loadReports();

  } catch (err) {

    toast.error("Update Failed");

  }
};

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold text-white">
        Municipality Dashboard
      </h1>

      <div className="grid gap-8">

        {reports.map((report) => (

  <div
    key={report._id}
    className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
  >

    <div className="flex gap-6">

      <img
        src={report.image}
        alt={report.title}
        className="h-40 w-52 rounded-xl object-cover"
      />

      <div className="flex-1">

        <h2 className="text-2xl font-bold text-white">
          {report.title}
        </h2>

        <p className="mt-3 text-slate-400">
          {report.description}
        </p>

        {/* Badges */}

        <div className="mt-5 flex flex-wrap gap-3">

          <span className="rounded-full bg-red-600 px-4 py-2 text-white">
            {report.aiAnalysis.severity}
          </span>

          <span className="rounded-full bg-sky-600 px-4 py-2 text-white">
            AQI {report.aqiData.value}
          </span>

          <span className="rounded-full bg-emerald-600 px-4 py-2 text-white">
            {report.status}
          </span>

        </div>

        {/* Municipality Actions */}

        <div className="mt-6 flex flex-wrap gap-3">

          <button
            onClick={() =>
              handleStatus(report._id, "Verified")
            }
            className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Verify
          </button>

          <button
            onClick={() =>
              handleStatus(report._id, "In Progress")
            }
            className="rounded-xl bg-yellow-600 px-5 py-2 text-white transition hover:bg-yellow-700"
          >
            In Progress
          </button>

          <button
            onClick={() =>
              handleStatus(report._id, "Resolved")
            }
            className="rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
          >
            Resolve
          </button>

          <button
            onClick={() =>
              handleStatus(report._id, "Rejected")
            }
            className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
          >
            Reject
          </button>

        </div>

      </div>

    </div>

  </div>

))}

      </div>

    </DashboardLayout>
  );
}

export default MunicipalityDashboard;