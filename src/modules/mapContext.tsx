import { useGeographic } from "ol/proj";
import { Map, View } from "ol";
import React from "react";

import { StadiaMaps } from "ol/source";

import TileLayer from "ol/layer/Tile";

useGeographic();

export const map = new Map({
  view: new View({ center: [10, 59], zoom: 10 }),
  layers: [
    new TileLayer({
      source: new StadiaMaps({
        layer: "outdoors",
        apiKey: "0e9dc8ff-a533-4512-bca6-2186ac3a8609",
      }),
    }),
  ],
});

export const MapContext = React.createContext<{
  map: Map;
}>({
  map,
});

/*const map = new Map({
    layers: [new TileLayer({
        source: new StadiaMaps({
            layer: "stamen_toner_background",
            apiKey: "d1dc7f24-5120-48a7-96c9-07e89e455696"
        })
    })],
    view: new View({center: [10.7722, 59.94445], zoom: 10}),
});*/
