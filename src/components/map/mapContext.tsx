import { useGeographic } from "ol/proj";
import { Map, View } from "ol";
import React, { Dispatch, SetStateAction } from "react";
import { Layer } from "ol/layer";

useGeographic();

interface MapContext {
  map: Map;
  setLayers: Dispatch<SetStateAction<Layer[]>>;
  layers: Layer[];
  setBaseLayer: (layer: Layer) => void;
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
  setBaseLayer: () => {},
});
