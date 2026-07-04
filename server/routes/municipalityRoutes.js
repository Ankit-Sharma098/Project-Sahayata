import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  updateReportStatus,
  getMunicipalityDashboard,
} from "../controllers/municipalityController.js";

const router = express.Router();

// ================================
// Municipality Dashboard
// ================================
router.get(
  "/dashboard",
  protect,
  authorizeRoles("Municipality", "Admin"),
  getMunicipalityDashboard
);

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