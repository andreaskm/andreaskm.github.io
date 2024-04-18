import * as React from "react";
import { Feature, Map, MapBrowserEvent, View } from "ol";
import { useGeographic } from "ol/proj";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { OSM, Source, StadiaMaps } from "ol/source";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import { FeedMessage } from "../../generated/gtfs-realtime";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import "./application.css";
import { FeatureLike } from "ol/Feature";

useGeographic();

const vehicleSource = new VectorSource();

const vehicleLayer = new VectorLayer({ source: vehicleSource });

const map = new Map({
  view: new View({ zoom: 8, center: [10, 59] }),
  layers: [new TileLayer({ source: new OSM() }), vehicleLayer],
});

export function Application() {
  async function fetchVehiclePosition() {
    const res = await fetch(
      "https://api.entur.io/realtime/v1/gtfs-rt/vehicle-positions",
    );

    if (!res.ok) {
      throw `Error fetching ${res.url}: ${res.statusText}`;
    }

    const responseMessage = FeedMessage.decode(
      new Uint8Array(await res.arrayBuffer()),
    );

    console.log(responseMessage);

    for (const { vehicle } of responseMessage.entity) {
      if (!vehicle) continue;
      const { position } = vehicle;
      if (!position) continue;
      const { latitude, longitude } = position;
      const point = new Point([longitude, latitude]);
      vehicleSource.addFeature(new Feature(point));
    }
  }

  const [vehicleFeatures, setVehicleFeatures] = useState<FeatureLike[]>([]);

  function handlePointerMove(e: MapBrowserEvent<MouseEvent>) {
    let isThereAFeature = false;
    const features: FeatureLike[] = [];

    map.forEachFeatureAtPixel(e.pixel, (f) => features.push(f), {
      hitTolerance: 5,
      layerFilter: (l) => l === vehicleLayer,
    });

    if (features.length > 0) {
      isThereAFeature = true;
    }

    setVehicleFeatures(features);

    console.log(vehicleFeatures);
    return isThereAFeature;
  }

  //map.on("pointermove", handlePointerMove)

  useEffect(() => {
    fetchVehiclePosition();
  }, []);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  return (
    <>
      <div className={"sidebar"}>
        <div className={"spacer"}>
          <button className={"button-4"}>Hello 1</button>
        </div>
        <div className={"spacer"}>
          <button className={"button-4"}>Hello 2</button>
        </div>
        <div className={"spacer"}>
          <button className={"button-4"}>Hello 3</button>
        </div>
        <div className={"spacer"}>
          <button className={"button-4"}>Hello 4</button>
        </div>
      </div>
      <div ref={mapRef} className={"map"}>
        <div className={"info"}>
          <div className={"info-text"}>
            <span>{map.getView().getViewStateAndExtent().extent}</span>
          </div>
        </div>
      </div>
    </>
  );
}
