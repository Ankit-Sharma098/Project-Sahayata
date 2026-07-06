import AirReport from "../models/AirReport.js";

// ===============================
// Update Report Status
// ===============================
export const updateReportStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const { id } = req.params;

    // Validate status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Find report
    const report = await AirReport.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Update fields
    report.status = status;
    report.remarks = remarks || report.remarks;

    // Save changes
    await report.save();

    return res.status(200).json({
      success: true,
      message: "Status Updated Successfully",
      report,
    });

  } catch (error) {
    console.error("Update Report Status Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ===============================
// Municipality Dashboard
// ===============================
export const getMunicipalityDashboard = async (req, res) => {
  try {
    const reports = await AirReport.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      reports,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};