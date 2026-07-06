import AirReport from "../models/AirReport.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await AirReport.aggregate([
      {
        $group: {
          _id: "$user",

          totalReports: {
            $sum: 1,
          },

          verifiedReports: {
            $sum: {
              $cond: [
                {
                  $in: [
                    "$status",
                    ["Verified", "In Progress", "Resolved"],
                  ],
                },
                1,
                0,
              ],
            },
          },

          resolvedReports: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "Resolved",
                  ],
                },
                1,
                0,
              ],
            },
          },

          rejectedReports: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "Rejected",
                  ],
                },
                1,
                0,
              ],
            },
          },

          highSeverity: {
            $sum: {
              $cond: [
                {
                  $in: [
                    "$aiAnalysis.severity",
                    ["High", "Critical"],
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },

      {
        $addFields: {
          points: {
            $subtract: [
              {
                $add: [
                  {
                    $multiply: [
                      "$totalReports",
                      10,
                    ],
                  },
                  {
                    $multiply: [
                      "$verifiedReports",
                      20,
                    ],
                  },
                  {
                    $multiply: [
                      "$resolvedReports",
                      30,
                    ],
                  },
                  {
                    $multiply: [
                      "$highSeverity",
                      15,
                    ],
                  },
                ],
              },
              {
                $multiply: [
                  "$rejectedReports",
                  15,
                ],
              },
            ],
          },
        },
      },

      {
        $sort: {
          points: -1,
        },
      },
    ]);

    const ranked = leaderboard.map((item, index) => ({
      rank: index + 1,

      id: item.user._id,

      fullName: item.user.fullName,

      profileImage: item.user.profileImage,

      reports: item.totalReports,

      verified: item.verifiedReports,

      resolved: item.resolvedReports,

      points: item.points,
    }));

    res.json({
      success: true,
      leaderboard: ranked,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};