import { useEffect, useState } from "react";
import { getMyReports } from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function RecentReportsTable() {

  const { token } = useAuth();

  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
  try {
    const data = await getMyReports(token);

    setReports(data.reports.slice(0, 5));

  } catch (error) {

    console.log(error);

  }
};

  return (
    <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Recent Reports
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-700 text-slate-400">

              <th className="pb-4">Title</th>

              <th className="pb-4">Category</th>

              <th className="pb-4">AQI</th>

              <th className="pb-4">Severity</th>

              <th className="pb-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr
                key={report._id}
                className="border-b border-slate-800"
              >

                <td className="py-4 text-white">
                  {report.title}
                </td>

                <td className="text-slate-300">
                  {report.category}
                </td>

                <td className="text-slate-300">
                  {report.aqiData?.value}
                </td>

                <td className="text-red-400">
                  {report.aiAnalysis?.severity}
                </td>

                <td>

                  <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">
                    {report.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentReportsTable;