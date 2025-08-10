const rideModel = require("../models/ride.models");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceAndTime(pickup, destination);
  console.log("distanceTime >>>", distanceTime);

  if (
    !distanceTime ||
    !distanceTime.distance ||
    !distanceTime.distance.value ||
    !distanceTime.duration ||
    !distanceTime.duration.value
  ) {
    throw new Error("Distance/Time data is missing from map service");
  }

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  console.log("fare breakdown >>>", fare);

  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const finalFare = fare[vehicleType];

  if (!finalFare || isNaN(finalFare)) {
    throw new Error(
      `Invalid vehicle type or fare could not be calculated for: ${vehicleType}`
    );
  }

  console.log("Fare breakdown:", fare);
  console.log("Requested vehicle type:", vehicleType);
  console.log("Fare selected:", finalFare);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: finalFare,
  });

  return ride;
};

module.exports.confirmRide = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error("Ride ID and Captain ID are required");
  }
  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captainId }
  );
  const rideDoc = await rideModel.findOne({ _id: rideId }).populate("user");
  if (!rideDoc) {
    throw new Error("Ride not found");
  }
  return rideDoc;
};
