import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import MunicipalityLayout from "../layouts/MunicipalityLayout";
import { getReports } from "../services/reportService";
import { useAuth } from "../context/AuthContext";

function MunicipalityMap() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports(token);
      setReports(data.reports);
    } catch {
      toast.error("Unable to load map");
    }
  };

  return (
    <MunicipalityLayout>

      <h1 className="mb-8 text-5xl font-bold text-white">
        Pollution Map
      </h1>

      <div className="overflow-hidden rounded-3xl border border-slate-800">

        <MapContainer
          center={[25.5941, 85.1376]}
          zoom={12}
          style={{
            height: "700px",
            width: "100%",
          }}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {reports.map((report) => (

            <Marker
              key={report._id}
              position={[
                report.location.coordinates[1],
                report.location.coordinates[0],
              ]}
            >

              <Popup>

                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {report.title}
                </h2>

                <br />

                <b>Status :</b>
                {" "}
                {report.status}

                <br />

                <b>AQI :</b>
                {" "}
                {report.aqiData?.value}

                <br />

                <b>Severity :</b>
                {" "}
                {report.aiAnalysis?.severity}

                <br />

                <b>Address :</b>

                <br />

                {report.location?.address}

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </div>

    </MunicipalityLayout>
  );
}

export default MunicipalityMap;