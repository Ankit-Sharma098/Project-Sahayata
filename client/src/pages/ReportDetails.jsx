import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getReportById } from "../services/reportService";

function ReportDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const data = await getReportById(id, token);
      setReport(data.report);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load report"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Loading...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Report Not Found
      </div>
    );
  }

  return (
    <DashboardLayout>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* Image */}

        <img
          src={report.image}
          alt={report.title}
          className="w-full rounded-3xl"
        />

        {/* Basic Details */}

        <div>

          <h1 className="text-4xl font-bold text-white">
            {report.title}
          </h1>

          <p className="mt-5 text-slate-400">
            {report.description}
          </p>

          <div className="mt-6">

            <span className="rounded-full bg-emerald-600 px-5 py-2 text-white">
              {report.status}
            </span>

          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-semibold text-white">
              Location
            </h2>

            <p className="mt-3 text-slate-300">
              {report.location.address}
            </p>

          </div>

        </div>

      </div>

      {/* Weather */}

      <div className="mt-10 rounded-3xl bg-slate-900 p-8">

        <h2 className="text-2xl font-bold text-white">
          Weather
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">

          <div>

            <p className="text-slate-400">
              Temperature
            </p>

            <h3 className="text-2xl text-white">
              {report.weather.temperature}°C
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              Humidity
            </p>

            <h3 className="text-2xl text-white">
              {report.weather.humidity}%
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              Wind
            </p>

            <h3 className="text-2xl text-white">
              {report.weather.windSpeed}
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              Condition
            </p>

            <h3 className="text-2xl text-white">
              {report.weather.condition}
            </h3>

          </div>

        </div>

      </div>

      {/* AQI */}

      <div className="mt-10 rounded-3xl bg-slate-900 p-8">

        <h2 className="text-2xl font-bold text-white">
          Air Quality
        </h2>

        <div className="mt-5">

          <h3 className="text-5xl font-bold text-emerald-400">
            {report.aqiData.value}
          </h3>

          <p className="mt-2 text-slate-300">
            {report.aqiData.level}
          </p>

        </div>

      </div>

      {/* AI Analysis */}

      <div className="mt-10 rounded-3xl bg-slate-900 p-8">

        <h2 className="text-3xl font-bold text-white">
          AI Analysis
        </h2>

        <div className="mt-6 space-y-4">

          <p className="text-slate-300">
            <strong>Category:</strong>{" "}
            {report.aiAnalysis.predictedCategory}
          </p>

          <p className="text-slate-300">
            <strong>Confidence:</strong>{" "}
            {report.aiAnalysis.confidence}%
          </p>

          <p className="text-slate-300">
            <strong>Severity:</strong>{" "}
            {report.aiAnalysis.severity}
          </p>

          <p className="text-slate-300">
            <strong>Health Risk:</strong>{" "}
            {report.aiAnalysis.healthRisk}
          </p>

          <p className="text-slate-300">
            <strong>Recommendation:</strong>{" "}
            {report.aiAnalysis.recommendation}
          </p>

          <p className="text-slate-300">
            <strong>Authority:</strong>{" "}
            {report.aiAnalysis.suggestedAuthority}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ReportDetails;