import React, { useContext, useState } from "react";
import KommuneCheckbox from "./checkboxes/kommuneCheckbox";
import { map, MapContext } from "../map/mapContext";

function Sidebar() {
  const map = useContext(MapContext);
  return (
    <div className={"sidebar"}>
      <KommuneCheckbox />
      {map.layers.length === 1
        ? "1 layer currently active"
        : map.layers.length + " layers currently active"}
    </div>
  );
}

export default Sidebar;
