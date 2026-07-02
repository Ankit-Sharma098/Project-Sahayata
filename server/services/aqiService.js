import axios from "axios";

export const getAQIData = async (latitude, longitude) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}`;

    const { data } = await axios.get(url);

    const air = data.list[0];

    const levelMap = {
      1: "Good",
      2: "Fair",
      3: "Moderate",
      4: "Poor",
      5: "Very Poor",
    };

    return {
      value: air.main.aqi,
      level: levelMap[air.main.aqi],
      pollutant: "PM2.5",

      components: {
        co: air.components.co,
        no2: air.components.no2,
        o3: air.components.o3,
        so2: air.components.so2,
        pm2_5: air.components.pm2_5,
        pm10: air.components.pm10,
      },
    };

  } catch (error) {
    console.error("AQI API Error:", error.message);

    return {
      value: 0,
      level: "Unknown",
      pollutant: "",
      components: {},
    };
  }
};