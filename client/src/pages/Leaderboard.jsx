import { useEffect, useState } from "react";
import { Trophy, Medal } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getLeaderboard } from "../services/leaderboardService";
import toast from "react-hot-toast";

function Leaderboard() {
  const { token } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard(token);
      setUsers(data.leaderboard);
    } catch (err) {
      toast.error("Unable to load leaderboard");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="mb-10 flex items-center gap-3 text-4xl font-bold text-white">
        <Trophy className="text-yellow-400" />
        Leaderboard
      </h1>

      <div className="space-y-5">

        {users.map((user, index) => (

          <div
            key={user._id}
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >

            <div className="flex items-center gap-5">

              <div className="rounded-full bg-yellow-500/20 p-3">
                <Medal className="text-yellow-400" />
              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  {user.fullName}
                </h2>

                <p className="text-slate-400">
                  {user.email}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-3xl font-bold text-emerald-400">
                #{index + 1}
              </p>

              <p className="text-slate-400">
                {user.totalReports} Reports
              </p>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Leaderboard;