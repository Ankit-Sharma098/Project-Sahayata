import API from "../api/axios";

export const getLeaderboard = async (token) => {
  const response = await API.get("/leaderboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};