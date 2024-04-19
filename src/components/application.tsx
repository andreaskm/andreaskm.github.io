import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "ol/ol.css";
import "./application.css";
import { useGeographic } from "ol/proj";
import Sidebar from "./sidebar/sidebar";
import { map, MapContext } from "./map/mapContext";
import { Layer } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { GeoJSON } from "ol/format";

function Application() {
  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  useEffect(() => {
    map.setLayers(layers);
    console.log(layers);
  }, [layers]);

  return (
    <MapContext.Provider value={{ map, layers, setLayers }}>
      <Sidebar />
      <div ref={mapRef}></div>
    </MapContext.Provider>
  );
}

export default Application;
