import { useEffect, useState } from "react";
import {
    Search,
    CheckCircle,
    XCircle,
    Eye,
    MapPin,
    Wind,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import MunicipalityLayout from "../layouts/MunicipalityLayout";
//import MunicipalityReportList from "../components/MunicipalityReportList";
import { getReports } from "../services/reportService";
import { updateReportStatus } from "../services/municipalityService";
import { useAuth } from "../context/AuthContext";

function PendingReports() {
    const { token } = useAuth();

    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const data = await getReports(token);

            setReports(
                data.reports.filter(
                    (report) => report.status === "Pending"
                )
            );
        } catch (err) {
            toast.error("Unable to load reports");
        } finally {
            setLoading(false);
        }
    };

    const verifyReport = async (id) => {
        try {
            await updateReportStatus(
                id,
                "Verified",
                "Verified by Municipality",
                token
            );

            toast.success("Report Verified");

            loadReports();
        } catch {
            toast.error("Verification Failed");
        }
    };

    const rejectReport = async (id) => {
        try {
            await updateReportStatus(
                id,
                "Rejected",
                "Rejected by Municipality",
                token
            );

            toast.success("Report Rejected");

            loadReports();
        } catch {
            toast.error("Reject Failed");
        }
    };

    if (loading) {
        return (
            <MunicipalityLayout>
                <div className="text-center text-2xl text-white">
                    Loading...
                </div>
            </MunicipalityLayout>
        );
    }

    return (
        <MunicipalityLayout>

            <h1 className="mb-8 text-5xl font-bold text-white">
                Pending Reports
            </h1>

            <div className="mb-8 flex items-center rounded-2xl bg-slate-900 px-5 py-4">

                <Search
                    className="mr-3 text-slate-500"
                    size={20}
                />

                <input
                    placeholder="Search Pending Reports..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full bg-transparent text-white outline-none"
                />

            </div>

            <div className="grid gap-8">

                {reports
                    .filter((report) =>
                        report.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((report) => (

                        <div
                            key={report._id}
                            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
                        >

                            <div className="flex flex-col gap-6 lg:flex-row">

                                <img
                                    src={report.image}
                                    alt={report.title}
                                    className="h-56 w-full rounded-2xl object-cover lg:w-72"
                                />

                                <div className="flex-1">

                                    <h2 className="text-3xl font-bold text-white">
                                        {report.title}
                                    </h2>

                                    <p className="mt-3 text-slate-400">
                                        {report.description}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-3">

                                        <span className="rounded-full bg-red-600 px-4 py-2 text-white">
                                            {report.aiAnalysis?.severity}
                                        </span>

                                        <span className="rounded-full bg-sky-600 px-4 py-2 text-white">
                                            <Wind
                                                size={15}
                                                className="mr-1 inline"
                                            />
                                            AQI {report.aqiData?.value}
                                        </span>

                                        <span className="rounded-full bg-yellow-600 px-4 py-2 text-white">
                                            Pending
                                        </span>

                                    </div>

                                    <div className="mt-5 flex items-center gap-2 text-slate-300">

                                        <MapPin size={18} />

                                        {report.location?.address}

                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">

                                        <Link
                                            to={`/municipality/report/${report._id}`}
                                        className="flex items-center gap-2 rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-600"
                                        >
                                            <Eye size={18} />
                                            View
                                        </Link>

                                        <button
                                            onClick={() =>
                                                verifyReport(report._id)
                                            }
                                            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                                        >
                                            <CheckCircle size={18} />
                                            Verify
                                        </button>

                                        <button
                                            onClick={() =>
                                                rejectReport(report._id)
                                            }
                                            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                                        >
                                            <XCircle size={18} />
                                            Reject
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

            </div>

        </MunicipalityLayout>
    );
}

export default PendingReports;