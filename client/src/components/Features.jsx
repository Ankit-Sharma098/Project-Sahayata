import {
  Camera,
  BrainCircuit,
  CloudSun,
  MapPinned,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Smart Image Upload",
    description:
      "Upload pollution images directly from your device with instant preview.",
  },
  {
    icon: BrainCircuit,
    title: "Gemini AI Analysis",
    description:
      "AI identifies pollution category, severity, health risk and recommendations.",
  },
  {
    icon: CloudSun,
    title: "Live Weather + AQI",
    description:
      "Automatically fetches weather conditions and air quality for the reported location.",
  },
  {
    icon: MapPinned,
    title: "Interactive Maps",
    description:
      "Visualize pollution hotspots using location-based reports.",
  },
  {
    icon: ShieldCheck,
    title: "Municipality Workflow",
    description:
      "Authorities can verify, manage and resolve reports efficiently.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Real-time charts, statistics and pollution trends for better decisions.",
  },
];

function Features() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-white">
            Why Project
            <span className="text-emerald-400"> Sahayata?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            AI-powered reporting, real-time environmental data,
            municipality integration and analytics —
            all in one platform.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10"
              >

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">

                  <Icon
                    size={28}
                    className="text-emerald-400"
                  />

                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.description}
                </p>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default Features;