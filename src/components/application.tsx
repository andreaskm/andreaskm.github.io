import * as React from "react";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";
import { MutableRefObject, useEffect, useRef } from "react";
import { OSM, Source, StadiaMaps } from "ol/source";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";

useGeographic();

const map = new Map({
  view: new View({ zoom: 8, center: [10, 59] }),
  layers: [new TileLayer({ source: new OSM() })],
});
export function Application() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  return <div ref={mapRef} style={{ height: "100vh" }}></div>;
}
