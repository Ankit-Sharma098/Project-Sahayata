import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="mb-10 flex items-center justify-between">

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

      <div className="flex items-center gap-5">

        <div className="flex items-center rounded-xl bg-slate-900 px-4 py-3">

          <Search
            size={18}
            className="mr-3 text-slate-500"
          />

          <input
            placeholder="Search Reports..."
            className="bg-transparent text-white outline-none"
          />

        </div>

        <button className="rounded-xl bg-slate-900 p-3 text-white">

          <Bell size={22} />

        </button>

        <div className="rounded-xl bg-emerald-600 px-5 py-3 text-white">

          {user?.fullName?.charAt(0) || "U"}

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;