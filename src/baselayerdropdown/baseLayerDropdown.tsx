import React, { useContext, useEffect, useState } from "react";
import "../application/application.css";
import { MapContext } from "../map/mapcontext";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
export function BaseLayerDropdown() {
  const { setBaseLayer } = useContext(MapContext);
  const baseLayerOptions = [
    {
      id: "osm",
      name: "Open Street Map",
      layer: new TileLayer({ source: new OSM() }),
    },
    {
      id: "stadia",
      name: "Stadia",
      layer: new TileLayer({ source: new StadiaMaps({ layer: "outdoors" }) }),
    },
  ];

  const [selectedLayer, setSelectedLayer] = useState(baseLayerOptions[0]);

  useEffect(() => setBaseLayer(selectedLayer.layer), [selectedLayer]);

  return (
    <>
      <select
        className={"txt-black"}
        onChange={(e) =>
          setSelectedLayer(
            baseLayerOptions.find((l) => l.id === e.target.value)!,
          )
        }
        value={selectedLayer.id}
      >
        {baseLayerOptions.map(({ id, name }) => (
          <option value={id} key={id} className={"txt-black"}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
}
