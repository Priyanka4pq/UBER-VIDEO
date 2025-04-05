import React, { useState } from "react";
import { Link } from "react-router-dom";

const captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    // Add your login logic here
    setUserData({ email, password });
    // Reset the input fields after submission
    // console.log(userData);
    setEmail("");
    setPassword("");
    alert("Login successful");
    // console.log("Login submitted", { email, password });
  };

  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://cdn.worldvectorlogo.com/logos/uber-12.svg"
          alt=""
          className="w-20 mb-4 mr-auto"
        />
        <form onSubmit={submitHandler} className="bg-white pb-7 py-4 px-4">
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 w-full text-lg placeholder::text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 w-full text-lg placeholder::text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder::text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet of drivers and earn money on your own schedule.
          <br />
          <Link to="/captain-signup" className="text-blue-600">
            {" "}
            Register as a Driver
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/login"
          className="bg-amber-800 flex items-center justify-center  text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder::text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default captainlogin;
