import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  updateReportStatus,
} from "../controllers/municipalityController.js";

const router = express.Router();

// ================================
// Municipality Dashboard
// ================================

// ================================
// Update Report Status
// ================================
router.put(
  "/status/:id",
  protect,
  authorizeRoles("Municipality", "Admin"),
  updateReportStatus
);

export default router;