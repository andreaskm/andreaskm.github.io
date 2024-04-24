import React from "react";
import KommuneCheckbox from "./checkboxes/kommuneCheckbox";
import AirportCheckbox from "./checkboxes/AirportCheckbox";

function Sidebar() {
  return (
    //sidebar
    <div className={"sidebar"}>
      <KommuneCheckbox />
      <AirportCheckbox />
    </div>
  );
}

export default Sidebar;
