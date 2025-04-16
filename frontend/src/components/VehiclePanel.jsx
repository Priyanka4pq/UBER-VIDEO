import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
        className="p-1 text-center absolute w-[100%] top-0"
      >
        {" "}
        <i className="ri-arrow-down-double-line text-3xl text-gray-500"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

      {/* <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 active:border-black border-gray-400 rounded-xl w-full  p-3 mb-2 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://t4.ftcdn.net/jpg/07/42/50/05/360_F_742500540_BxXHiukopkGqglLH8NGpjoKK25ajYlgl.jpg"
          alt=""
        />
        <div className="ml-2  w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-line"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-base">2 mins away</h5>
          <p className="font-normal text-base">Affordable, compact rides</p>
        </div>
        <h2 className="text-xl font-semibold">$20.00</h2>
        </div> */}

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 active:border-black border-gray-400 rounded-xl w-full p-3 mb-2 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://img.freepik.com/free-psd/white-isolated-car_23-2151852918.jpg?semt=ais_hybrid&w=740"
          alt=""
        />
        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Premier{" "}
            <span>
              <i className="ri-user-3-line"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-base">7 mins away</h5>
          <p className="font-normal text-base">
            Comfortable sedans, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">$30.00</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 active:border-black  border-gray-400 rounded-xl w-full p-3 mb-2 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-line"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-base">4 mins away</h5>
          <p className="font-normal text-base">Affordable, motorcycle rides</p>
        </div>
        <h2 className="text-xl font-semibold">$14.00</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 active:border-black border-gray-400  rounded-xl w-full p-3 mb-2 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className=" ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Auto{" "}
            <span>
              <i className="ri-user-3-line"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-base">4 mins away</h5>
          <p className="font-normal text-base">Affordable, auto rides</p>
        </div>
        <h2 className="text-xl font-semibold">$18.00</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
