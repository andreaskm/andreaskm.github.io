import { useEffect, useState } from "react";
import { map } from "../map/mapContext";
import { Draw } from "ol/interaction";
import { drawingSource } from "../application";
import { getLength } from "ol/sphere";
import { useGeographic } from "ol/proj";
import { LineString } from "ol/geom";
import { Overlay } from "ol";

useGeographic();
const formatLength = function (line: LineString) {
  const length = getLength(line) * 100000;
  let output;
  if (length > 1000) {
    output = Math.round((length / 1000) * 100) / 100 + " " + "km";
  } else {
    output = Math.round(length * 100) / 100 + " " + "m";
  }
  return output;
};

function UseDrawLineString(checked: boolean, freehand?: boolean) {
  const [lengthOfString, setLengthOfString] = useState<string>();
  //const [previousMeasures, setPreviousMeasures] = useState<string[]>([]);
  let draw: Draw;

  let sketch;

  const overlayElement = document.createElement("div");
  overlayElement.className = "hover-overlay";
  const overlay = new Overlay({
    element: overlayElement,
    positioning: "bottom-center",
    offset: [0, -10],
  });

  useEffect(() => {
    function handleDrawLineString() {
      if (!freehand) {
        draw = new Draw({
          type: "LineString",
          source: drawingSource,
        });
      } else {
        draw = new Draw({
          type: "LineString",
          source: drawingSource,
          freehand: true,
        });
      }

      let tooltipCoord;
      map.addInteraction(draw);
      let listener;
      console.log(lengthOfString);
      draw.on("drawstart", (e) => {
        sketch = e.feature;
        listener = sketch.getGeometry()!.on("change", (e) => {
          const geometry = e.target;
          let output;
          output = formatLength(geometry);
          tooltipCoord = geometry.getLastCoordinate();
          setLengthOfString(output);
          map.addOverlay(overlay);
          overlayElement.innerHTML = output;
          overlay.setPosition(tooltipCoord);
        });
      });

      draw.on("drawend", () => {
        map.removeOverlay(overlay);
      });
    }

    if (checked) {
      console.log(lengthOfString);
      handleDrawLineString();
    }

    return () => {
      map.removeInteraction(draw);
      map.removeOverlay(overlay);
    };
  }, [checked, freehand]);

  return lengthOfString;
}

export default UseDrawLineString;
