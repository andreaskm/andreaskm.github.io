import React, { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../map/useLayer";

const kraftverkLayer = new VectorLayer({
  source: new VectorSource({
    url: "/kraftverk.json",
    format: new GeoJSON(),
  }),
});

export function KraftverkLayerCheckbox() {
  const [checked, setChecked] = useState(false);
  useLayer(kraftverkLayer, checked);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        SHOW KRAFTVERK
      </label>
    </>
  );
}
