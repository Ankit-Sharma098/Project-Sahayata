import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getHeatmapData } from "../controllers/mapController.js";

const router = express.Router();

router.get("/heatmap", protect, getHeatmapData);

export default router;