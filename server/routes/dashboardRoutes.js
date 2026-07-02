import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardAnalytics } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, getDashboardAnalytics);

export default router;