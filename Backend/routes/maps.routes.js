const express = require("express");
const router = express.Router();
const mapsService = require("../services/maps.service");
const mapController = require("../controllers/map.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address is required"),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin is required"),
  query("destination").isString().isLength({ min: 3 }),
  mapController.getDistanceAndTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

module.exports = router;
