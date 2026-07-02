import AirReport from "../models/AirReport.js";

export const getHeatmapData = async (req, res) => {
  try {
    const reports = await AirReport.find(
      {},
      {
        location: 1,
        impactScore: 1,
        "aiAnalysis.severity": 1,
      }
    );

    const heatmap = reports.map((report) => ({
      lat: report.location.coordinates[1],
      lng: report.location.coordinates[0],
      severity: report.aiAnalysis.severity,
      impactScore: report.impactScore?.score || 0,
      address: report.location.address,
    }));

    res.status(200).json({
      success: true,
      heatmap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};