import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateReportStatus } from "../controllers/municipalityController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.put(
  "/report/:id",
  protect,
  authorize("admin", "ngo", "volunteer"),
  updateReportStatus
);

export default router;