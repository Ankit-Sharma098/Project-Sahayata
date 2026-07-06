import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does Project Sahayata detect pollution?",
    answer:
      "Our platform uses Gemini AI to analyze uploaded images and identify pollution type, severity, health risks and recommendations.",
  },
  {
    question: "Do I need to manually enter my location?",
    answer:
      "No. You can either select your location on the interactive map or use your current GPS location.",
  },
  {
    question: "Who can see my report?",
    answer:
      "Citizens can view their own reports while Municipality and Admin can review and manage reports according to their roles.",
  },
  {
    question: "How is AQI calculated?",
    answer:
      "Real-time Air Quality Index is fetched from external AQI APIs based on the selected report location.",
  },
  {
    question: "Can I track the status of my report?",
    answer:
      "Yes. Every report can be tracked through statuses like Pending, Verified, In Progress, Resolved and Rejected.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-slate-900 py-24"
    >
      <div className="mx-auto max-w-5xl px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Everything you need to know about Project Sahayata.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950"
            >

              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >

                <h3 className="text-xl font-semibold text-white">
                  {faq.question}
                </h3>

                {active === index ? (
                  <ChevronUp className="text-emerald-400" />
                ) : (
                  <ChevronDown className="text-emerald-400" />
                )}

              </button>

              {active === index && (

                <div className="border-t border-slate-800 px-6 pb-6 pt-4">

                  <p className="leading-7 text-slate-400">
                    {faq.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;