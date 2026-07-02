import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateReportStatus } from "../controllers/municipalityController.js";

const router = express.Router();

router.put(
  "/report/:id",
  protect,
  updateReportStatus
);

export default router;