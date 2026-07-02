import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createAirReport,
  getAllAirReports,
  getSingleAirReport,
  updateAirReport,
  deleteAirReport,
} from "../controllers/airReportController.js";

const router = express.Router();

// =====================================
// Create Air Report (Image Upload)
// =====================================
router.post(
  "/",
  protect,
  upload.single("image"),
  createAirReport
);

// =====================================
// Get All Air Reports
// =====================================
router.get("/", protect, getAllAirReports);

// =====================================
// Get Single Air Report
// =====================================
router.get("/:id", protect, getSingleAirReport);

// =====================================
// Update Air Report
// =====================================
router.put("/:id", protect, updateAirReport);

// =====================================
// Delete Air Report
// =====================================
router.delete("/:id", protect, deleteAirReport);

export default router;