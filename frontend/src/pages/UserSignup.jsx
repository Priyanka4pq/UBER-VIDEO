import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token); // Store the token in local storage
        navigate("/home"); // Redirect to the home page after successful signup
        alert("Signup successful");
      }

      console.log(userData);
      // Add your signup logic here
      alert("Signup successful");
      // Reset the input fields after submission
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      console.log("Signup submitted", { email, password, firstName, lastName });
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="p-7  h-screen flex flex-col justify-between">
        <div>
          <img
            src="https://cdn.worldvectorlogo.com/logos/uber-2.svg"
            alt=""
            className="w-16 mb-10 mr-auto"
          />
          <form onSubmit={submitHandler} className="bg-white pb-7 py-4 px-4">
            <h3 className="text-lg font-medium mb-2">What's your name</h3>
            <div
              className="flex gap-4 mb-6
              items-center justify-between w-full"
            >
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2 border-2 text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
              />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-1/2 border-2 text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border-2 w-full text-lg placeholder:text-base"
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
            <Link to="/login" className="text-blue-600">
              {" "}
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-center text-[12px] leading-tight mb-4">
            By Proceeding, you consent to get calls, whatsApp or SMS messages,
            including by automated means, from Uber and its affiliates to the
            number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
