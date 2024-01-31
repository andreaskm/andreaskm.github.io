import React, { useContext, useEffect, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { MapContext } from "../map/mapcontext";

const kommunelayer = new VectorLayer({
  className: "kommuner",
  source: new VectorSource({
    url: "/kommuner.json",
    format: new GeoJSON(),
  }),
});

export function KommuneLayerCheckbox() {
  const [checked, setChecked] = useState(true);

  const { setLayers } = useContext(MapContext);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, kommunelayer]);
    }
    //Kjører før useEffect er ferdig for å fjerne kommune layer
    return () => {
      setLayers((old) => old.filter((l) => l !== kommunelayer));
    };
  }, [checked]);

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      {checked ? " HIDE " : " SHOW "}
      KOMMUNER
    </label>
  );
}
