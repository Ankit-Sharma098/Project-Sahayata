import API from "../api/axios";

export const getRecommendations = async (token) => {
  const response = await API.get("/recommendation", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};