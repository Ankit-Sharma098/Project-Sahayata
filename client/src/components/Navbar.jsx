import { Leaf, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (id) => {
        if (location.pathname !== "/") {
            navigate("/");

            setTimeout(() => {
                const section = document.getElementById(id);

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 200);
        } else {
            const section = document.getElementById(id);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    };

    const goHome = () => {
        if (location.pathname !== "/") {
            navigate("/");
        }

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 100);
    };

    return (
        <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <button
                    onClick={goHome}
                    className="flex items-center gap-3"
                >
                    <div className="rounded-xl bg-emerald-500 p-2">
                        <Leaf className="h-6 w-6 text-white" />
                    </div>

                    <div className="text-left">
                        <h1 className="text-xl font-bold text-white">
                            Project Sahayata
                        </h1>

                        <p className="text-xs text-slate-400">
                            AI Pollution Monitoring
                        </p>
                    </div>
                </button>

                {/* Desktop Menu */}

                <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">

                    <button
                        onClick={goHome}
                        className="transition hover:text-emerald-400"
                    >
                        Home
                    </button>

                    <button
                        onClick={() => scrollToSection("features")}
                        className="transition hover:text-emerald-400"
                    >
                        Features
                    </button>

                    <Link
                        to="/login"
                        className="transition hover:text-emerald-400"
                    >
                        Dashboard
                    </Link>

                    <button
                        onClick={() => scrollToSection("contact")}
                        className="transition hover:text-emerald-400"
                    >
                        Contact
                    </button>

                </div>

                {/* Buttons */}

                <div className="hidden items-center gap-3 md:flex">

                    <Link
                        to="/login"
                        state={{ from: "/dashboard" }}
                        className="rounded-xl border border-slate-700 px-5 py-2 text-white transition hover:border-emerald-500"
                    >
                        Login
                    </Link>

                    <Link
                        to="/login"
                        state={{ from: "/report" }}
                        className="rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-white transition hover:bg-emerald-600"
                    >
                        Report Now
                    </Link>

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