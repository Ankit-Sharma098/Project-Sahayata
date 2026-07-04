import {
  createAirReportService,
  getAllAirReportsService,
  getSingleAirReportService,
  updateAirReportService,
  deleteAirReportService,
  getMyAirReportsService,
} from "../services/airReportService.js";

import { getWeatherData } from "../services/weatherService.js";
import { getAQIData } from "../services/aqiService.js";
import { analyzePollution } from "../services/geminiService.js";
import { calculateImpactScore } from "../services/impactScoreService.js";
import { uploadImageToCloudinary } from "../services/cloudinaryService.js";

// ======================================
// Create Air Report
// ======================================
export const createAirReport = async (req, res) => {
  try {
    let { title, description, category, location } = req.body;

    // FormData sends location as string
    if (typeof location === "string") {
      location = JSON.parse(location);
    }

    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Upload Image to Cloudinary
    let imageUrl = "";

    if (req.file) {
      const uploadedImage = await uploadImageToCloudinary(req.file.buffer);
      imageUrl = uploadedImage.secure_url;
    }

    // Weather Data
    const weather = await getWeatherData(
      location.coordinates[1], // latitude
      location.coordinates[0] // longitude
    );

    // AQI Data
    const aqiData = await getAQIData(
      location.coordinates[1],
      location.coordinates[0]
    );

    // AI Analysis
const aiAnalysis = await analyzePollution(imageUrl);

    // Pollution Impact Score
    const impactScore = calculateImpactScore(
      weather,
      aqiData,
      aiAnalysis
    );

    // Save Report
    const report = await createAirReportService({
      user: req.user._id,
      title,
      description,
      category,
      image: imageUrl,
      location,
      weather,
      aqiData,
      aiAnalysis,
      impactScore,
    });

    res.status(201).json({
      success: true,
      message: "Air Report Submitted Successfully",
      report,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Air Reports
// ======================================
export const getAllAirReports = async (req, res) => {
  try {
    const reports = await getAllAirReportsService();

    res.status(200).json({
      success: true,
      total: reports.length,
      reports,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Air Report
// ======================================
export const getSingleAirReport = async (req, res) => {
  try {
    const report = await getSingleAirReportService(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Air Report
// ======================================
export const updateAirReport = async (req, res) => {
  try {
    const report = await updateAirReportService(
      req.params.id,
      req.body
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report Updated Successfully",
      report,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Air Report
// ======================================
export const deleteAirReport = async (req, res) => {
  try {
    const report = await deleteAirReportService(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get My Air Reports
// ======================================

export const getMyAirReports = async (req, res) => {
  try {
    const reports = await getMyAirReportsService(req.user._id);

    res.status(200).json({
      success: true,
      total: reports.length,
      reports,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};