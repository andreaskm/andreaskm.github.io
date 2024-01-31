import React, { useContext, useEffect, useState } from "react";
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
  const { layers } = useContext(MapContext);

  const kommuneLayer = layers.find(
    (layer) => layer.getClassName() === "kommuner",
  ) as KommuneVectorLayer;

  const [features, setFeatures] = useState<KommuneFeature[]>();

  function handleSourceChange() {
    setFeatures(kommuneLayer?.getSource()?.getFeatures());
  }

  useEffect(() => {
    kommuneLayer?.getSource()?.on("change", handleSourceChange);
    return () => kommuneLayer?.getSource()?.un("change", handleSourceChange);
  }, [kommuneLayer]);

  return { kommuneLayer, features };
}

export function KommuneAside() {
  const { kommuneLayer, features } = useKommuneFeatures();

  return (
    <>
      <aside className={kommuneLayer ? "visible" : "hidden"}>
        <div>
          <h2>Kommuner</h2>
          <ul>
            {features?.map((kommune) => (
              <li>{getStedsnavn(kommune.getProperties().navn)}</li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
