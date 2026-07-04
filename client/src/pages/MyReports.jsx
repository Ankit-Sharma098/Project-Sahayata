import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, MapPin, Wind } from "lucide-react";
import {
  getMyReports,
  deleteReport,
} from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function MyReports() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getMyReports(token);
      setReports(data.reports);
    } catch (err) {
      toast.error(
        err.message || "Unable to fetch reports"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?"))
      return;

    try {
      await deleteReport(id, token);

      toast.success("Report Deleted");

      loadReports();

    } catch (err) {

      toast.error("Delete Failed");

    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );

  return (
    <section className="min-h-screen bg-slate-950 p-10">

      <h1 className="mb-10 text-5xl font-bold text-white">
        My Reports
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {reports.map((report) => (

          <div
            key={report._id}
            className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
          >

            <img
              src={report.image}
              className="h-60 w-full object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold text-white">
                {report.title}
              </h2>

              <p className="mt-3 text-slate-400">
                {report.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-emerald-400">

                <MapPin size={18} />

                {report.location.address}

              </div>

              <div className="mt-3 flex items-center gap-2 text-sky-400">

                <Wind size={18} />

                AQI : {report.aqiData.value}

              </div>

              <div className="mt-3">

                <span className="rounded-full bg-red-600 px-4 py-2 text-sm text-white">

                  {report.aiAnalysis.severity}

                </span>

              </div>

              <div className="mt-4">

                <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm text-white">

                  {report.status}

                </span>

              </div>

              <button
                onClick={() =>
                  handleDelete(report._id)
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
              >

                <Trash2 size={18} />

                Delete Report

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default MyReports;