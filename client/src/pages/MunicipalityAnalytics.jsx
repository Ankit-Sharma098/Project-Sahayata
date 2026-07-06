import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MunicipalityLayout from "../layouts/MunicipalityLayout";
import { getReports } from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function MunicipalityAnalytics() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports(token);
      setReports(data.reports);
    } catch {
      toast.error("Unable to load analytics");
    }
  };

  const total = reports.length;

  const pending = reports.filter(
    r => r.status === "Pending"
  ).length;

  const verified = reports.filter(
    r => r.status === "Verified"
  ).length;

  const progress = reports.filter(
    r => r.status === "In Progress"
  ).length;

  const resolved = reports.filter(
    r => r.status === "Resolved"
  ).length;

  const rejected = reports.filter(
    r => r.status === "Rejected"
  ).length;

  const critical = reports.filter(
    r => r.aiAnalysis?.severity === "Critical"
  ).length;

  const averageAQI =
    reports.length > 0
      ? Math.round(
          reports.reduce(
            (sum, report) =>
              sum +
              (report.aqiData?.value || 0),
            0
          ) / reports.length
        )
      : 0;

  return (
    <MunicipalityLayout>

      <h1 className="mb-10 text-5xl font-bold text-white">
        Municipality Analytics
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <Card title="Total Reports" value={total} color="emerald"/>

        <Card title="Pending" value={pending} color="yellow"/>

        <Card title="Verified" value={verified} color="blue"/>

        <Card title="In Progress" value={progress} color="orange"/>

        <Card title="Resolved" value={resolved} color="green"/>

        <Card title="Rejected" value={rejected} color="red"/>

        <Card title="Critical" value={critical} color="rose"/>

        <Card title="Average AQI" value={averageAQI} color="sky"/>

      </div>

    </MunicipalityLayout>
  );
}

function Card({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`rounded-3xl border border-${color}-600 bg-slate-900 p-6`}
    >

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="mt-5 text-5xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}

export default MunicipalityAnalytics;