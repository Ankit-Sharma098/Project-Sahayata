import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="ml-72 min-h-screen p-8">
        <DashboardHeader />

        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;