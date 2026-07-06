import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Wind,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getReports } from "../services/reportService";
import { updateReportStatus } from "../services/municipalityService";
import { useAuth } from "../context/AuthContext";

function MunicipalityReportList({
  status,
}) {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReports();
  }, [status]);

  const loadReports = async () => {
    try {
      const data = await getReports(token);

      setReports(
        data.reports.filter(
          (report) => report.status === status
        )
      );
    } catch {
      toast.error("Unable to load reports");
    }
  };

  const changeStatus = async (
    id,
    newStatus
  ) => {
    try {
      await updateReportStatus(
        id,
        newStatus,
        `${newStatus} by Municipality`,
        token
      );

      toast.success(
        `Report ${newStatus}`
      );

      loadReports();

    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <>

      <div className="mb-8 flex items-center rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">

        <Search
          className="mr-3 text-slate-500"
          size={20}
        />

        <input
          placeholder="Search Reports..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full bg-transparent text-white outline-none"
        />

      </div>

      <div className="grid gap-8">

        {reports
          .filter((report) =>
            report.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
          .map((report) => (

            <div
              key={report._id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >

              <div className="flex flex-col gap-6 lg:flex-row">

                <img
                  src={report.image}
                  className="h-60 w-full rounded-2xl object-cover lg:w-72"
                />

                <div className="flex-1">

                  <h2 className="text-3xl font-bold text-white">
                    {report.title}
                  </h2>

                  <p className="mt-3 text-slate-400">
                    {report.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">

                    <span className="rounded-full bg-red-600 px-4 py-2 text-white">
                      {report.aiAnalysis?.severity}
                    </span>

                    <span className="rounded-full bg-sky-600 px-4 py-2 text-white">
                      <Wind
                        size={15}
                        className="mr-1 inline"
                      />
                      AQI {report.aqiData?.value}
                    </span>

                    <span className="rounded-full bg-emerald-600 px-4 py-2 text-white">
                      {report.status}
                    </span>

                  </div>

                  <div className="mt-5 flex items-center gap-2 text-slate-300">

                    <MapPin size={18} />

                    {report.location?.address}

                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">

                    <Link
                      to={`/municipality/report/${report._id}`}
                      className="flex items-center gap-2 rounded-xl bg-slate-700 px-5 py-3 text-white"
                    >
                      <Eye size={18} />

                      View

                    </Link>

                    {status ===
                      "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            changeStatus(
                              report._id,
                              "Verified"
                            )
                          }
                          className="rounded-xl bg-blue-600 px-5 py-3 text-white"
                        >
                          Verify
                        </button>

                        <button
                          onClick={() =>
                            changeStatus(
                              report._id,
                              "Rejected"
                            )
                          }
                          className="rounded-xl bg-red-600 px-5 py-3 text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {status ===
                      "Verified" && (
                      <button
                        onClick={() =>
                          changeStatus(
                            report._id,
                            "In Progress"
                          )
                        }
                        className="rounded-xl bg-yellow-600 px-5 py-3 text-white"
                      >
                        <Clock
                          size={18}
                          className="mr-2 inline"
                        />

                        In Progress
                      </button>
                    )}

                    {status ===
                      "In Progress" && (
                      <>
                        <button
                          onClick={() =>
                            changeStatus(
                              report._id,
                              "Resolved"
                            )
                          }
                          className="rounded-xl bg-green-600 px-5 py-3 text-white"
                        >
                          <CheckCircle
                            size={18}
                            className="mr-2 inline"
                          />

                          Resolve
                        </button>

                        <button
                          onClick={() =>
                            changeStatus(
                              report._id,
                              "Rejected"
                            )
                          }
                          className="rounded-xl bg-red-600 px-5 py-3 text-white"
                        >
                          <XCircle
                            size={18}
                            className="mr-2 inline"
                          />

                          Reject
                        </button>
                      </>
                    )}

                </div>

                </div>

              </div>

            </div>

          ))}

      </div>

    </>
  );
}

export default MunicipalityReportList;