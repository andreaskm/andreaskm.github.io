import React, { useState } from "react";
import useDrawLineString from "../../hooks/useDrawLineString";

function LineStringCheckbox() {
  const [checked, setChecked] = useState(false);
  const [freehand, setFreehand] = useState(false);

  const lengthOfString = useDrawLineString(checked, freehand);

  return (
    <div className={"checkbox full-width"}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked
          ? "Stop drawing. " + " (Double click to save length.)"
          : "Draw"}
      </label>
      {checked ? (
        <div className={"freehand"}>
          <label>
            <input
              type="checkbox"
              checked={freehand}
              onChange={(e) => setFreehand(e.target.checked)}
            />
            {freehand ? "Turn off freehand " : "Turn on freehand"}
          </label>
        </div>
      ) : (
        ""
      )}

      <div className={"length-style"}>{checked ? lengthOfString : ""}</div>
    </div>
  );
}

export default LineStringCheckbox;
