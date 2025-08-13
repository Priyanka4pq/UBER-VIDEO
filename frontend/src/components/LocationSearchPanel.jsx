// import React from "react";

// const LocationSearchPanel = (props) => {
//   // Use suggestions from props if available, else fallback to sample
//   const locations =
//     props.suggestions && props.suggestions.length > 0
//       ? props.suggestions.map((s) => s.description || s)
//       : [

//           "24A, New Delhi , Near Tajapur , Badarpur Border, Delhi",
//           "24B, Old Delhi , Near Tajapur , Sarojni, Delhi",
//           "22C, Near Kapoor'cafe , lokhandwala , xyz, Mumbai",
//           "24C, Near O'cafe , dwarka , xyz, Gujarat",
//         ];
// const LocationSearchPanel = ({
//   suggestions,
//   setVehiclePanel,
//   setPanelOpen,
//   setPickup,
//   setDestination,
//   activeField,
// }) => {
//   const handleSuggestionClick = (suggestion) => {
//     if (activeField === "pickup") {
//       setPickup(suggestion);
//     } else if (activeField === "destination") {
//       setDestination(suggestion);
//     }
//     setVehiclePanel(true)
//     setPanelOpen(false)
//   };

//   return (
//     <div>
//       {locations.map(function (elem, idx) {
//         return (
//           <div
//             key={idx}
//             onClick={() => {
//               if (props.onSuggestionClick) props.onSuggestionClick(elem);
//               props.setVehiclePanel(true);
//               props.setPanelOpen(false);
//             }}
//             className="flex items-center active:border-2 gap-4 p-3 rounded-xl my-2 border-gray-400 active:border-black justify-start"
//           >
//             <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
//               <i className="ri-map-pin-fill "></i>
//             </h2>
//             <h4 className="font-medium">{elem}</h4>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default LocationSearchPanel;

// import React from "react";

// const LocationSearchPanel = ({
//   suggestions,
//   setVehiclePanel,
//   setPanelOpen,
//   setPickup,
//   setDestination,
//   activeField,
// }) => {
//   const handleSuggestionClick = (suggestion) => {
//     if (activeField === "pickup") {
//       setPickup(suggestion);
//     } else if (activeField === "destination") {
//       setDestination(suggestion);
//     }
//     // setVehiclePanel(true)
//     // setPanelOpen(false)
//   };

//   return (
//     <div>
//       {/* Display fetched suggestions */}
//       {suggestions.map((elem, idx) => (
//         <div
//           key={idx}
//           onClick={() => handleSuggestionClick(elem)}
//           className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
//         >
//           <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
//             <i className="ri-map-pin-fill"></i>
//           </h2>
//           <h4 className="font-medium">{elem}</h4>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LocationSearchPanel;

// import React from "react";

// const LocationSearchPanel = ({
//   suggestions,
//   setVehiclePanel,
//   setPanelOpen,
//   setPickup,
//   setDestination,
//   activeField,
// }) => {
//   const locations =
//     suggestions && suggestions.length > 0
//       ? suggestions.map((s) => s.description || s)
//       : [
//           "24A, New Delhi , Near Tajapur , Badarpur Border, Delhi",
//           "24B, Old Delhi , Near Tajapur , Sarojni, Delhi",
//           "22C, Near Kapoor'cafe , lokhandwala , xyz, Mumbai",
//           "24C, Near O'cafe , dwarka , xyz, Gujarat",
//         ];

//   const handleSuggestionClick = (suggestion) => {
//     if (activeField === "pickup") {
//       setPickup(suggestion);
//     } else if (activeField === "destination") {
//       setDestination(suggestion);
//     }
//     setVehiclePanel(true);
//     setPanelOpen(false);
//   };

//   return (
//     <div>
//       {locations.map((elem, idx) => (
//         <div
//           key={idx}
//           onClick={() => handleSuggestionClick(elem)}
//           className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
//         >
//           <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
//             <i className="ri-map-pin-fill"></i>
//           </h2>
//           <h4 className="font-medium">{elem}</h4>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LocationSearchPanel;

import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  onSuggestionClick,
  activeField,
}) => {
  return (
    <div>
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            onSuggestionClick(suggestion);
            // setVehiclePanel(true);
            // setPanelOpen(false);
          }}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
