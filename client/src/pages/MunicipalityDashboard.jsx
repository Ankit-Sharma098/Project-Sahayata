import {
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Wind,
  User,
  Calendar,
} from "lucide-react";

import { useEffect, useState } from "react";
import MunicipalityLayout from "../layouts/MunicipalityLayout";
import { getReports } from "../services/reportService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { updateReportStatus } from "../services/municipalityService";

function MunicipalityDashboard() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

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

      setReports((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      loadReports();

    }  catch (err) {
  console.log(err);

  console.log(err.response);

  console.log(err.response?.data);

  toast.error(
    err.response?.data?.message || "Update Failed"
  );
}
  };

  return (
    <MunicipalityLayout>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white">
          Municipality Dashboard
        </h1>

        <p className="mt-3 text-slate-400">
          Verify, manage and resolve pollution reports.
        </p>

      </div>

      {/* Analytics */}

      <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <FileText className="text-emerald-400" />

          <h2 className="mt-5 text-4xl font-bold text-white">
            {reports.length}
          </h2>

          <p className="mt-2 text-slate-400">
            Total Reports
          </p>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <Clock className="text-yellow-400" />

          <h2 className="mt-5 text-4xl font-bold text-white">
            {
              reports.filter(
                (r) => r.status === "Pending"
              ).length
            }
          </h2>

          <p className="mt-2 text-slate-400">
            Pending
          </p>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <CheckCircle className="text-green-400" />

          <h2 className="mt-5 text-4xl font-bold text-white">
            {
              reports.filter(
                (r) => r.status === "Resolved"
              ).length
            }
          </h2>

          <p className="mt-2 text-slate-400">
            Resolved
          </p>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <AlertTriangle className="text-red-400" />

          <h2 className="mt-5 text-4xl font-bold text-white">
            {
              reports.filter(
                (r) =>
                  r.aiAnalysis?.severity ===
                  "Critical"
              ).length
            }
          </h2>

          <p className="mt-2 text-slate-400">
            Critical
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="mb-10 flex items-center rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">

        <Search
          size={20}
          className="mr-3 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search Reports..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
        />

      </div>

      {/* Reports */}

      <div className="grid gap-8">

        {reports
          .filter((report) => {
            return (
              report.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||

              report.category
                .toLowerCase()
                .includes(search.toLowerCase())
            );
          })
          .map((report) => (

            <div
              key={report._id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500"
            >

              <div className="flex flex-col gap-6 lg:flex-row">

                <img
                  src={
                    report.image ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={report.title}
                  className="h-56 w-full rounded-2xl object-cover lg:w-72"
                />

                <div className="flex-1">

                  <h2 className="text-3xl font-bold text-white">
                    {report.title}
                  </h2>

                  <p className="mt-4 text-slate-400">
                    {report.description}
                  </p>

                  {/* Details */}

                  <div className="mt-6 grid gap-3 md:grid-cols-2">

                    <div className="flex items-center gap-2 text-slate-300">

                      <MapPin size={18} />

                      {report.location?.address ||
                        "Unknown"}

                    </div>

                    <div className="flex items-center gap-2 text-slate-300">

                      <User size={18} />

                      {report.user?.fullName ||
                        "Citizen"}

                    </div>

                    <div className="flex items-center gap-2 text-slate-300">

                      <Calendar size={18} />

                      {new Date(
                        report.createdAt
                      ).toLocaleDateString()}

                    </div>

                    <div className="flex items-center gap-2 text-cyan-400">

                      <Wind size={18} />

                      AQI :
                      {" "}
                      {report.aqiData?.value ||
                        "N/A"}

                    </div>

                  </div>

                  {/* Badges */}

                  <div className="mt-6 flex flex-wrap gap-3">

                    <span className="rounded-full bg-red-600 px-4 py-2 text-white">
                      {report.aiAnalysis?.severity ||
                        "Unknown"}
                    </span>

                    <span className="rounded-full bg-sky-600 px-4 py-2 text-white">
                      AQI{" "}
                      {report.aqiData?.value ||
                        "N/A"}
                    </span>

                    <span className="rounded-full bg-emerald-600 px-4 py-2 text-white">
                      {report.status ||
                        "Pending"}
                    </span>

                  </div>

                  {/* Buttons */}

                  <div className="mt-8 flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        handleStatus(
                          report._id,
                          "Verified"
                        )
                      }
                      className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                      Verify
                    </button>

                    <button
                      onClick={() =>
                        handleStatus(
                          report._id,
                          "In Progress"
                        )
                      }
                      className="rounded-xl bg-yellow-600 px-5 py-3 text-white hover:bg-yellow-700"
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() =>
                        handleStatus(
                          report._id,
                          "Resolved"
                        )
                      }
                      className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                    >
                      Resolve
                    </button>

                    <button
                      onClick={() =>
                        handleStatus(
                          report._id,
                          "Rejected"
                        )
                      }
                      className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                    >
                      Reject
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

      </div>

    </MunicipalityLayout>
  );
}

export default MunicipalityDashboard;