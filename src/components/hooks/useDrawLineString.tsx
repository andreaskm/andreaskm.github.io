import { useEffect, useRef, useState } from "react";
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
  const [previousMeasures, setPreviousMeasures] = useState<string[]>([]);
  const previousMeasuresRef = useRef(previousMeasures);
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
      draw.on("drawstart", (e) => {
        setLengthOfString(undefined);
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

      draw.on("drawend", (event) => {
        const sketch = event.feature;
        const geometry = sketch.getGeometry() as LineString;

        const length = formatLength(geometry);

        setLengthOfString(length);

        previousMeasuresRef.current.push(length);
        console.log(previousMeasuresRef.current);
        map.removeOverlay(overlay);
      });
    }

    if (checked) {
      handleDrawLineString();
    }

    return () => {
      map.removeInteraction(draw);
      map.removeOverlay(overlay);
    };
  }, [checked, freehand]);

  return {
    currentLength: lengthOfString,
    previousMeasures: previousMeasuresRef.current,
  };
}

export default UseDrawLineString;
