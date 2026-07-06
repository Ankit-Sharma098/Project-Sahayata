import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Search,
  Eye,
  MapPin,
  Wind,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import MunicipalityLayout from "../layouts/MunicipalityLayout";
import { getReports } from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function CriticalReports() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports(token);

      setReports(
        data.reports.filter(
          (report) =>
            report.aiAnalysis?.severity ===
            "Critical"
        )
      );
    } catch {
      toast.error("Unable to load reports");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MunicipalityLayout>
        <div className="flex h-[70vh] items-center justify-center text-3xl text-white">
          Loading...
        </div>
      </MunicipalityLayout>
    );
  }

  return (
    <MunicipalityLayout>

      <h1 className="mb-8 flex items-center gap-3 text-5xl font-bold text-white">
        <AlertTriangle className="text-red-500" size={40} />
        Critical Reports
      </h1>

      {/* Search */}

      <div className="mb-8 flex items-center rounded-2xl bg-slate-900 px-5 py-4">

        <Search className="mr-3 text-slate-500" />

        <input
          type="text"
          placeholder="Search Critical Reports..."
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
              .includes(search.toLowerCase())
          )
          .map((report) => (

            <div
              key={report._id}
              className="rounded-3xl border border-red-500/30 bg-slate-900 p-6"
            >

              <div className="flex flex-col gap-6 lg:flex-row">

                <img
                  src={report.image}
                  alt={report.title}
                  className="h-60 w-full rounded-2xl object-cover lg:w-80"
                />

                <div className="flex-1">

                  <h2 className="text-4xl font-bold text-white">
                    {report.title}
                  </h2>

                  <p className="mt-4 text-slate-400">
                    {report.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">

                    <span className="rounded-full bg-red-600 px-4 py-2 text-white">
                      🚨 Critical
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

                  <Link
                    to={`/municipality/report/${report._id}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                  >
                    <Eye size={18} />
                    View Report
                  </Link>

                </div>

              </div>

            </div>

          ))}

        {reports.length === 0 && (
          <div className="rounded-3xl bg-slate-900 p-12 text-center">

            <AlertTriangle
              size={60}
              className="mx-auto text-slate-500"
            />

            <h2 className="mt-6 text-3xl font-bold text-white">
              No Critical Reports
            </h2>

            <p className="mt-3 text-slate-400">
              Everything looks safe 🎉
            </p>

          </div>
        )}

      </div>

    </MunicipalityLayout>
  );
}

export default CriticalReports;