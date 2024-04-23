import { Feature, MapBrowserEvent, Overlay } from "ol";
import { map } from "../map/mapContext";
import { useEffect } from "react";

export function useHover(checked: boolean) {
  useEffect(() => {
    const overlayElement = document.createElement("div");
    overlayElement.className = "hover-overlay";
    const overlay = new Overlay({
      element: overlayElement,
      positioning: "bottom-center",
      offset: [0, -10],
    });

    map.addOverlay(overlay);

    function handlePointerMove(event: MapBrowserEvent<PointerEvent>) {
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
      map.on("pointermove", handlePointerMove);
    } else {
      map.un("pointermove", handlePointerMove);
    }

    return () => {
      map.un("pointermove", handlePointerMove);
    };
  }, [checked]);
}
