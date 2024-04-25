import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "ol/ol.css";
import "./application.css";
import Sidebar from "./sidebar/sidebar";
import { map, MapContext } from "./map/mapContext";
import { Layer } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

export const drawingSource = new VectorSource();
export const drawingLayer = new VectorLayer({
  source: drawingSource,
});

function Application() {
  const [vectorLayers, setVectorLayers] = useState<Layer[]>([]);
  const [baseLayer, setBaseLayer] = useState<Layer>(
    () => new TileLayer({ source: new OSM() }),
  );

  const allLayers = useMemo(
    () => [baseLayer, ...vectorLayers],
    [baseLayer, vectorLayers],
  );

  useEffect(() => {
    map.setLayers(allLayers);
  }, [allLayers]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  useEffect(() => {
    map.setLayers(allLayers);
    console.log(allLayers);
  }, [allLayers]);

  return (
    <MapContext.Provider
      value={{
        map,
        layers: vectorLayers,
        setLayers: setVectorLayers,
        setBaseLayer,
      }}
    >
      <Sidebar />
      <div ref={mapRef}></div>
    </MapContext.Provider>
  );
}

export default Application;
