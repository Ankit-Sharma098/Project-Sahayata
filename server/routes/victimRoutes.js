import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createHelpRequest,
    getAllHelpRequests,
 } from "../controllers/Victims.js";

const router = express.Router();

router.post("/request", protect, createHelpRequest);

router.get("/all", protect, getAllHelpRequests);

export default router;