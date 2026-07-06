import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />

      <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            <Sparkles size={18} />
            AI Powered Pollution Detection
          </div>

          <h1 className="text-6xl font-black leading-tight text-white lg:text-7xl">
            Cleaner Air
            <br />
            Starts With
            <span className="text-emerald-400"> You</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Report pollution instantly using AI.
            Get weather, AQI, AI analysis,
            impact score and municipality tracking
            in one platform.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex gap-5">
            <Link
              to="/login"
              state={{ from: "/report" }}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-white transition hover:bg-emerald-600"
            >
              Report Pollution
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              state={{ from: "/dashboard" }}
              className="rounded-xl border border-slate-700 px-7 py-4 text-white transition hover:border-emerald-500"
            >
              View Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white">99%</h2>
              <p className="text-slate-400">AI Accuracy</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">24/7</h2>
              <p className="text-slate-400">Monitoring</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">Live</h2>
              <p className="text-slate-400">AQI</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden flex-1 justify-center lg:flex"
        >
          <div className="w-[420px] rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400" />
              <h2 className="text-xl font-bold text-white">
                AI Pollution Report
              </h2>
            </div>

            <div className="space-y-5">
              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-slate-400">Category</p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Garbage Burning
                </h3>
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-slate-400">Severity</p>
                <h3 className="mt-2 text-xl font-semibold text-red-400">
                  High
                </h3>
              </div>

              <div className="rounded-xl bg-slate-800 p-4">
                <p className="text-slate-400">AQI</p>
                <h3 className="mt-2 text-xl font-semibold text-emerald-400">
                  Moderate
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;