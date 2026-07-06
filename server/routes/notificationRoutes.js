import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// =====================================
// Get All Notifications
// =====================================
router.get(
  "/",
  protect,
  getNotifications
);

// =====================================
// Mark Notification As Read
// =====================================
router.put(
  "/read/:id",
  protect,
  markAsRead
);

// =====================================
// Delete Notification
// =====================================
router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;