import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import victimRoutes from "./routes/victimRoutes.js";
import airReportRoutes from "./routes/airReportRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import mapRoutes from "./routes/mapRoutes.js";
import municipalityRoutes from "./routes/municipalityRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/victim", victimRoutes);
app.use("/api/air-report", airReportRoutes);
app.use("/api/test", testRoutes);

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/maps", mapRoutes);
app.use("/api/municipality", municipalityRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Project Sahayata Backend Running 🚀",
  });
});

export default app;