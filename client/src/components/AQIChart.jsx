import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function AQIChart() {
  const data = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [
      {
        label: "Average AQI",

        data: [95, 120, 180, 160, 130, 170, 150],

        borderColor: "#10b981",

        backgroundColor: "rgba(16,185,129,.2)",

        tension: 0.4,

        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },

      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        AQI Trend
      </h2>

      <Line
        data={data}
        options={options}
      />

    </div>
  );
}

export default AQIChart;