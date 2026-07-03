import AirReport from "../models/AirReport.js";

export const getLeaderboard = async (req, res) => {
  try {

    const leaderboard = await AirReport.aggregate([
      {
        $group: {
          _id: "$location.address",

          totalReports: {
            $sum: 1,
          },

          averageAQI: {
            $avg: "$aqiData.value",
          },

          averageImpactScore: {
            $avg: "$impactScore.score",
          },
        },
      },

      {
        $sort: {
          averageImpactScore: -1,
        },
      },

      {
        $project: {
          _id: 0,

          area: "$_id",

          totalReports: 1,

          averageAQI: {
            $round: ["$averageAQI", 0],
          },

          averageImpactScore: {
            $round: ["$averageImpactScore", 0],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      leaderboard,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};