import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Map,
  Bell,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MunicipalitySidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
    });

    window.location.reload();
  };

  const links = [
    {
      name: "Dashboard",
      path: "/municipality",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Pending Reports",
      path: "/municipality/pending",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Verified",
      path: "/municipality/verified",
      icon: <CheckCircle size={20} />,
    },
    {
      name: "In Progress",
      path: "/municipality/progress",
      icon: <Clock size={20} />,
    },
    {
      name: "Critical",
      path: "/municipality/critical",
      icon: <AlertTriangle size={20} />,
    },
    {
      name: "Analytics",
      path: "/municipality/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Pollution Map",
      path: "/municipality/map",
      icon: <Map size={20} />,
    },
    {
      name: "Notifications",
      path: "/municipality/notifications",
      icon: <Bell size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-800 bg-slate-950 p-6">

      <h1 className="mb-10 text-3xl font-bold text-emerald-400">
        Municipality
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
        className="absolute bottom-6 flex w-[225px] items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
}

export default MunicipalitySidebar;