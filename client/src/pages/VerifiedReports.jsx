import MunicipalityLayout from "../layouts/MunicipalityLayout";
import MunicipalityReportList from "../components/MunicipalityReportList";

function VerifiedReports() {
  return (
    <MunicipalityLayout>

      <h1 className="mb-8 text-5xl font-bold text-white">
        Verified Reports
      </h1>

      <p className="mb-8 text-slate-400">
        Reports verified by the municipality and waiting to be processed.
      </p>

      <MunicipalityReportList status="Verified" />

    </MunicipalityLayout>
  );
}

export default VerifiedReports;