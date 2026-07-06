import { Search, Bell, BellOff } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function DashboardHeader() {
  const { user } = useAuth();

  const [showNotifications, setShowNotifications] =
    useState(false);

  // Future me backend se yaha notifications aayenge
  const notifications = [];

  return (
    <header className="relative mb-10 flex items-center justify-between">

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
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800"
          >
            <Bell className="text-white" />
          </button>

          {showNotifications && (

            <div className="absolute right-0 top-16 z-50 w-80 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">

              <h3 className="mb-4 text-lg font-semibold text-white">
                Notifications
              </h3>

              {notifications.length === 0 ? (

                <div className="py-8 text-center">

                  <BellOff
                    size={45}
                    className="mx-auto text-slate-500"
                  />

                  <p className="mt-4 text-slate-400">
                    No notifications yet
                  </p>

                </div>

              ) : (

                notifications.map((item) => (

                  <div
                    key={item.id}
                    className="mb-3 rounded-xl bg-slate-800 p-3 text-white"
                  >
                    {item.message}
                  </div>

                ))

              )}

            </div>

          )}

        </div>

        {/* User Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">

          {user?.fullName
            ?.charAt(0)
            .toUpperCase() || "U"}

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;