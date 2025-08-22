const captainModel = require("../models/captain.models");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  plate,
  color,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType },
  });
  return captain;
};

module.exports.updateCaptainStatus = async (captainId, status) => {
  if (!["active", "inactive"].includes(status)) {
    throw new Error("Status must be either 'active' or 'inactive'");
  }
  
  const captain = await captainModel.findByIdAndUpdate(
    captainId,
    { status },
    { new: true }
  );
  
  if (!captain) {
    throw new Error("Captain not found");
  }
  
  return captain;
};

module.exports.updateCaptainLocation = async (captainId, location) => {
  if (!location || !location.ltd || !location.lng) {
    throw new Error("Valid location with ltd and lng is required");
  }
  
  const captain = await captainModel.findByIdAndUpdate(
    captainId,
    { 
      location: {
        ltd: location.ltd,
        lng: location.lng
      }
    },
    { new: true }
  );
  
  if (!captain) {
    throw new Error("Captain not found");
  }
  
  return captain;
};

module.exports.getNearbyActiveCaptains = async (center, radiusInKm = 5) => {
  const { ltd, lng } = center;
  
  // Convert km to radians (Earth radius ≈ 6371 km)
  const radiusInRadians = radiusInKm / 6371;
  
  const captains = await captainModel.find({
    status: "active",
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radiusInRadians]
      }
    }
  });
  
  return captains;
};
