import React, { useContext } from "react";
import { MapContext } from "../mapContext";
import { StadiaMaps } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { stadiaLayerChoices } from "./stadiaLayerChoices";

/*const layerNames = [
    "alidade_smooth",
    "alidade_smooth_dark",
    "outdoors",
    "stamen_terrain",
    "stamen_terrain_background",
    "stamen_terrain_labels",
    "stamen_terrain_lines",
    "stamen_toner_background",
    "stamen_toner",
    "stamen_toner_labels",
    "stamen_toner_lines",
    "stamen_toner_lite",
    "stamen_watercolor",
    "osm_bright"
]*/

export function StadiaLayerDropdown() {
  const { map } = useContext(MapContext);

  return (
    <>
      <select
        name="stadia-layers"
        id="stadiaLayers"
        onChange={(e) =>
          map.setLayers([
            new TileLayer({
              source: new StadiaMaps({
                layer: e.target.value,
                apiKey: "d1dc7f24-5120-48a7-96c9-07e89e455696",
              }),
            }),
          ])
        }
      >
        {stadiaLayerChoices.map((layer) => (
          <option value={layer.layerName}>{layer.name}</option>
        ))}
      </select>
    </>
  );
}
