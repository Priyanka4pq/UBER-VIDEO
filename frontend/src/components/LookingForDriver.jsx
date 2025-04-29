// import React from "react";

// const LocationForDriver = (props) => {
//   return (
//     <div>
//       <h5
//         onClick={() => {
//           props.setVehicleFound(false);
//           // props.setConfirmRidePanel(false);
//         }}
//         className="p-1 text-center absolute w-[100%] top-0"
//       >
//         <i className="ri-arrow-down-double-line text-3xl text-gray-500"></i>
//       </h5>
//       <h3 className="text-2xl font-semibold mb-5 p-3 border-b-2">
//         Looking for a Driver
//       </h3>

//       <div className="flex gap-2 flex-col justify-between items-center">
//         <img
//           className="h-20"
//           src="https://t4.ftcdn.net/jpg/07/42/50/05/360_F_742500540_BxXHiukopkGqglLH8NGpjoKK25ajYlgl.jpg"
//           alt=""
//         />
//         <div className="w-full mt-5">
//           <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
//             <i className="text-lg  ri-map-pin-line"></i>
//             <div>
//               <h3 className="text-lg font-medium">562/11-A</h3>
//               <p className="text-sm -mt-1 text-gray-600">
//                 Kanakariya Talab, Bhopal
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
//             <i className="text-lg  ri-map-pin-line"></i>
//             <div>
//               <h3 className="text-lg font-medium">562/11-A</h3>
//               <p className="text-sm -mt-1 text-gray-600">
//                 Kanakariya Talab, Bhopal
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
//             <i className="ri-currency-line"></i>
//             <div>
//               <h3 className="text-lg font-medium">$35</h3>
//               <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationForDriver;

import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[100%] absolute top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://t4.ftcdn.net/jpg/07/42/50/05/360_F_742500540_BxXHiukopkGqglLH8NGpjoKK25ajYlgl.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kanakariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kanakariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹140</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
