import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);

      if (response.status === 200) {
        alert("Logout successful");
        localStorage.removeItem("token"); // Remove the token from local storage
        navigate("/login"); // Redirect to the login page after successful logout
      }
    });

  return <div>UserLogout</div>;
};

export default UserLogout;
