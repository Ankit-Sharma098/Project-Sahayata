import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createAirReport,
  getAllAirReports,
  getSingleAirReport,
  updateAirReport,
  deleteAirReport,
} from "../controllers/airReportController.js";

const router = express.Router();

router.post("/", protect, createAirReport);

router.get("/", protect, getAllAirReports);

router.get("/:id", protect, getSingleAirReport);

router.put("/:id", protect, updateAirReport);

router.delete("/:id", protect, deleteAirReport);

export default router;