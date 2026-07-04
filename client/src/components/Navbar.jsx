import { Leaf, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-emerald-500 p-2">
            <Leaf className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Project Sahayata
            </h1>

            <p className="text-xs text-slate-400">
              AI Pollution Monitoring
            </p>
          </div>

        </div>

        {/* Desktop Menu */}

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">

          <a
            href="#"
            className="transition hover:text-emerald-400"
          >
            Home
          </a>

          <a
            href="#"
            className="transition hover:text-emerald-400"
          >
            Features
          </a>

          <a
            href="#"
            className="transition hover:text-emerald-400"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="transition hover:text-emerald-400"
          >
            Contact
          </a>

        </div>

        {/* Buttons */}

        <div className="hidden items-center gap-3 md:flex">

          <button className="rounded-xl border border-slate-700 px-5 py-2 text-white transition hover:border-emerald-500">
            Login
          </button>

          <button className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-white transition hover:bg-emerald-600">
            Report Now
          </button>

        </div>

        {/* Mobile */}

        <button className="text-white md:hidden">
          <Menu />
        </button>

      </div>
    </nav>
  );
}

export default Navbar;