import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Layer } from "ol/layer";

const kommunelayer = new VectorLayer({
  source: new VectorSource({
    url: "/kommuner.json",
    format: new GeoJSON(),
  }),
});

export function KommuneLayerCheckbox({
  setLayers,
}: {
  setLayers: Dispatch<SetStateAction<Layer[]>>;
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, kommunelayer]);
    }
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
      {checked ? "HIDE " : "SHOW "}
      KOMMUNER
    </label>
  );
}
