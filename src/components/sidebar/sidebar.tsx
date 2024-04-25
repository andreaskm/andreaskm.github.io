import React from "react";
import KommuneCheckbox from "./checkboxes/kommuneCheckbox";
import AirportCheckbox from "./checkboxes/AirportCheckbox";
import LayerDropdown from "./LayerDropdown";
import LineStringCheckbox from "./checkboxes/LineStringCheckbox";

function Sidebar() {
  return (
    //sidebar
    <div className={"sidebar"}>
      <LayerDropdown />
      <KommuneCheckbox />
      <AirportCheckbox />
      <LineStringCheckbox />
    </div>
  );
}

export default Sidebar;
