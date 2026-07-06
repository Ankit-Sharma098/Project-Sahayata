import AirReport from "../models/AirReport.js";
import Notification from "../models/Notification.js";

// ===============================
// Update Report Status
// ===============================
export const updateReportStatus = async (req, res) => {
  try {

    const { status, remarks } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const report = await AirReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    report.status = status;
    report.remarks = remarks || "";

    await report.save();

    // ===============================
    // Create Notification
    // ===============================

    await Notification.create({

      user: report.user,

      report: report._id,

      title: `Report ${status}`,

      message: `Your pollution report "${report.title}" has been ${status} by Municipality.`,

      type: status,

    });

    res.status(200).json({

      success: true,

      message: "Status Updated Successfully",

      report,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};