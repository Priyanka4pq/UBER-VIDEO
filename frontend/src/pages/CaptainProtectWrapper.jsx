import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/captain-login");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain); // Set the captain data in context
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching captain data:", error);
      localStorage.removeItem("token"); // Remove the token from local storage
      navigate("/captain-login"); // Redirect to login if there's an error
      alert("Please login again");
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
