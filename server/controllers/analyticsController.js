import AirReport from "../models/AirReport.js";

export const getAnalytics = async (req, res) => {
  try {

    // Reports By Category
    const categoryStats = await AirReport.aggregate([
      {
        $group: {
          _id: "$category",
          reports: {
            $sum: 1,
          },
        },
      },
    ]);

    // Reports By Status
    const statusStats = await AirReport.aggregate([
      {
        $group: {
          _id: "$status",
          reports: {
            $sum: 1,
          },
        },
      },
    ]);

    // AI Severity
    const severityStats = await AirReport.aggregate([
      {
        $group: {
          _id: "$aiAnalysis.severity",
          reports: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({

      success: true,

      categoryStats,

      statusStats,

      severityStats,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};