import React, { useContext, useEffect, useMemo, useState } from "react";
import { MapContext } from "../map/mapcontext";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Feature } from "ol";

type KommuneVectorLayer = VectorLayer<VectorSource<KommuneFeature>>;

interface KommuneProperties {
  kommunenummer: string;
  navn: Stedsnavn[];
}

type KommuneFeature = {
  getProperties(): KommuneProperties;
} & Feature;

function getStedsnavn(navn: Stedsnavn[]) {
  return navn.find((navn) => navn.sprak === "nor")?.navn;
}

export interface Stedsnavn {
  sprak: string;
  navn: string;
}

function useKommuneFeatures() {
  const { map, layers } = useContext(MapContext);

  const kommuneLayer = layers.find(
    (layer) => layer.getClassName() === "kommuner",
  ) as KommuneVectorLayer;

  const [features, setFeatures] = useState<KommuneFeature[]>();
  const [viewExtent, setViewExtent] = useState(
    map.getView().getViewStateAndExtent().extent,
  );

  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtent),
      ),
    [features, viewExtent],
  );

  function handleSourceChange() {
    setFeatures(kommuneLayer?.getSource()?.getFeatures());
  }

  function handleViewChange() {
    setViewExtent(map.getView().getViewStateAndExtent().extent);
  }

  useEffect(() => {
    kommuneLayer?.getSource()?.on("change", handleSourceChange);
    return () => kommuneLayer?.getSource()?.un("change", handleSourceChange);
  }, [kommuneLayer]);

  useEffect(() => {
    map.getView().on("change", handleViewChange);
    return () => map.getView().un("change", handleViewChange);
  }, [map]);

  return { kommuneLayer, features, visibleFeatures };
}

export function KommuneAside() {
  const { kommuneLayer, visibleFeatures } = useKommuneFeatures();

  return (
    <>
      <aside className={kommuneLayer ? "visible" : "hidden"}>
        <div>
          <h2>Kommuner</h2>
          <ul>
            {visibleFeatures?.map((kommune) => (
              <li key={kommune.getProperties().kommunenummer}>
                {getStedsnavn(kommune.getProperties().navn)}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
