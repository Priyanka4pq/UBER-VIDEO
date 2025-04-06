import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ fullName: { firstName, lastName }, email, password });
    // console.log(userData);
    // Add your signup logic here
    alert("Signup successful");
    // Reset the input fields after submission
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div>
      <div className="p-7  h-screen flex flex-col justify-between">
        <div>
          <img
            src="https://cdn.worldvectorlogo.com/logos/uber-12.svg"
            alt=""
            className="w-20 mb-4 mr-auto"
          />
          <form onSubmit={submitHandler} className="bg-white pb-7 py-4 px-4">
            <h3 className="text-lg font-medium w-full mb-2">
              What's your name
            </h3>
            <div
              className="flex gap-4 mb-6
              items-center justify-between w-full"
            >
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2 border-2 text-lg placeholder::text-base"
                type="text"
                placeholder="First name"
              />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2 border-2 text-lg placeholder::text-base"
                type="text"
                placeholder="Last name"
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-2 w-full text-lg placeholder::text-base"
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-2 w-full text-lg placeholder::text-base"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder::text-sm">
              SignUp
            </button>
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/captain-login" className="text-blue-600">
              {" "}
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-center text-[12px] leading-tight mb-4">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Private Policy</span> and{" "}
            <span className="underline">Terms of Service apply.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
