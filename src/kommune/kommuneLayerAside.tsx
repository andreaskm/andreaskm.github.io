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
      <aside className={kommuneLayer ? "hidden" : "visible"}>
        <div>
          <h2>Kommuner {kommuneLayer ? "hidden" : "visible"}</h2>
          <p>Hello</p>
        </div>
      </aside>
    </>
  );
}
