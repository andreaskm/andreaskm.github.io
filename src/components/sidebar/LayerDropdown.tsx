import React, { useContext, useEffect, useState } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM, StadiaMaps } from "ol/source";
import { MapContext } from "../map/mapContext";

function LayerDropdown() {
  const { setBaseLayer } = useContext(MapContext);

  const layerOptions = [
    {
      id: "osm",
      name: "Open Street Map",
      layer: new TileLayer({ source: new OSM() }),
    },
    {
      id: "stadia_d",
      name: "Stadia Dark",
      layer: new TileLayer({
        source: new StadiaMaps({ layer: "alidade_smooth_dark" }),
      }),
    },
  ];

  const [selectedLayer, setSelectedLayer] = useState(layerOptions[0]);
  useEffect(() => {
    setBaseLayer(selectedLayer.layer);
  }, [selectedLayer]);

  return (
    <div className={"layer-dropdown"}>
      <select
        onChange={(e) =>
          setSelectedLayer(layerOptions.find((l) => l.id === e.target.value)!)
        }
        value={selectedLayer.id}
      >
        {layerOptions.map(({ id, name }) => (
          <option value={id}>{name}</option>
        ))}
      </select>
      {selectedLayer.name}
    </div>
  );
}

export default LayerDropdown;
