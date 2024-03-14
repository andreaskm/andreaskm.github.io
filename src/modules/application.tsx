import React, { MutableRefObject, useEffect, useRef } from "react";
import { useGeographic } from "ol/proj";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import "ol/ol.css";

//Call useGeographic so the map view uses geographic coordinates.
useGeographic();

//Creating the map that will be referenced later in the application.
//Remember to import the correct Map from "ol".
//The map needs a couple of options to work. Layers are the way we view the map. In this case, I use OSM (OpenStreetMap) to display the map.
//The map also needs a view, the view takes two options; coordinates, so the application knows where to start, and zoom, where ex. 3 is far and 10 is closer
const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({ center: [10, 59], zoom: 11 }),
});

export function Application() {
  //So the map is created, but we need to see it in the browser. This is where useRef comes in.
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>; //Ts stuff
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  //Reference the div here to make it show up.
  return <div ref={mapRef}></div>;
}
