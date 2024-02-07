import React, { useContext, useEffect, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../map/useLayer";
import { FeatureLike } from "ol/Feature";
import { Feature, MapBrowserEvent } from "ol";
import { Point } from "ol/geom";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import { MapContext } from "../map/mapcontext";

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

function activeKraftverkStyle(f: FeatureLike) {
  const feature = f as KraftverkFeature;
  const kraftverk = feature.getProperties();

  return new Style({
    image: new Circle({
      stroke: new Stroke({ color: "white", width: 1.5 }),
      fill: new Fill({ color: "green" }),
      radius: 8,
    }),
    text: new Text({
      text: kraftverk.vannkraf_1,
      offsetY: -15,
      font: "bold 14px sans-serif",
      fill: new Fill({ color: "black" }),
      stroke: new Stroke({ color: "white", width: 2 }),
    }),
  });
}

export function KraftverkLayerCheckbox() {
  const { map } = useContext(MapContext);
  const [checked, setChecked] = useState(true);

  const [activeFeature, setActiveFeature] = useState<KraftverkFeature>();

  function handlePointerMove(e: MapBrowserEvent<MouseEvent>) {
    const features: FeatureLike[] = [];

    map.forEachFeatureAtPixel(e.pixel, (f) => features.push(f), {
      hitTolerance: 5,
      layerFilter: (l) => l === kraftverkLayer,
    });

    if (features.length === 1) {
      setActiveFeature(features[0] as KraftverkFeature);
    } else {
      setActiveFeature(undefined);
    }
  }

  useEffect(() => {
    activeFeature?.setStyle(activeKraftverkStyle);
    return () => activeFeature?.setStyle(undefined);
  }, [activeFeature]);

  useLayer(kraftverkLayer, checked);

  useEffect(() => {
    if (checked) {
      map.on("pointermove", handlePointerMove);
    }
    return () => map.un("pointermove", handlePointerMove);
  }, []);

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
