import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    // Add your login logic here

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );
    if (response.status === 200) {
      const data = response.data;
      setUser(data);
      localStorage.setItem("token", data.token); // Store the token in local storage
      navigate("/home");
      alert("Login successful");
    }

    // Reset the input fields after submission
    setEmail("");
    setPassword("");
    alert("Login successful");
  };

  return (
    <div className="p-7  h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://cdn.worldvectorlogo.com/logos/uber-2.svg"
          alt=""
          className="w-16 mb-10 mr-auto"
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
          New here?
          <Link to="/signup" className="text-blue-600">
            {" "}
            Create new Account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/captain-login"
          className="bg-green-600 flex items-center justify-center  text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder::text-base"
        >
          Sign in as Driver
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
