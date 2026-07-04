import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function StatusChart() {

  const data = {

    labels: [
      "Pending",
      "Resolved",
      "Critical",
    ],

    datasets: [

      {

        data: [15, 8, 3],

        backgroundColor: [

          "#facc15",

          "#22c55e",

          "#ef4444",

        ],

      },

    ],

  };

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">

        Report Status

      </h2>

      <Pie data={data} />

    </div>

  );

}

export default StatusChart;