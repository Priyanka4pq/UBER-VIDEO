import React from "react";

const LocationSearchPanel = (props) => {
  console.log(props);

  // sample array for location
  const locations = [
    "24A, New Delhi , Near Tajapur , Badarpur Border, Delhi",
    "24B, Old Delhi , Near Tajapur , Sarojni, Delhi",
    "22C, Near Kapoor'cafe , lokhandwala , xyz, Mumbai",
    "24C, Near O'cafe , dwarka , xyz, Gujarat",
  ];

  return (
    <div>
      {/* this is just a sample data */}

      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
            className="flex items-center active:border-2 gap-4 p-3 rounded-xl my-2 border-gray-400 active:border-black justify-start"
          >
            <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill "></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
