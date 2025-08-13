import React from "react";

const LookingForDriver = ({
  createRide,
  pickup,
  destination,
  fare,
  vehicleType,
  setVehicleFound,
}) => {
  // Add null check for fare calculation
  const currentFare = fare && vehicleType ? fare[vehicleType] || 0 : 0;

  return (
    <div>
      <h5
        className="p-1 text-center w-[100%] absolute top-0"
        onClick={() => {
          setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://t4.ftcdn.net/jpg/07/42/50/05/360_F_742500540_BxXHiukopkGqglLH8NGpjoKK25ajYlgl.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{pickup}</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {pickup || "Pickup Location"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {destination || "562/11-A"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">
                {destination || "Destination Location"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{currentFare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
