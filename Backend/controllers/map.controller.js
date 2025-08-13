const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Extract address from query parameters
  const { address } = req.query;
  console.log("📍 Address from client:", address);
  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    console.log("📦 Coordinates fetched:", coordinates);
    res.status(200).json({ coordinates });
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    // ✅ This line is safe — no reference to undefined `response`
    res
      .status(500)
      .json({ message: "Coordinates not found", error: error.message });
  }
};

module.exports.getDistanceAndTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;
  console.log("📍 Origin from client:", origin);
  console.log("📍 Destination from client:", destination);

  try {
    const distanceTime = await mapService.getDistanceAndTime(
      origin,
      destination
    );
    console.log("📦 Distance and time fetched:", distanceTime);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    res
      .status(500)
      .json({ message: "Distance and time not found", error: error.message });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.query;
  console.log("🔍 Input for suggestions:", input);

  try {
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    console.log("📦 Suggestions fetched:", suggestions);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res
      .status(500)
      .json({ message: "Suggestions not found", error: error.message });
  }
};
