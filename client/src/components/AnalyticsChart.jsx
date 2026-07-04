import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AnalyticsChart({ reports }) {

  const data = reports.map((report) => ({
    name:
      report.title.length > 10
        ? report.title.substring(0, 10) + "..."
        : report.title,

    AQI: report.aqiData?.value || 0,

    Impact:
      report.impactScore?.score || 0,
  }));

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        AQI vs Impact Score
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="AQI"
            fill="#10B981"
          />

          <Bar
            dataKey="Impact"
            fill="#3B82F6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}

export default AnalyticsChart;