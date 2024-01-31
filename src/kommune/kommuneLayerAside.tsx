import { useContext } from "react";
import { MapContext } from "../map/mapcontext";
import React from "react";
import VectorSource from "ol/source/Vector";

export function KommuneAside() {
  const { layers } = useContext(MapContext);

  const kommuneLayer = layers.find(
    (layer) => layer.getClassName() === "kommuner",
  );

  const features = (kommuneLayer?.getSource() as VectorSource)?.getFeatures();

  return (
    <>
      <aside className={kommuneLayer ? "visible" : "hidden"}>
        <div>
          <h2>Kommuner</h2>
          <ul>
            {features?.map((kommune) => (
              <li>{kommune.getProperties().kommunenummer}</li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
