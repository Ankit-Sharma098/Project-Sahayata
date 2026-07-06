import MunicipalityLayout from "../layouts/MunicipalityLayout";
import MunicipalityReportList from "../components/MunicipalityReportList";

function InProgressReports() {
  return (
    <MunicipalityLayout>

      <h1 className="mb-8 text-5xl font-bold text-white">
        In Progress Reports
      </h1>

      <p className="mb-8 text-slate-400">
        Reports currently being handled by the municipality.
      </p>

      <MunicipalityReportList status="In Progress" />

    </MunicipalityLayout>
  );
}

export default InProgressReports;