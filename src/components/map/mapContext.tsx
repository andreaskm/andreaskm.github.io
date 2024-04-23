import { useGeographic } from "ol/proj";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React, { Dispatch, SetStateAction } from "react";
import { Layer } from "ol/layer";

useGeographic();

interface MapContext {
  map: Map;
  setLayers: Dispatch<SetStateAction<Layer[]>>;
  layers: Layer[];
}

export const map = new Map({
  view: new View({
    center: [10, 59],
    zoom: 8,
  }),
});

export const MapContext = React.createContext<MapContext>({
  map,
  setLayers: () => {},
  layers: [],
});