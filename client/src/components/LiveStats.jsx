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
    <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-emerald-500"
        >
          <div className="mb-4 flex items-center justify-between">
            {card.icon}
          </div>

          <h2 className="text-3xl font-bold text-white">
            {card.value}
          </h2>

          <p className="mt-2 text-slate-400">
            {card.title}
          </p>
        </div>
      ))}
    </section>
  );
}

export default LiveStats;