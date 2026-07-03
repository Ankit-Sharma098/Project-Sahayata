import Notification from "../models/Notification.js";

// Get Notifications
export const getNotifications = async (req, res) => {
  try {

    const notifications =
      await Notification.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Mark Read
export const markNotificationRead =
async (req, res) => {

  try {

    const notification =
      await Notification.findById(req.params.id);

    if (!notification) {

      return res.status(404).json({
        success:false,
        message:"Notification not found",
      });

    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success:true,
      message:"Notification marked as read",
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }

};