import { Map, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useGeographic } from "ol/proj";
import { MutableRefObject, useEffect, useRef } from "react";
import React from "react";
import "ol/ol.css";
import "./application.css";

useGeographic();

const map = new Map({
  view: new View({ center: [10, 60], zoom: 9 }),
  layers: [new TileLayer({ source: new OSM() })],
});

export function Application() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  function handleZoomToMe(e: React.MouseEvent) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((pos) => {
      const { longitude, latitude } = pos.coords;

      map.getView().animate({ center: [longitude, latitude], zoom: 15 });
    });
  }

  return (
    <>
      <header>
        <h1>MY MAP</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleZoomToMe}>
          ZOOM TO ME
        </a>
      </nav>
      <div ref={mapRef}></div>
    </>
  );
}
