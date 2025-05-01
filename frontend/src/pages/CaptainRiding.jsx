import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
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
    <div className="h-screen overflow-x-hidden relative">
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

      <div className="h-4/5 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1200/1*pDuy0gLCj1dgGxUCsG-KUQ.png"
          // src="https://cdn.prod.website-files.com/6050a76fa6a633d5d54ae714/651ecaa877fc8afd7077fab5_hdmap-b.gif"
          // src="https://i.pinimg.com/originals/d7/ae/01/d7ae0170d3d5ffcbaa7f02fdda387a3b.gif"
          alt=""
        />
      </div>
      <div
        className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5
          className="p-1 text-center absolute w-screen top-0"
          onClick={() => {
            // props.setRidePopUpPanel(false);
          }}
        >
          <i className="ri-arrow-drop-up-line text-3xl text-gray-500"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className=" bg-green-500 text-white font-semibold p-3 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
