import API from "../api/axios";

export const getDashboardAnalytics = async (token) => {
  const response = await API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};