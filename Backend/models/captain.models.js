const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 character"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false, // Hide password field from the response
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
      default: "car",
    },
  },
 location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
      default: [0, 0],
    },
  }
});

// captainSchema.index({ location: "2dsphere" });

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // Set token expiration to 24 hours
  );
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;

// Add geospatial index for location-based queries
captainModel.collection.createIndex({ location: "2dsphere" });

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const captainSchema = new mongoose.Schema({
//   fullname: {
//     firstname: {
//       type: String,
//       required: true,
//       minlength: [3, "Firstname must be at least 3 characters long"],
//     },
//     lastname: {
//       type: String,
//       minlength: [3, "Lastname must be at least 3 characters long"],
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//   },
//   socketId: {
//     type: String,
//   },

// status: {
//     type: String,
//     enum: ["active", "inactive"],
//     default: "inactive",
//   },

//   vehicle: {
//     color: {
//       type: String,
//       required: true,
//       minlength: [3, "Color must be at least 3 characters long"],
//     },
//     plate: {
//       type: String,
//       required: true,
//       minlength: [3, "Plate must be at least 3 characters long"],
//     },
//     capacity: {
//       type: Number,
//       required: true,
//       min: [1, "Capacity must be at least 1"],
//     },
//     vehicleType: {
//       type: String,
//       required: true,
//       enum: ["car", "motorcycle", "auto"],
//     },
//   },

//   location: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       default: "Point",
//     },
//     coordinates: {
//       type: [Number], // [lng, lat]
//       required: true,
//     },
//   },
// });

// captainSchema.index({ location: "2dsphere" });

// captainSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "24h",
//   });
//   return token;
// };

// captainSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// captainSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// };

// const captainModel = mongoose.model("captain", captainSchema);

// module.exports = captainModel;

// khfiwehfuhufh----------------------------------------------------------------------------------------------------

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const captainSchema = new mongoose.Schema({
//   fullname: {
//     firstname: {
//       type: String,
//       required: true,
//       minlength: [3, "Firstname must be at least 3 characters long"],
//     },
//     lastname: {
//       type: String,
//       minlength: [3, "Lastname must be at least 3 characters long"],
//     },
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//   },
//   socketId: {
//     type: String,
//   },

//   status: {
//     type: String,
//     enum: ["active", "inactive"],
//     default: "inactive",
//   },

//   vehicle: {
//     color: {
//       type: String,
//       required: true,
//       minlength: [3, "Color must be at least 3 characters long"],
//     },
//     plate: {
//       type: String,
//       required: true,
//       minlength: [3, "Plate must be at least 3 characters long"],
//     },
//     capacity: {
//       type: Number,
//       required: true,
//       min: [1, "Capacity must be at least 1"],
//     },
//     vehicleType: {
//       type: String,
//       required: true,
//       enum: ["car", "motorcycle", "auto"],
//     },
//   },

//   location: {
//     type: {
//       type: String,
//       enum: ["Point"],
//       required: true,
//       default: "Point",
//     },
//     coordinates: {
//       type: [Number], // [longitude, latitude]
//       default: [0, 0],
//       required: true,
//     },
//   },
// });
// captainSchema.index({ location: "2dsphere" });

// captainSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "24h",
//   });
//   return token;
// };

// captainSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// captainSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// };

// const captainModel = mongoose.model("captain", captainSchema);

// module.exports = captainModel;
