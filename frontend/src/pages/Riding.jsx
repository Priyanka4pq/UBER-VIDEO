import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Navigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride; // Get ride data from navigation
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", (ride) => {
    navigate("/home", { state: { ride } }); // Redirect to home with ride data
  });

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed h-10 w-10 top-2 right-2  bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-bold ri-home-7-line"></i>
      </Link>

      <div className="h-1/2">
        <LiveTracking/>
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://t4.ftcdn.net/jpg/07/42/50/05/360_F_742500540_BxXHiukopkGqglLH8NGpjoKK25ajYlgl.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain?.fullname?.firstname || "Captain"}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle?.plate || "Plate"}
            </h4>
            <p className="text-sm text-gray-600">
              {ride?.captain?.vehicle?.vehicleType || "Vehicle"}
            </p>
            <h1 className="text-lg font-semibold">
              {ride?.otp ? `OTP: ${ride.otp}` : ""}
            </h1>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">
                  {ride?.pickup || "Pickup"}
                </h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination || "Destination"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare || "Fare"}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 mt-5 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
