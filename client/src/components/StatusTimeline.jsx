const steps = [
  "Pending",
  "Assigned",
  "Inspection",
  "Action Taken",
  "Resolved",
];

function StatusTimeline({ status }) {
  const current = steps.indexOf(status);

  return (
    <div className="mt-10">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Report Progress
      </h2>

      <div className="flex items-center justify-between">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex flex-1 flex-col items-center"
          >

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white
              ${
                index <= current
                  ? "bg-emerald-500"
                  : "bg-slate-700"
              }`}
            >
              {index + 1}
            </div>

            <p
              className={`mt-3 text-sm ${
                index <= current
                  ? "text-emerald-400"
                  : "text-slate-500"
              }`}
            >
              {step}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default StatusTimeline;