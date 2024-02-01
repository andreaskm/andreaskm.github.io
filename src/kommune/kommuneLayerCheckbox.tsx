import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { MapContext } from "../map/mapcontext";
import { Feature, MapBrowserEvent, Overlay } from "ol";
import { Polygon } from "ol/geom";
import "../application/application.css";

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

  const overlay = useMemo(() => new Overlay({}), []);
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    overlay.setElement(overlayRef.current);
    map.addOverlay(overlay);

    return () => {
      map.removeOverlay(overlay);
    };
  }, []);

  const [selectedKommune, setSelectedKommune] = useState<
    kommuneFeature | undefined
  >();

  function handleClick(e: MapBrowserEvent<MouseEvent>) {
    const clickedKommune = kommuneSource.getFeaturesAtCoordinate(
      e.coordinate,
    ) as kommuneFeature[];

    if (clickedKommune.length === 1) {
      const properties = clickedKommune[0].getProperties() as KommuneProperties;
      setSelectedKommune(clickedKommune[0]);
      overlay.setPosition(e.coordinate);
    } else {
      setSelectedKommune(undefined);
      map.removeOverlay(overlay);
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
      setSelectedKommune(undefined);
      setLayers((old) => old.filter((layer) => layer !== kommunelayer));
    };
  }, [checked]);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? " HIDE " : " SHOW "}
        KOMMUNER
      </label>
      <div ref={overlayRef} className={"kommune-overlay"}>
        {selectedKommune && (
          <>
            {
              (selectedKommune.getProperties() as KommuneProperties).navn.find(
                (navn) => navn.sprak === "nor",
              )!.navn
            }
          </>
        )}
      </div>
    </>
  );
}
