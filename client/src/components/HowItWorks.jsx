import {
  Upload,
  BrainCircuit,
  CloudSun,
  BarChart3,
  Building2,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Report",
    description:
      "Citizen uploads pollution image with location and description.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Gemini AI predicts pollution type, severity and health risks.",
  },
  {
    icon: CloudSun,
    title: "Weather + AQI",
    description:
      "Current weather and air quality are fetched automatically.",
  },
  {
    icon: BarChart3,
    title: "Impact Score",
    description:
      "System calculates pollution impact score using AI and AQI.",
  },
  {
    icon: Building2,
    title: "Municipality",
    description:
      "Authorities verify and take action on the reported issue.",
  },
  {
    icon: CheckCircle2,
    title: "Resolved",
    description:
      "Status is updated and citizens can track the resolution.",
  },
];

function HowItWorks() {
  return (
    <section
  id="how-it-works"
  className="bg-slate-900 py-24"
>
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-white">
            How It <span className="text-emerald-400">Works</span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Complete AI-powered workflow from reporting pollution to
            municipality action.
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">
                  {index + 1}
                </div>

                <div className="mt-4 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <Icon
                    size={30}
                    className="text-emerald-400"
                  />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;