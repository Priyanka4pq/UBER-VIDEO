// const mongoose = require("mongoose");

// const rideSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   captain: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Captain",
//     required: false, // Captain can be assigned later
//   },
//   pickup: {
//     type: String,
//     required: true,
//     minlength: 3,
//   },
//   destination: {
//     type: String,
//     required: true,
//     minlength: 3,
//   },
//   fare: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "in-progress", "Ongoing", "completed", "cancelled"],
//     default: "pending",
//   },
//   duration: {
//     type: Number,
//   },
//   distance: {
//     type: Number,
//   },
//   paymentId: {
//     type: String,
//   },
//   orderId: {
//     type: String,
//   },
//   signature: {
//     type: String,
//   },
//   otp: {
//     type: String,
//     select: false, // Don't return OTP in queries
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Ride = mongoose.model("Ride", rideSchema);
// module.exports = Ride;

const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },

  duration: {
    type: Number,
  }, // in seconds

  distance: {
    type: Number,
  }, // in meters

  paymentID: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },

  otp: {
    type: String,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model("ride", rideSchema);
