import AirReport from "../models/AirReport.js";

// ==========================
// Create Air Report
// ==========================

export const createAirReportService = async (data) => {
  return await AirReport.create(data);
};

// ==========================
// Get All Air Reports
// ==========================

export const getAllAirReportsService = async () => {
  return await AirReport.find()
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });
};

// ==========================
// Get My Air Reports
// ==========================

export const getMyAirReportsService = async (userId) => {
  return await AirReport.find({
    user: userId,
  })
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });
};

// ==========================
// Get Single Air Report
// ==========================

export const getSingleAirReportService = async (id) => {
  return await AirReport.findById(id)
    .populate("user", "fullName email");
};

// ==========================
// Update Air Report
// ==========================

export const updateAirReportService = async (id, data) => {
  return await AirReport.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// ==========================
// Delete Air Report
// ==========================

export const deleteAirReportService = async (id) => {
  return await AirReport.findByIdAndDelete(id);
};