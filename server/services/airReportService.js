import AirReport from "../models/AirReport.js";

export const createAirReportService = async (data) => {
  const report = await AirReport.create(data);
  return report;
};

export const getAllAirReportsService = async () => {
  return await AirReport.find()
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
  return await AirReport.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// ==========================
// Delete Air Report
// ==========================

export const deleteAirReportService = async (id) => {
  return await AirReport.findByIdAndDelete(id);
};