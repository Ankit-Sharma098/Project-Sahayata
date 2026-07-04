import AirReport from "../models/AirReport.js";

// ===============================
// Update Report Status
// ===============================
export const updateReportStatus = async (req, res) => {
  try {

    const { status, remarks } = req.body;

    const report = await AirReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    report.status = status || report.status;
    report.remarks = remarks || report.remarks;

    await report.save();

    res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      report,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getMunicipalityDashboard = async (req, res) => {

};