import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed h-10 w-10 top-2 right-2  bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-bold ri-home-7-line"></i>
      </Link>

      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1200/1*pDuy0gLCj1dgGxUCsG-KUQ.png"
          // src="https://cdn.prod.website-files.com/6050a76fa6a633d5d54ae714/651ecaa877fc8afd7077fab5_hdmap-b.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://t4.ftcdn.net/jpg/07/42/50/05/360_F_742500540_BxXHiukopkGqglLH8NGpjoKK25ajYlgl.jpg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">Priyanka</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
            {/* <h1 className="text-lg font-semibold"> {props.ride?.otp} </h1> */}
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Kanakariya Talab, Bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹130.00 </h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
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
