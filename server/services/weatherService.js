import axios from "axios";

export const getWeatherData = async (latitude, longitude) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

    const { data } = await axios.get(url);

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
    };

  } catch (error) {
    console.error("Weather API Error:", error.message);

    return {
      temperature: null,
      humidity: null,
      windSpeed: null,
      condition: "",
    };
  }
};