import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getRecommendations } from "../services/recommendationServices";
import { Brain, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";

function Recommendation() {
  const { token } = useAuth();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const data = await getRecommendations(token);
      setRecommendations(data.recommendations);
    } catch (err) {
      toast.error("Unable to load recommendations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center text-2xl text-white">
          Loading Recommendations...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="mb-10 flex items-center gap-3 text-4xl font-bold text-white">
        <Brain className="text-emerald-400" />
        AI Recommendations
      </h1>

      <div className="space-y-6">

        {recommendations.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            No AI recommendations available.
          </div>
        ) : (
          recommendations.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <Lightbulb className="text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  {item.title}
                </h2>
              </div>

              <p className="text-slate-300">
                {item.description}
              </p>

              <div className="mt-5">
                <span className="rounded-full bg-emerald-600 px-4 py-2 text-white">
                  {item.priority}
                </span>
              </div>
            </div>
          ))
        )}

      </div>

    </DashboardLayout>
  );
}

export default Recommendation;