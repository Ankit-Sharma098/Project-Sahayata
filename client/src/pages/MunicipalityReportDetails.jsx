import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MunicipalityLayout from "../layouts/MunicipalityLayout";
import { getReportById } from "../services/reportService";
import { updateReportStatus } from "../services/municipalityService";
import { useAuth } from "../context/AuthContext";

function MunicipalityReportDetails() {
    const { id } = useParams();
    const { token } = useAuth();

    const [report, setReport] = useState(null);
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {
        try {
            const data = await getReportById(id, token);
            setReport(data.report);
        } catch {
            toast.error("Unable to load report");
        }
    };

    const updateStatus = async (status) => {
        try {
            await updateReportStatus(
                report._id,
                status,
                remarks,
                token
            );

            toast.success(`Report ${status}`);

            loadReport();
        } catch {
            toast.error("Unable to update");
        }
    };

    if (!report) {
        return (
            <MunicipalityLayout>
                <div className="flex h-[80vh] items-center justify-center text-3xl text-white">
                    Loading...
                </div>
            </MunicipalityLayout>
        );
    }

    return (
        <MunicipalityLayout>

            <h1 className="mb-10 text-5xl font-bold text-white">
                Report Details
            </h1>

            <div className="grid gap-8 lg:grid-cols-2">

                {/* Left Side */}

                <div>

                    <img
                        src={report.image}
                        alt={report.title}
                        className="w-full rounded-3xl object-cover"
                    />

                    {/* Citizen Card */}

                    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <h2 className="mb-6 text-3xl font-bold text-white">
                            Citizen Information
                        </h2>

                        <div className="space-y-4">

                            <p className="text-white">
                                <b>Name :</b>{" "}
                                {report.user?.fullName || "N/A"}
                            </p>

                            <p className="text-white">
                                <b>Email :</b>{" "}
                                {report.user?.email || "N/A"}
                            </p>

                        </div>

                        {/* Pollution Location */}

                        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                            <h2 className="mb-6 text-3xl font-bold text-white">
                                Pollution Location
                            </h2>

                            <MapContainer
                                center={[
                                    report.location.coordinates[1],
                                    report.location.coordinates[0],
                                ]}
                                zoom={15}
                                style={{
                                    height: "350px",
                                    width: "100%",
                                    borderRadius: "20px",
                                }}
                            >

                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker
                                    position={[
                                        report.location.coordinates[1],
                                        report.location.coordinates[0],
                                    ]}
                                >

                                    <Popup>

                                        <strong>{report.title}</strong>

                                        <br />

                                        AQI : {report.aqiData?.value}

                                    </Popup>

                                </Marker>

                            </MapContainer>

                        </div>
                    </div>

                </div>

                {/* Right Side */}

                <div>

                    {/* Report Details */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <h2 className="text-4xl font-bold text-white">
                            {report.title}
                        </h2>

                        <p className="mt-5 text-slate-300">
                            {report.description}
                        </p>

                        <hr className="my-8 border-slate-700" />

                        <div className="space-y-5">

                            <p className="text-white">
                                <b>Category :</b> {report.category}
                            </p>

                            <p className="text-white">
                                <b>Status :</b> {report.status}
                            </p>

                            <p className="text-white">
                                <b>AQI :</b>{" "}
                                {report.aqiData?.value}
                            </p>

                            <p className="text-white">
                                <b>AQI Level :</b>{" "}
                                {report.aqiData?.level}
                            </p>

                            <p className="text-white">
                                <b>Severity :</b>{" "}
                                {report.aiAnalysis?.severity}
                            </p>

                            <p className="text-white">
                                <b>Impact Score :</b>{" "}
                                {report.impactScore?.score}
                            </p>

                            <p className="text-white">
                                <b>Health Risk :</b>{" "}
                                {report.aiAnalysis?.healthRisk}
                            </p>

                            <p className="text-white">
                                <b>Recommendation :</b>{" "}
                                {report.aiAnalysis?.recommendation}
                            </p>

                            <p className="text-white">
                                <b>Address :</b>{" "}
                                {report.location?.address}
                            </p>

                            <p className="text-white">
                                <b>City :</b>{" "}
                                {report.location?.city}
                            </p>

                            <p className="text-white">
                                <b>State :</b>{" "}
                                {report.location?.state}
                            </p>

                        </div>

                    </div>
                    {/* Weather Details */}

                    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <h2 className="mb-6 text-3xl font-bold text-white">
                            Weather Details
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <div>
                                <p className="text-slate-400">Temperature</p>

                                <h2 className="mt-2 text-3xl font-bold text-white">
                                    {report.weather?.temperature}°C
                                </h2>
                            </div>

                            <div>
                                <p className="text-slate-400">Humidity</p>

                                <h2 className="mt-2 text-3xl font-bold text-white">
                                    {report.weather?.humidity}%
                                </h2>
                            </div>

                            <div>
                                <p className="text-slate-400">Wind Speed</p>

                                <h2 className="mt-2 text-3xl font-bold text-white">
                                    {report.weather?.windSpeed} km/h
                                </h2>
                            </div>

                            <div>
                                <p className="text-slate-400">Condition</p>

                                <h2 className="mt-2 text-3xl font-bold text-white">
                                    {report.weather?.condition}
                                </h2>
                            </div>

                        </div>

                    </div>

                    {/* AQI Components */}

                    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <h2 className="mb-6 text-3xl font-bold text-white">
                            Air Quality Components
                        </h2>

                        <div className="grid grid-cols-2 gap-5 text-white">

                            <p>PM2.5 : {report.aqiData?.components?.pm2_5}</p>

                            <p>PM10 : {report.aqiData?.components?.pm10}</p>

                            <p>CO : {report.aqiData?.components?.co}</p>

                            <p>NO₂ : {report.aqiData?.components?.no2}</p>

                            <p>SO₂ : {report.aqiData?.components?.so2}</p>

                            <p>O₃ : {report.aqiData?.components?.o3}</p>

                        </div>

                    </div>

                    {/* AI Analysis */}

                    <div className="mt-8 rounded-3xl border border-purple-700 bg-slate-900 p-8">

                        <h2 className="mb-8 text-3xl font-bold text-white">
                            🤖 AI Analysis
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div className="rounded-2xl bg-slate-800 p-5">

                                <p className="text-slate-400">
                                    Predicted Category
                                </p>

                                <h2 className="mt-3 text-2xl font-bold text-emerald-400">
                                    {report.aiAnalysis?.predictedCategory}
                                </h2>

                            </div>

                            <div className="rounded-2xl bg-slate-800 p-5">

                                <p className="text-slate-400">
                                    Confidence
                                </p>

                                <div className="mt-4 h-4 w-full overflow-hidden rounded-full bg-slate-700">

                                    <div
                                        style={{
                                            width: `${report.aiAnalysis?.confidence}%`,
                                        }}
                                        className="h-full bg-emerald-500"
                                    />

                                </div>

                                <p className="mt-3 text-2xl font-bold text-emerald-400">
                                    {report.aiAnalysis?.confidence}%
                                </p>

                            </div>

                            <div className="rounded-2xl bg-slate-800 p-5">

                                <p className="text-slate-400">
                                    Severity
                                </p>

                                <h2 className="mt-3 text-2xl font-bold text-red-400">
                                    {report.aiAnalysis?.severity}
                                </h2>

                            </div>

                            <div className="rounded-2xl bg-slate-800 p-5">

                                <p className="text-slate-400">
                                    Health Risk
                                </p>

                                <h2 className="mt-3 text-xl font-bold text-yellow-400">
                                    {report.aiAnalysis?.healthRisk}
                                </h2>

                            </div>

                        </div>

                        <div className="mt-8 rounded-2xl bg-slate-800 p-6">

                            <h3 className="text-xl font-semibold text-white">
                                Suggested Authority
                            </h3>

                            <p className="mt-3 text-slate-300">
                                {report.aiAnalysis?.suggestedAuthority}
                            </p>

                        </div>

                        <div className="mt-6 rounded-2xl bg-slate-800 p-6">

                            <h3 className="text-xl font-semibold text-white">
                                AI Recommendation
                            </h3>

                            <p className="mt-3 leading-8 text-slate-300">
                                {report.aiAnalysis?.recommendation}
                            </p>

                        </div>

                    </div>

                    {/* Municipality Action */}

                    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <h2 className="mb-6 text-3xl font-bold text-white">
                            Municipality Action
                        </h2>

                        <textarea
                            rows="5"
                            placeholder="Write remarks..."
                            value={remarks}
                            onChange={(e) =>
                                setRemarks(e.target.value)
                            }
                            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                        />

                        <div className="mt-8 flex flex-wrap gap-4">

                            <button
                                onClick={() =>
                                    updateStatus("Verified")
                                }
                                className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                            >
                                Verify
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus("In Progress")
                                }
                                className="rounded-xl bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700"
                            >
                                In Progress
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus("Resolved")
                                }
                                className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                            >
                                Resolve
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus("Rejected")
                                }
                                className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
                            >
                                Reject
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </MunicipalityLayout>
    );
}

export default MunicipalityReportDetails;