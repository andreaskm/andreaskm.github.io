import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import React from "react";
import "ol/ol.css";
import "./application.css";
import { KommuneLayerCheckbox } from "../kommune/kommuneLayerCheckbox";
import { Layer } from "ol/layer";
import { map, MapContext } from "../map/mapcontext";
import { KommuneAside } from "../kommune/kommuneLayerAside";

export function Application() {
  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({ source: new OSM() }),
  ]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  useEffect(() => {
    map.setLayers(layers);
  }, [layers]);

  function handleZoomToMe(e: React.MouseEvent) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((pos) => {
      const { longitude, latitude } = pos.coords;

      map.getView().animate({ center: [longitude, latitude], zoom: 15 });
    });
  }

  function handleFocusOnNorway(e: React.MouseEvent) {
    e.preventDefault();

    map.getView().animate({ center: [10.086989, 64.9462598], zoom: 5.2 });
  }

  return (
    <MapContext.Provider value={{ map, layers, setLayers }}>
      <header>
        <h1>MY MAP</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleZoomToMe}>
          ZOOM TO ME
        </a>
        <a href={"#"} onClick={handleFocusOnNorway}>
          FOCUS ON NORWAY
        </a>
        <KommuneLayerCheckbox />
      </nav>
      <main>
        <div ref={mapRef}></div>
        <KommuneAside />
      </main>
    </MapContext.Provider>
  );
}
