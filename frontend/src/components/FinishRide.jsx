import React from "react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[100%] top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-double-line text-3xl text-gray-500"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 p-3 border-b-2">
        Finish this Ride
      </h3>

      <div className="flex items-center justify-between mt-4 border-2 p-3 bg-gray-100 rounded-xl">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover "
            src="https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_1280.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">Saheer Ghandhi</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="text-lg  ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kanakariya Talab, Bhopal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="text-lg  ri-map-pin-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kanakariya Talab, Bhopal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">$35</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <Link
            to="/captain-riding"
            className="w-full flex justify-center bg-green-600 mt-5 text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </Link>

          <p className=" mt-10 text-xs">
            click on finish ride button if you have completed the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
