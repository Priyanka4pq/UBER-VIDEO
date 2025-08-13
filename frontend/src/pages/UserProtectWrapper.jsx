import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setUser(data); // Set the user data in context
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token"); // Remove the token from local storage
        navigate("/login"); // Redirect to login if there's an error
        alert("Please login again");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default UserProtectWrapper;

// import React, { useContext, useEffect, useState } from "react";
// import { UserDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const UserProtectWrapper = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserDataContext);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }

//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           setUser(response.data);
//           setIsLoading(false);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         localStorage.removeItem("token");
//         navigate("/login");
//       });
//   }, [token]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return <>{children}</>;
// };

// export default UserProtectWrapper;
