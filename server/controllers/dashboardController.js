import AirReport from "../models/AirReport.js";

// ===============================
// Dashboard Analytics
// ===============================
export const getDashboardAnalytics = async (req, res) => {
  try {
    const totalReports = await AirReport.countDocuments();

    const pendingReports = await AirReport.countDocuments({
      status: "Pending",
    });

    const resolvedReports = await AirReport.countDocuments({
      status: "Resolved",
    });

    const criticalReports = await AirReport.countDocuments({
      "aiAnalysis.severity": "Critical",
    });

    const reports = await AirReport.find();

    let totalAQI = 0;

    reports.forEach((report) => {
      totalAQI += report.aqiData?.value || 0;
    });

    const averageAQI =
      reports.length > 0
        ? Math.round(totalAQI / reports.length)
        : 0;

    const highestImpact = await AirReport.findOne().sort({
      impactScore: -1,
    });

    res.status(200).json({
      success: true,

      analytics: {
        totalReports,
        pendingReports,
        resolvedReports,
        criticalReports,
        averageAQI,

        highestImpactArea:
          highestImpact?.location?.address || "N/A",

        impactScore:
          highestImpact?.impactScore || 0,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};