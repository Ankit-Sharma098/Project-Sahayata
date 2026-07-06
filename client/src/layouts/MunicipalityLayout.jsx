import MunicipalitySidebar from "../components/MunicipalitySidebar";

function MunicipalityLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <MunicipalitySidebar />

      <main className="ml-72 p-8">
        {children}
      </main>
    </div>
  );
}

export default MunicipalityLayout;