import React from "react";
import KommuneCheckbox from "./checkboxes/kommuneCheckbox";
import AirportCheckbox from "./checkboxes/AirportCheckbox";
import LayerDropdown from "./LayerDropdown";

function Sidebar() {
  return (
    //sidebar
    <div className={"sidebar"}>
      <LayerDropdown />
      <KommuneCheckbox />
      <AirportCheckbox />
    </div>
  );
}

export default Sidebar;
