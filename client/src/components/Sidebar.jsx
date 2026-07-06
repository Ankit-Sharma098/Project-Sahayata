import {
  LayoutDashboard,
  FilePlus2,
  FolderOpen,
  Trophy,
  Bell,
  User,
  LogOut,
  Brain,
} from "lucide-react";

import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { token } = useAuth();

const [unreadCount, setUnreadCount] =
  useState(0);

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });

    useEffect(() => {

  loadNotifications();

}, []);

const loadNotifications = async () => {

  try {

    const data =
      await getNotifications(token);

    const unread =
      data.notifications.filter(
        (n) => !n.isRead
      ).length;

    setUnreadCount(unread);

  } catch (err) {

    console.log(err);

  }

};

    window.location.reload();
  };

  const links = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Report Pollution",
      icon: <FilePlus2 size={20} />,
      path: "/report",
    },
    {
      name: "My Reports",
      icon: <FolderOpen size={20} />,
      path: "/my-reports",
    },
    {
      name: "Leaderboard",
      icon: <Trophy size={20} />,
      path: "/leaderboard",
    },
    {
      name: "AI Recommendations",
      icon: <Brain size={20} />,
      path: "/recommendation",
    },
    {
  name: "Notifications",
  icon: (
    <div className="relative">

      <Bell size={20} />

      {unreadCount > 0 && (

        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">

          {unreadCount}

        </span>

      )}

    </div>
  ),
  path: "/notifications",
},
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 p-6">

      {/* Logo */}
      <h1 className="mb-10 text-3xl font-bold text-emerald-400">
        Project Sahayata
      </h1>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">

        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl p-4 transition ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;