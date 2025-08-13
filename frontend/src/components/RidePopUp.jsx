import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="p-1 text-center absolute w-[100%] top-0"
      >
        <i className="ri-arrow-down-double-line text-3xl text-gray-500"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 p-3 border-b-2">
        New Ride Available
      </h3>

      <div className="flex items-center justify-between mt-4 p-3 bg-gray-100 rounded-xl">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover "
            src="https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_1280.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div
        className="flex gap-2 flex-col justify-between items-center"
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
      >
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="text-lg  ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="text-lg  ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props?.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between mt-5">
          <button
            onClick={() => {
              props.setRidePopUpPanel(true);
              props.confirmRide();
            }}
            className=" mt-1 bg-gray-200 text-gray-500 font-semibold p-3 px-8 rounded-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(false);
            }}
            className=" bg-green-600 mt-1 text-white font-semibold p-3 px-8 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
