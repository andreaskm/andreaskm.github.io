import React, { useContext, useState } from "react";
import KommuneCheckbox from "./checkboxes/kommuneCheckbox";
import { map, MapContext } from "../map/mapContext";
import { useHover } from "../hooks/useHover";
import KommuneName from "./KommuneName";

function Sidebar() {
  const [kommuneChecked, setKommuneChecked] =
    useState<React.SetStateAction<boolean>>(false);

  return (
    <div className={"sidebar"}>
      <KommuneCheckbox
        checked={kommuneChecked}
        setChecked={setKommuneChecked}
      />
      <KommuneName checked={kommuneChecked} />
    </div>
  );
}

export default Sidebar;
