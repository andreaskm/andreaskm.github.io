import { useContext } from "react";
import { MapContext } from "../map/mapcontext";
import React from "react";

export function KommuneAside() {
  const { layers } = useContext(MapContext);

  const kommuneLayer = layers.find(
    (layer) => layer.getClassName() === "kommuner",
  );

  return (
    <>
      <aside className={kommuneLayer ? "visible" : "hidden"}>
        <div>
          <h2>Kommuner {kommuneLayer ? "visible" : "hidden"}</h2>
          <p>Hello</p>
        </div>
      </aside>
    </>
  );
}
