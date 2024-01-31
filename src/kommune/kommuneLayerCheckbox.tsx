import React, { useContext, useEffect, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { MapContext } from "../map/mapcontext";
import { Feature, MapBrowserEvent } from "ol";
import { Polygon } from "ol/geom";

type KommuneProperties = {
  kommunenummer: string;
  navn: {
    sprak: string;
    navn: string;
  }[];
};

type kommuneFeature = Feature<Polygon> & {
  getProperties(): KommuneProperties;
};

const kommuneSource = new VectorSource<kommuneFeature>({
  url: "/kommuner.json",
  format: new GeoJSON(),
});

const kommunelayer = new VectorLayer({
  className: "kommuner",
  source: kommuneSource,
});

export function KommuneLayerCheckbox() {
  const [checked, setChecked] = useState(false);

  function handleClick(e: MapBrowserEvent<MouseEvent>) {
    const clickedKommune = kommuneSource.getFeaturesAtCoordinate(
      e.coordinate,
    ) as kommuneFeature[];

    if (clickedKommune.length === 1) {
      const properties = clickedKommune[0].getProperties() as KommuneProperties;
      alert(properties.navn.find((navn) => navn.sprak === "nor")!.navn);
      console.log(properties.navn.find((navn) => navn.sprak === "nor")!.navn);
    }
  }

  const { setLayers, map } = useContext(MapContext);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, kommunelayer]);
      map.on("click", handleClick);
    }
    //Kjører før useEffect er ferdig for å fjerne kommune layer
    return () => {
      map.un("click", handleClick);
      setLayers((old) => old.filter((layer) => layer !== kommunelayer));
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
