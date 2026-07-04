import User from "../models/User.js";
import AirReport from "../models/AirReport.js";

export const getAdminDashboard = async (
  req,
  res
) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalReports =
      await AirReport.countDocuments();

    const pendingReports =
      await AirReport.countDocuments({
        status: "Pending",
      });

    const resolvedReports =
      await AirReport.countDocuments({
        status: "Resolved",
      });

    const reports =
      await AirReport.find()
      .populate("user","fullName email")
      .sort({createdAt:-1});

    res.json({

      success:true,

      analytics:{
        totalUsers,
        totalReports,
        pendingReports,
        resolvedReports,
      },

      reports,

    });

  } catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};