import React, { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../map/useLayer";
import { FeatureLike } from "ol/Feature";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Circle, Fill, Stroke, Style } from "ol/style";

const kraftverkLayer = new VectorLayer({
  source: new VectorSource({
    url: "/kraftverk.json",
    format: new GeoJSON(),
  }),
  style: kraftverkStyle,
});

type KraftverkProperties = {
  vannkraf_1: string;
  vannkraf_3: string;
  idriftaar: number;
};

type KraftverkFeature = {
  getProperties(): KraftverkProperties;
} & Feature<Point>;

function kraftverkStyle(f: FeatureLike) {
  const feature = f as FeatureLike;
  const kraftverk = feature.getProperties();

  return new Style({
    image: new Circle({
      stroke: new Stroke({ color: "white", width: 1.5 }),
      fill: new Fill({
        color: "green",
      }),
      radius: 5,
    }),
  });
}

export function KraftverkLayerCheckbox() {
  const [checked, setChecked] = useState(true);
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
