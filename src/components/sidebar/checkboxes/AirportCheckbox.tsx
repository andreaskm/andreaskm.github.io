import React, { useState } from "react";
import useLayer from "../../hooks/useLayer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import { useHoverAirport } from "../../hooks/useHoverAirport";
import { Cluster } from "ol/source";
import { map } from "../../map/mapContext";

function airportStyle() {
  return new Style({
    image: new Circle({
      stroke: new Stroke({ color: "white", width: 1 }),
      fill: new Fill({ color: "gray" }),
      radius: 4,
    }),
  });
}

export const airportSource = new VectorSource({
  url: "/airports.json",
  format: new GeoJSON(),
});

export const airportLayer = new VectorLayer({
  className: "airport",
  source: airportSource,
  style: airportStyle,
  maxResolution: 700,
});

export const clusterSource = new Cluster({
  distance: 50,
  minDistance: 0,
  source: airportSource,
});

export const clusterLayer = new VectorLayer({
  source: clusterSource,
  style: (feature) => {
    const size = feature.get("features").length;

    return new Style({
      image: new Circle({
        radius: 10 + size * 0.2,
        stroke: new Stroke({
          color: "white",
          width: 1,
        }),
        fill: new Fill({
          color: "white",
        }),
      }),
      text: new Text({
        text: size.toString(),
        font: "bold 12px sans-serif",
        fill: new Fill({
          color: "black",
        }),
      }),
    });
  },
});
//485.3
function AirportCheckbox() {
  const [checked, setChecked] = useState(false);

  const resolution = map.getView().getResolution();

  console.log(resolution);

  useLayer(airportLayer, checked);
  useLayer(clusterLayer, checked);
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
