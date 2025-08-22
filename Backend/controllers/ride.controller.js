const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.models");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // Get pickup coordinates for finding nearby drivers
    const pickupCoordinates = await mapService.getAddressCoordinates(pickup);

    // Find captains within 2km radius
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lng,
      pickupCoordinates.ltd,
      2
    );

    console.log("Captains in radius:", captainsInRadius);

    // Populate user data for the ride
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    // Send ride request to all nearby captains
    let driversNotified = 0;
    captainsInRadius.forEach((captain) => {
      if (captain.socketId) {
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
        driversNotified++;
      }
    });

    console.log(`Notified ${driversNotified} drivers about new ride`);

    // Send response with ride data and notification status
    res.status(201).json({
      ...ride.toObject(),
      driversNotified,
      pickupCoordinates
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captainId: req.captain,
    });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captainId: req.captain._id,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validation(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({
      rideId,
      captain: req.captain,
    });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
