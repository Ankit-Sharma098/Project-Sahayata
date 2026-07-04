import { useEffect, useState } from "react";
import { MapPin, Wind, ShieldAlert } from "lucide-react";
import { getReports } from "../services/reportService";

function RecentReports() {

  const [reports, setReports] = useState([]);

  useEffect(() => {

    const loadReports = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await getReports(token);

        setReports(data.reports);

      } catch (err) {

        console.log(err);

      }

    };

    loadReports();

  }, []);

  return (

    <section className="bg-slate-950 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <h2 className="text-5xl font-bold text-white">

            Recent

            <span className="text-emerald-400">

              {" "}Pollution Reports

            </span>

          </h2>

          <p className="mt-5 text-slate-400">

            Live reports fetched directly from backend

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {reports.slice(0,6).map((report)=>(

            <div
              key={report._id}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition hover:border-emerald-500"
            >

              <img
                src={report.image}
                alt={report.title}
                className="h-60 w-full object-cover"
              />

              <div className="space-y-4 p-6">

                <h3 className="text-2xl font-bold text-white">

                  {report.title}

                </h3>

                <div className="flex items-center gap-2 text-slate-400">

                  <MapPin size={18} />

                  {report.location.address}

                </div>

                <div className="flex items-center gap-2 text-cyan-400">

                  <Wind size={18} />

                  AQI :

                  {report.aqiData.level}

                </div>

                <div className="flex items-center gap-2 text-red-400">

                  <ShieldAlert size={18} />

                  {report.aiAnalysis.severity}

                </div>

                <div className="flex justify-between">

                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">

                    {report.status}

                  </span>

                  <span className="text-slate-500">

                    {new Date(report.createdAt).toLocaleDateString()}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default RecentReports;