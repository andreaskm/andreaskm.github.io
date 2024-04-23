import React, { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { map, MapContext } from "../../map/mapContext";
import useLayer from "../../hooks/useLayer";
import { Layer } from "ol/layer";
import { useHover } from "../../hooks/useHover";
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import { b } from "vite/dist/node/types.d-aGj9QkWt";

export const kommuneLayer = new VectorLayer({
  className: "kommuner",
  source: new VectorSource({
    url: "/kommuner.json",
    format: new GeoJSON(),
  }),
});

interface KommuneCheckboxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function KommuneCheckbox({ checked, setChecked }: KommuneCheckboxProps) {
  useLayer(kommuneLayer, checked);
  const { currentlyHovered } = useHover(checked);

  return (
    <div className={"checkbox"}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide" : "Show"} Kommuner
        {checked && currentlyHovered?.getProperties().navn[0].navn}
      </label>
    </div>
  );
}

export default KommuneCheckbox;
