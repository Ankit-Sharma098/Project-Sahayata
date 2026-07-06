import AirReport from "../models/AirReport.js";

// ===============================
// Dashboard Analytics
// ===============================
export const getDashboardAnalytics = async (req, res) => {
  try {

    // Sirf login user ki reports
    const reports = await AirReport.find({
      user: req.user._id,
    });

    // Total Reports
    const totalReports = reports.length;

    // Pending
    const pendingReports = reports.filter(
      (report) => report.status === "Pending"
    ).length;

    // Resolved
    const resolvedReports = reports.filter(
      (report) => report.status === "Resolved"
    ).length;

    // Critical
    const criticalReports = reports.filter(
      (report) => report.aiAnalysis?.severity === "Critical"
    ).length;

    // Average AQI
    const totalAQI = reports.reduce(
      (sum, report) => sum + (report.aqiData?.value || 0),
      0
    );

    const averageAQI =
      reports.length > 0
        ? Math.round(totalAQI / reports.length)
        : 0;

    // Highest Impact
    const highestImpact = reports.reduce(
      (max, report) => {
        const score =
          report.impactScore?.score || 0;

        const maxScore =
          max?.impactScore?.score || 0;

        return score > maxScore ? report : max;
      },
      null
    );

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
          highestImpact?.impactScore?.score || 0,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};