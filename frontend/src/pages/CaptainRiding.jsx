import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // <-- import useLocation
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride; // <-- get ride data
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen overflow-x-hidden relative flex flex-col justify-end">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://cdn.worldvectorlogo.com/logos/uber-12.svg"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10  bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-semibold ri-logout-box-line"></i>
        </Link>
      </div>

      <div className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400">
        <h4 className="text-xl font-semibold">
          {rideData
            ? `${rideData.pickup} → ${rideData.destination}`
            : "No ride data"}
        </h4>
        <h5 className="text-lg font-semibold">
          {rideData ? `Fare: ₹${rideData.fare}` : ""}
        </h5>
        <button className=" bg-green-500 text-white font-semibold p-3 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-[500] bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
      <div className="h-screen fixed w-screen z-[-1]">
        <LiveTracking />
      </div>
    </div>
  );
};

export default CaptainRiding;
