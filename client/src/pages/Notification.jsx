import { BellOff, ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  const notifications = [];

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Notifications
          </h1>

          <p className="mt-2 text-slate-400">
            Stay updated with your pollution reports.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-white transition hover:border-emerald-500 hover:bg-slate-900"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <button
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

      </div>

      {/* Empty State */}
      {notifications.length === 0 ? (

        <div className="flex h-[70vh] flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900">

          <div className="rounded-full bg-slate-800 p-8">
            <BellOff
              size={70}
              className="text-slate-500"
            />
          </div>

          <h2 className="mt-8 text-3xl font-bold text-white">
            No Notifications
          </h2>

          <p className="mt-3 max-w-md text-center text-slate-400">
            You're all caught up! New notifications
            about report verification, municipality
            actions and AI updates will appear here.
          </p>

          <div className="mt-8 rounded-full bg-emerald-500/10 px-6 py-3 text-emerald-400">
            ✅ You're all caught up
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Back to Dashboard
          </button>

        </div>

      ) : (

        <div className="space-y-4">
          {/* Future Notification Cards */}
        </div>

      )}

    </div>
  );
}

export default Notifications;