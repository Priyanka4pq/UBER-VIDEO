import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmeRide from "../components/ConfirmeRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios"; // <-- Add axios import
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const [ride, setRide] = useState(null); // New state for ride data

  // New state for suggestions and which field is active
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(""); // "pickup" or "destination"

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user._id) return;
    console.log(user);
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride); // Set the ride data when confirmed
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Pass ride data here
  });
  // Fetch suggestions from backend
  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/autocomplete`,
        {
          params: { input },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  //   // Handle input change for pickup

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField("pickup");
    await fetchSuggestions(value);
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField("destination");
    await fetchSuggestions(value);
  };

  //   // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
      setActiveField("destination");
      setPanelOpen(true);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
      // setPanelOpen(false);
      // setVehiclePanel(true);
    }
    setSuggestions([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  // Function to find trip and fetch fare
  async function findTrip() {
    if (pickup && destination) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
          {
            params: { pickup, destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setFare(response.data); // Set the fare before showing panel
        setVehiclePanel(true); // Only show panel after fare is set
        setPanelOpen(false);
      } catch (error) {
        console.error("Error fetching fare:", error);
        alert("Could not calculate fare. Please try again.");
      }
    } else {
      alert("Please select both pickup and destination locations");
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Ride created:", response.data);
      
      // Store ride data for tracking
      setRide(response.data);
      
      // Check if any drivers were notified
      if (response.data.driversNotified === 0) {
        alert("No drivers available in your area. Please try again later.");
        setVehicleFound(false);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error creating ride:", error);
      alert("Failed to create ride. Please try again.");
      setVehicleFound(false);
      throw error;
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://cdn.worldvectorlogo.com/logos/uber-2.svg"
        alt=""
        className="w-16 mb-10 mr-auto absolute top-5 left-5"
      />
      <div className="h-screen w-screen flex flex-col justify-between mb-2 items-center">
        {/* image for temporary use */}
        <LiveTracking />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="bg-white p-6 relative z-10">
          {/* {...............................................} */}
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
              setSuggestions([]);
            }}
            className="absolute right-6 top-6 opacity-0 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          {/* // {..................................................} */}

          <form className="mt-5" onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-12 top-[55%] left-10 w-1 active:bg-gray-700 bg-gray-600 rounded-full"></div>
            <input
              className="px-12 active:-2 text-base bg-gray-100 rounded-lg w-full mt-3"
              type="text"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Add a pick-up location"
            />
            <input
              className="mt-3 px-12 active:-2 text-base bg-gray-100 rounded-lg w-full"
              type="text"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div className="px-4">
          {" "}
          {/* Adds left/right padding */}
          <button
            onClick={findTrip}
            className="bg-black text-white w-full py-2 rounded-lg mt-3 hover:bg-gray-800 transition-colors duration-200"
          >
            Find Trip
          </button>
        </div>
        <div
          ref={panelRef}
          className=" bg-white h-0  p-5  transition-all duration-300 "
        >
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            activeField={activeField}
          />
        </div>
      </div>
      // {/* component */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 translate-y-full"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <ConfirmeRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12 translate-y-full"
      >
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-50 bottom-0 bg-white px-3 py-6 pt-12 "
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
