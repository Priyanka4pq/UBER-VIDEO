import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    console.log("Data being sent to backend:", captainData);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );
    if (response.status === 201) {
      const data = response.data; // Get the data from the response
      setCaptain(data.captain); // Set the captain data in context
      localStorage.setItem("token", data.token); // Store the token in local storage
      alert("Signup successful");
      navigate("/captain-home"); // Redirect to the captain home page
    }

    // Add your signup logic here
    alert("Signup successful");
    // Reset the input fields after submission
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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
            <h3 className="text-lg font-medium mb-4">Vehicle Details</h3>
            <div className="border-2 border-gray-300 rounded-lg p-4 mb-6">
              <div className="flex gap-4 mb-6 items-center justify-between w-full">
                <div className="w-1/2">
                  <h3 className="text-lg font-medium mb-2">Color</h3>
                  <input
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border-2 text-lg placeholder::text-base"
                    required
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    type="text"
                    placeholder="Vehicle Color"
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="text-lg font-medium mb-2">Plate</h3>
                  <input
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border-2 text-lg placeholder::text-base"
                    required
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    type="text"
                    placeholder="Vehicle Plate"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-6 items-center justify-between w-full">
                <div className="w-1/2">
                  <h3 className="text-lg font-medium mb-2">Capacity</h3>
                  <input
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border-2 text-lg placeholder::text-base"
                    required
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    type="number"
                    min="1"
                    placeholder="Vehicle Capacity"
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="text-lg font-medium mb-2">Type</h3>
                  <select
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full border-2 text-lg placeholder::text-base"
                    required
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Vehicle Type
                    </option>
                    <option value="car">car</option>
                    <option value="bike">bike</option>
                    <option value="auto">auto</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder::text-sm">
              Create Captain Account
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
