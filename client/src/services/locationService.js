import axios from "axios";

export const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};