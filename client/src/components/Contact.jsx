import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

function Contact() {
  return (
    <section
      id="contact"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-white">
            Contact Us
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Have questions, suggestions or want to collaborate?
            We'd love to hear from you.
          </p>

        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Left Side */}

          <div className="space-y-8">

            <div className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="rounded-2xl bg-emerald-500/10 p-4">
                <Mail
                  className="text-emerald-400"
                  size={28}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Email
                </h3>

                <p className="text-slate-400">
                  ankitshr6688@gmail.com
                </p>
              </div>

            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="rounded-2xl bg-emerald-500/10 p-4">
                <Phone
                  className="text-emerald-400"
                  size={28}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Phone
                </h3>

                <p className="text-slate-400">
                  +91 8235849536
                </p>
              </div>

            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <div className="rounded-2xl bg-emerald-500/10 p-4">
                <MapPin
                  className="text-emerald-400"
                  size={28}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  Address
                </h3>

                <p className="text-slate-400">
                  Patna, Bihar, India
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <form className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

            <input
              type="text"
              placeholder="Your Name"
              className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-500"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-500"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700"
            >
              <Send size={20} />
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;