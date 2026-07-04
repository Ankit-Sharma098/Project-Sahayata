import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { Link } from "react-router-dom";

function PollutionMap({ reports }) {
  return (
    <div className="rounded-3xl overflow-hidden border border-slate-800">

      <MapContainer
        center={[25.5941, 85.1376]}
        zoom={12}
        style={{
          height: "500px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution="OpenStreetMap"
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

              <h2 className="font-bold">
                {report.title}
              </h2>

              <p>
                AQI :
                {report.aqiData.value}
              </p>

              <p>
                Status :
                {report.status}
              </p>

              <p>
                Severity :
                {report.aiAnalysis.severity}
              </p>

              <Link
                to={`/report/${report._id}`}
                className="text-emerald-600"
              >
                View Details
              </Link>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
}

export default PollutionMap;