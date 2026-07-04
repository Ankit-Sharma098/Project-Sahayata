import { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Wind,
  MapPinned,
  Activity,
} from "lucide-react";
import { getDashboardAnalytics } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import AQIChart from "../components/AQIChart";
import StatusChart from "../components/StatusChart";
import RecentReportsTable from "../components/RecentReportTable";

function Dashboard() {
  const { token, user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    criticalReports: 0,
    averageAQI: 0,
    highestImpactArea: "N/A",
    impactScore: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardAnalytics(token);

      setAnalytics(data.analytics);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Reports",
      value: analytics.totalReports,
      icon: <FileText size={30} />,
    },
    {
      title: "Pending",
      value: analytics.pendingReports,
      icon: <Clock size={30} />,
    },
    {
      title: "Resolved",
      value: analytics.resolvedReports,
      icon: <CheckCircle size={30} />,
    },
    {
      title: "Critical",
      value: analytics.criticalReports,
      icon: <AlertTriangle size={30} />,
    },
    {
      title: "Average AQI",
      value: analytics.averageAQI,
      icon: <Wind size={30} />,
    },
    {
      title: "Impact Score",
      value: analytics.impactScore?.score || 0,
      icon: <Activity size={30} />,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
  <>
    <Sidebar />

    <div className="ml-72 min-h-screen bg-slate-950 p-10">

      {/* Dashboard Header */}
      <DashboardHeader user={user} />

      {/* Analytics Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">
                {card.icon}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Highest Impact Area */}
      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <div className="flex items-center gap-3">

          <MapPinned
            size={28}
            className="text-emerald-400"
          />

          <h2 className="text-2xl font-semibold text-white">
            Highest Impact Area
          </h2>

        </div>

        <p className="mt-6 text-xl text-slate-300">
          {analytics.highestImpactArea}
        </p>

      </div>

      {/* Charts */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <AQIChart />

        <StatusChart />

      </div>
 {/* Recent Reports */}

      <div className="mt-10">

        <RecentReportsTable />

      </div>


    </div>
  </>
);
}

export default Dashboard;