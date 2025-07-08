const axios = require("axios");
const env = require("dotenv");
env.config(); // Load environment variables from .env file

module.exports.getAddressCoordinates = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    const response = await axios.get(url);

    console.log("🌐 Google Maps full response:", response.data);

    if (
      response.data.status === "OK" &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(
        `Unable to find coordinates. Google status: ${response.data.status}`
      );
    }
  } catch (error) {
    // ✅ This line is safe — no reference to undefined `response`
    console.error(
      "❌ Google Maps API error:",
      error.response?.data?.error_message || error.message
    );

    throw new Error(
      "Error fetching coordinates: " +
        (error.response?.data?.error_message || error.message)
    );
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const encodedOrigin = encodeURIComponent(origin); // Encode the origin to handle special characters
  const encodedDestination = encodeURIComponent(destination); // Encode the destination to handle special characters
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    console.log("🌐 Google Maps Distance Matrix response:", response.data);

    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0]; // Access the first element of the first row
      if (element.status === "OK") {
        return {
          distance: element.distance.text,
          duration: element.duration.text,
        };
      } else {
        throw new Error(`Distance Matrix error: ${element.status}`);
      }
    } else {
      throw new Error(`Google Maps API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error(
      "❌ Google Maps API error:",
      error.response?.data?.error_message || error.message
    );
    throw new Error(
      "Error fetching distance and time: " +
        (error.response?.data?.error_message || error.message)
    );
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input || input.length < 3) {
    throw new Error("Input must be at least 3 characters long");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const encodedInput = encodeURIComponent(input);
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}`;
  try {
    const response = await axios.get(url);

    console.log("🌐 Google Maps Autocomplete response:", response.data);

    if (response.data.status === "OK") {
      return response.data.predictions.map((prediction) => ({
        description: prediction.description,
        placeId: prediction.place_id,
      }));
    } else {
      throw new Error(`Autocomplete error: ${response.data.status}`);
    }
  } catch (error) {
    console.error(
      "❌ Google Maps API error:",
      error.response?.data?.error_message || error.message
    );
    throw new Error(
      "Error fetching autocomplete suggestions: " +
        (error.response?.data?.error_message || error.message)
    );
  }
};
