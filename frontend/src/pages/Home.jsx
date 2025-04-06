import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://img.freepik.com/premium-photo/traffic-light-is-mounted-street-corner-red-light-is-illuminated-indicating-that-traffic-should-stop_14117-371337.jpg)] h-screen pt-8 flex justify-between  flex-col  w-full   ">
        <img
          src="https://cdn.worldvectorlogo.com/logos/uber-2.svg"
          alt=""
          className="w-16 ml-8"
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
