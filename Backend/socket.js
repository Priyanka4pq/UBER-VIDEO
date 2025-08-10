// // const { Server } = require("socket.io");
// const userModel = require("./models/user.models");
// const captainModel = require("./models/captain.models");
// const socketIo = require("socket.io");

// let io;

// function initializeSocket(server) {
//   const io = socketIo(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`New socket connected: ${socket.id}`);

//     socket.on("join", async (data) => {
//       const { userId, userType } = data;

//       console.log(`User ${userId} joined as ${userType} `);

//       if (userType === "user") {
//         await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
//       } else if (userType === "captain") {
//         await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
//       }
//     });

//     socket.on("update-location-captain", async (data) => {
//       const { userId, location } = data;

//       if (!location || !location.lat || !location.lng) {
//         return socket.emit("error", { message: "Invalid location data" });
//       }
//       try {
//         await captainModel.findByIdAndUpdate(userId, {
//           location: {
//             type: "Point",
//             coordinates: [location.lng, location.lat], // GeoJSON
//           },
//         });

//         console.log(`✅ Updated location for captain ${userId}`);
//       } catch (err) {
//         console.error("❌ Error updating captain location:", err);
//         socket.emit("error", { message: "Failed to update location" });
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log(`Client disconnected: ${socket.id}`);
//     });
// }

// function sendMessageToSocketId(socketId, message) {
//   if (io) {
//     io.to(socketId).emit("message", message);
//     console.log(`Message sent to socket ${socketId} with event "message"`);
//   } else {
//     console.error("Socket.io instance is not initialized");
//   }
// }

// module.exports = { initializeSocket, sendMessageToSocketId };

const socketIo = require("socket.io");
const userModel = require("./models/user.models");
const captainModel = require("./models/captain.models");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      // console.log("📍 Received location update:", location); // ✅ add this

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        // location: {
        //   type: "Point",
        //   coordinates: [location.lng, location.lat], // [lng, lat]
        // },
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
