import express from "express";
import { getWeatherData } from "../services/weatherService.js";

const router = express.Router();

router.get("/weather", async (req, res) => {
  try {
    const weather = await getWeatherData(25.5941, 85.1376); // Patna

    res.json({
      success: true,
      weather,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

export default router;