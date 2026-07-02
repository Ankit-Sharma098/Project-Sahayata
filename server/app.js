import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import victimRoutes from "./routes/victimRoutes.js";
import airReportRoutes from "./routes/airReportRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/victim", victimRoutes);
app.use("/api/air-report", airReportRoutes);

// Auth Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Project Sahayata Backend Running 🚀",
  });
});

export default app;