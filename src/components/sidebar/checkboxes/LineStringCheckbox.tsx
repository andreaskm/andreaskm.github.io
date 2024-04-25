import React, { useState } from "react";
import useDrawLineString from "../../hooks/useDrawLineString";

function LineStringCheckbox() {
  const [checked, setChecked] = useState(false);

  const lengthOfString = useDrawLineString(checked);

  return (
    <div className={"checkbox"}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked
          ? "Stop drawing. " +
            lengthOfString +
            " (Double click to stop drawing)"
          : "Draw"}
      </label>
    </div>
  );
}

export default LineStringCheckbox;
