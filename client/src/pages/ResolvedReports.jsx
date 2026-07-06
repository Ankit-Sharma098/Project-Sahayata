import MunicipalityLayout from "../layouts/MunicipalityLayout";
import MunicipalityReportList from "../components/MunicipalityReportList";

function ResolvedReports() {
  return (
    <MunicipalityLayout>

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-white">
          Resolved Reports
        </h1>

        <p className="mt-3 text-slate-400">
          Successfully resolved pollution reports.
        </p>

      </div>

      <MunicipalityReportList status="Resolved" />

    </MunicipalityLayout>
  );
}

export default ResolvedReports;