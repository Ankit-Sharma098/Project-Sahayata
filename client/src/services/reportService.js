import API from "../api/axios";

// ==========================
// Create Air Report
// ==========================
export const createReport = async (formData, token) => {
  try {
    const response = await API.post("/air-report", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Create Report Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// ==========================
// Get All Reports
// ==========================
export const getReports = async (token) => {
  try {
    const response = await API.get("/air-report", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get Reports Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to fetch reports",
      }
    );
  }
};

// ==========================
// Get Single Report
// ==========================
export const getReportById = async (id, token) => {
  try {
    const response = await API.get(`/air-report/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get Report Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to fetch report",
      }
    );
  }
};

export const getMyReports = async (token) => {

  const response = await API.get(
    "/air-report/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;

};

// ==========================
// Update Report
// ==========================
export const updateReport = async (id, data, token) => {
  try {
    const response = await API.put(`/air-report/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update Report Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to update report",
      }
    );
  }
};

// ==========================
// Delete Report
// ==========================
export const deleteReport = async (id, token) => {
  try {
    const response = await API.delete(`/air-report/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Delete Report Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to delete report",
      }
    );
  }
};

// ==========================
// Search Reports
// ==========================

export const searchReports = async (
  keyword,
  token
) => {

  const response = await API.get(
    `/air-report?search=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};