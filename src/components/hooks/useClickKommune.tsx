//Same as useHoverKommune but a clickable variant

import { useEffect } from "react";
import { Feature, MapBrowserEvent, Overlay } from "ol";
import { map } from "../map/mapContext";

function UseClickKommune(checked: boolean) {
  useEffect(() => {
    const overlayElement = document.createElement("div");
    overlayElement.className = "hover-overlay";
    const overlay = new Overlay({
      element: overlayElement,
      positioning: "bottom-center",
      offset: [0, -10],
    });

    map.addOverlay(overlay);

    function handleMouseClick(event: MapBrowserEvent<PointerEvent>) {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
        return feature;
      }) as Feature | undefined;

      if (feature) {
        const navn = feature.getProperties().navn[0].navn;
        overlayElement.innerHTML = `<div>${navn}</div>`;
        overlay.setPosition(event.coordinate);
      } else {
        overlayElement.innerHTML = "";
        overlay.setPosition(undefined);
      }
    }

    if (checked) {
      map.on("click", handleMouseClick);
    } else {
      map.un("click", handleMouseClick);
    }

    return () => {
      map.un("click", handleMouseClick);
      map.getOverlays().pop();
    };
  }, [checked]);
}
export default UseClickKommune;
