import MunicipalityLayout from "../layouts/MunicipalityLayout";
import MunicipalityReportList from "../components/MunicipalityReportList";

function RejectedReports() {
  return (
    <MunicipalityLayout>

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white">
          Rejected Reports
        </h1>

        <p className="mt-3 text-slate-400">
          Reports rejected after municipality verification.
        </p>

      </div>

      <MunicipalityReportList status="Rejected" />

    </MunicipalityLayout>
  );
}

export default RejectedReports;