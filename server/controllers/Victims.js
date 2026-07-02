import Victim from "../models/Victims.js";

export const createHelpRequest = async (req, res) => {
  try {
    const { emergencyType, description, location } = req.body;

    if (!emergencyType || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const request = await Victim.create({
      user: req.user._id,
      emergencyType,
      description,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Help Request Created Successfully",
      request,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Help Requests
// ==========================

export const getAllHelpRequests = async (req, res) => {
  try {

    const requests = await Victim.find()
      .populate("user", "fullName email phone")
      .populate("assignedVolunteer", "fullName email")
      .populate("assignedNGO", "fullName");

    res.status(200).json({
      success: true,
      total: requests.length,
      requests,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};