import React, { MutableRefObject, useContext, useEffect, useRef } from "react";
import { useGeographic } from "ol/proj";
import "ol/ol.css";
import { StadiaLayerDropdown } from "./stadiaLayers/stadiaLayersDropdown";
import { MapContext } from "./mapContext";

//Call useGeographic so the map view uses geographic coordinates.
useGeographic();

//Creating the map that will be referenced later in the application.
//Remember to import the correct Map from "ol".
//The map needs a couple of options to work. Layers are the way we view the map. In this case, I use OSM (OpenStreetMap) to display the map.
//The map also needs a view, the view takes two options; coordinates, so the application knows where to start, and zoom, where ex. 3 is far and 10 is closer

export function Application() {
  const { map } = useContext(MapContext);
  //So the map is created, but we need to see it in the browser. This is where useRef comes in.
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>; //Ts stuff
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  //Reference the div here to make it show up.
  return (
    <MapContext.Provider value={{ map }}>
      <StadiaLayerDropdown />
      <div ref={mapRef}></div>
    </MapContext.Provider>
  );
}
