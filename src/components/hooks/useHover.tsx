import { Layer } from "ol/layer";
import { map } from "../map/mapContext";
import { useEffect, useState } from "react";
import { Feature, MapBrowserEvent } from "ol";

interface UseHoverResult {
  currentlyHovered: Feature | undefined;
}

export function useHover(checked: boolean): UseHoverResult {
  const [hoveredFeature, setHoveredFeature] = useState<Feature | undefined>(
    undefined,
  );

  useEffect(() => {
    function handlePointerMove(event: MapBrowserEvent<PointerEvent>) {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
        return feature;
      }) as Feature;
      if (feature) {
        const navn = feature.getProperties().navn[0].navn;
        console.log("Properties: " + navn);

        setHoveredFeature(feature);
      } else {
        console.log("No feature detected");
      }
    }

    if (checked) {
      map.on("pointermove", handlePointerMove);
    } else {
      map.un("pointermove", handlePointerMove);
    }

    return () => {
      map.un("pointermove", handlePointerMove);
    };
  }, [checked]);
  return { currentlyHovered: hoveredFeature };
}
