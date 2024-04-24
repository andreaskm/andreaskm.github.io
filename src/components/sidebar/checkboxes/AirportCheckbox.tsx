import React, { useState } from "react";
import useLayer from "../../hooks/useLayer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { useHoverAirport } from "../../hooks/useHoverAirport";

function airportStyle() {
  return new Style({
    image: new Circle({
      stroke: new Stroke({ color: "white", width: 1 }),
      fill: new Fill({ color: "gray" }),
      radius: 4,
    }),
  });
}

export const airportLayer = new VectorLayer({
  className: "airport",
  source: new VectorSource({
    url: "/airports.json",
    format: new GeoJSON(),
  }),
  style: airportStyle,
});

function AirportCheckbox() {
  const [checked, setChecked] = useState(true);

  useLayer(airportLayer, checked);
  useHoverAirport(checked);

  return (
    <div className={"checkbox"}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? "Hide" : "Show"} Airports
      </label>
    </div>
  );
}

export default AirportCheckbox;
