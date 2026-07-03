import AirReport from "../models/AirReport.js";

export const getRecommendations = async (req, res) => {
  try {

    const reports = await AirReport.find();

    if (!reports.length) {
      return res.status(200).json({
        success: true,
        recommendations: [],
      });
    }

    const recommendations = reports.map((report) => {

      const actions = [];

      const score = report.impactScore?.score || 0;

      if (score >= 80) {

        actions.push("Deploy Water Mist Cannon");
        actions.push("Restrict Heavy Vehicles");
        actions.push("Issue Health Advisory");

      }

      if (report.aqiData?.value >= 250) {

        actions.push("Notify Pollution Control Board");

      }

      if (report.weather?.windSpeed <= 5) {

        actions.push("Increase Road Water Sprinkling");

      }

      return {

        reportId: report._id,

        area: report.location.address,

        impactScore: score,

        severity: report.aiAnalysis.severity,

        recommendations: actions,

      };

    });

    res.status(200).json({

      success: true,

      total: recommendations.length,

      recommendations,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};