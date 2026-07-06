import { useEffect, useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Wind } from "lucide-react";
import { getDashboardAnalytics } from "../services/dashboardService";

function LiveStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await getDashboardAnalytics(token);

        setStats(data.analytics);
      } catch (err) {
        console.log(err);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Reports",
      value: stats?.totalReports ?? "--",
      icon: <Activity className="text-emerald-400" />,
    },
    {
      title: "Pending",
      value: stats?.pendingReports ?? "--",
      icon: <AlertTriangle className="text-yellow-400" />,
    },
    {
      title: "Resolved",
      value: stats?.resolvedReports ?? "--",
      icon: <CheckCircle className="text-green-400" />,
    },
    {
      title: "Average AQI",
      value: stats?.averageAQI ?? "--",
      icon: <Wind className="text-cyan-400" />,
    },
  ];

  return (
   <section
  id="statistics"
  className="bg-slate-950 py-24"
>
  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">

      <h2 className="text-5xl font-bold text-white">
        Live Statistics
      </h2>

      <p className="mt-6 text-lg text-slate-400">
        Real-time environmental analytics powered by Project Sahayata.
      </p>

    </div>

    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
        >
          <div className="mb-6 flex justify-center">
  <div className="rounded-2xl bg-emerald-500/10 p-4">
    {card.icon}
  </div>
</div>

          <h2 className="text-3xl font-bold text-white">
            {card.value}
          </h2>

          <p className="mt-2 text-slate-400">
            {card.title}
          </p>
        </div>
      ))}
        </div>
  </div>
</section>
  );
}

export default LiveStats;