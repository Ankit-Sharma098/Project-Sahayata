import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Kumar",
    role: "Citizen",
    initials: "RK",
    review:
      "Project Sahayata made reporting pollution incredibly easy. The AI analysis was accurate, and my complaint was resolved quickly.",
  },
  {
    name: "Priya Singh",
    role: "Municipality Officer",
    initials: "PS",
    review:
      "The dashboard provides clear insights and helps us prioritize high-impact pollution reports efficiently.",
  },
  {
    name: "Amit Verma",
    role: "Environmental Volunteer",
    initials: "AV",
    review:
      "The live pollution map and AI recommendations make this platform a powerful tool for community-driven environmental protection.",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-slate-900 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-white">
            What People Say
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Trusted by citizens, volunteers and municipality officials.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="mb-6 flex">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    fill="#22c55e"
                    className="text-emerald-400"
                  />
                ))}

              </div>

              <p className="leading-7 text-slate-300">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                  {item.initials}
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="text-slate-400">
                    {item.role}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;