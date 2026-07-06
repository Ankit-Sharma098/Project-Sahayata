import {
  //Linkedin,
  Mail,
  MapPin,
  Heart,
  Globe,
} from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-emerald-400">
              Project Sahayata
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              AI Powered Pollution Monitoring &
              Reporting Platform helping citizens,
              municipalities and environmental
              organizations build cleaner cities.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <a
                  href="/"
                  className="hover:text-emerald-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="hover:text-emerald-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-emerald-400"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="hover:text-emerald-400"
                >
                  FAQ
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-5 text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4 text-slate-400">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-emerald-400"
                />

                ankitshr6688@gmail.com

              </div>

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-emerald-400"
                />

                Patna, Bihar, India

              </div>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-5 text-xl font-semibold text-white">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="https://github.com/Ankit-Sharma098"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-900 p-3 transition hover:bg-emerald-600"
              >
               <Globe className="text-white" />
              </a>

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">

          <p className="flex items-center justify-center gap-2 text-center text-slate-500">

            Made with

            <Heart
              size={18}
              className="fill-red-500 text-red-500"
            />

            in India • © {new Date().getFullYear()} Project Sahayata

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;