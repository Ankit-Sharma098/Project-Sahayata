import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="mb-10 flex items-center justify-between">

      {/* Left */}
      <div>

        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back,
          <span className="ml-2 text-emerald-400">
            {user?.fullName || "Citizen"}
          </span>
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="flex items-center rounded-xl bg-slate-900 px-4 py-3">

          <Search
            size={18}
            className="mr-3 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search Reports..."
            className="bg-transparent text-white placeholder:text-slate-500 outline-none"
          />

        </div>

        {/* Notification Bell */}
        <NotificationBell />

        {/* User Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">

          {user?.fullName?.charAt(0).toUpperCase() || "U"}

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;