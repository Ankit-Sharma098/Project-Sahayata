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

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
      icon: <Bell size={20} />,
      path: "/notifications",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-800 bg-slate-950 p-6">

      <h1 className="mb-10 text-3xl font-bold text-emerald-400">
        Project Sahayata
      </h1>

      <nav className="space-y-2">

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
            {item.name}
          </NavLink>
        ))}

      </nav>

      <button
        onClick={handleLogout}
        className="absolute bottom-10 flex w-[220px] items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;