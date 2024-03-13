import { useGeographic } from "ol/proj";
import { View, Map } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { MutableRefObject, useEffect, useRef } from "react";
import React from "react";
import "ol/ol.css";

useGeographic();

const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({ center: [11, 60], zoom: 10 }),
});

export function Application() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  return <div ref={mapRef}></div>;
}
