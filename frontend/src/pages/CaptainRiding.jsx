import React from "react";
import { Link } from "react-router-dom";

const CaptainRiding = () => {
  return (
    <div className="h-screen">
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

      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1200/1*pDuy0gLCj1dgGxUCsG-KUQ.png"
          // src="https://cdn.prod.website-files.com/6050a76fa6a633d5d54ae714/651ecaa877fc8afd7077fab5_hdmap-b.gif"
          // src="https://i.pinimg.com/originals/d7/ae/01/d7ae0170d3d5ffcbaa7f02fdda387a3b.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6"></div>
    </div>
  );
};

export default CaptainRiding;
