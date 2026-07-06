import API from "../api/axios";

// Update Report Status
export const updateReportStatus = async (
  id,
  status,
 remarks,
  token
) => {
  const response = await API.put(
    `/municipality/status/${id}`,
    {
      status,
      remarks,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};